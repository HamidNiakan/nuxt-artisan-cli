#!/usr/bin/env node

import { Command } from 'commander'
import chalk from 'chalk'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import path from 'path'

const program = new Command()
program
  .name('nuxt-artisan')
  .description('Nuxt Artisan CLI - Inspired by Laravel')
  .version('1.0.0')

const log = (msg: string) => console.log(chalk.green('✅ ') + msg)
const warn = (msg: string) => console.warn(chalk.yellow('⚠ ') + msg)
const error = (msg: string) => console.error(chalk.red('❌ ') + msg)

const toKebab = (str: string) => str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

function writeFileIfNotExist(filepath: string, content: string) {
  if (existsSync(filepath)) {
    warn(`${filepath} already exists`)
    return
  }
  mkdirSync(path.dirname(filepath), { recursive: true })
  writeFileSync(filepath, content)
  log(`Created: ${filepath}`)
}

// COMPONENT
program
  .command('make:component <name>')
  .option('-r, --route', 'Also create a page route')
  .option('-s, --store', 'Also create a Pinia store')
  .option('--js', 'Use JavaScript instead of TypeScript')
  .description('Create a Vue component with optional route and store')
  .action((name, opts) => {
    const kebab = toKebab(name)
    const ext = opts.js ? 'js' : 'ts'

    // Component
    const componentContent = `<template>
  <div class=\"${kebab}\">
    <h2>${name} Component</h2>
  </div>
</template>

<script setup lang=\"${opts.js ? '' : 'ts'}\">
defineProps<{}>()
</script>

<style scoped>
.${kebab} {
  padding: 1rem;
}
</style>`
    writeFileIfNotExist(`components/${name}.vue`, componentContent)

    // Page
    if (opts.route) {
      const routeContent = `<template>
  <div>
    <${name} />
  </div>
</template>

<script setup lang=\"${opts.js ? '' : 'ts'}\">
import ${name} from '~/components/${name}.vue'
</script>`
      writeFileIfNotExist(`pages/${kebab}/index.vue`, routeContent)
    }

    // Store
    if (opts.store) {
      const storeContent = `import { defineStore } from 'pinia'

export const use${name}Store = defineStore('${kebab}', {
  state: () => ({
    // state
  }),
  actions: {
    // actions
  }
})`
      writeFileIfNotExist(`stores/use${name}Store.${ext}`, storeContent)
    }
  })

// MIDDLEWARE
program
  .command('make:middleware <name>')
  .description('Create a Nuxt middleware')
  .option('--js', 'Use JavaScript instead of TypeScript')
  .action((name, opts) => {
    const ext = opts.js ? 'js' : 'ts'
    const content = `export default defineNuxtRouteMiddleware((to, from) => {
  // Your middleware logic here
})`
    writeFileIfNotExist(`middleware/${toKebab(name)}.${ext}`, content)
  })

// LAYOUT
program
  .command('make:layout <name>')
  .description('Create a layout file')
  .action(name => {
    const content = `<template>
  <div>
    <slot />
  </div>
</template>`
    writeFileIfNotExist(`layouts/${toKebab(name)}.vue`, content)
  })

// COMPOSABLE
program
  .command('make:composable <name>')
  .description('Create a composable')
  .option('--js', 'Use JavaScript instead of TypeScript')
  .action((name, opts) => {
    const ext = opts.js ? 'js' : 'ts'
    const content = `export const ${name} = () => {
  // your composable logic
}`
    writeFileIfNotExist(`composables/${name}.${ext}`, content)
  })

// PLUGIN
program
  .command('make:plugin <name>')
  .description('Create a Nuxt plugin')
  .option('--js', 'Use JavaScript instead of TypeScript')
  .action((name, opts) => {
    const ext = opts.js ? 'js' : 'ts'
    const content = `export default defineNuxtPlugin(nuxtApp => {
  // your plugin logic
})`
    writeFileIfNotExist(`plugins/${toKebab(name)}.${ext}`, content)
  })

program.parse()

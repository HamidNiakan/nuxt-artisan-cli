# nuxt-artisan-cli

A lightweight CLI tool for Nuxt 3

---

## 📦 Installation

### Global installation:
```bash
npm install -g nuxt-artisan-cli
```

---

## 🚀 Usage

### Show available commands
```bash
nuxt-artisan
```

---

### ✨ Make Component
```bash
nuxt-artisan make:component MyComponent
```

**With route page:**
```bash
nuxt-artisan make:component MyComponent -r
```

**With Pinia store:**
```bash
nuxt-artisan make:component MyComponent -s
```

**Use JavaScript instead of TypeScript:**
```bash
nuxt-artisan make:component MyComponent --js
```

---

### 🔐 Make Middleware
```bash
nuxt-artisan make:middleware auth
```

---

### 🧩 Make Layout
```bash
nuxt-artisan make:layout admin
```

---

### 🧪 Make Composable
```bash
nuxt-artisan make:composable useAuth
```

---

### 🔌 Make Plugin
```bash
nuxt-artisan make:plugin axios
```

---

## 🛠 Flags
| Flag        | Description                    |
|-------------|--------------------------------|
| `-r`        | Also create a route page       |
| `-s`        | Also create a Pinia store      |
| `--ts`      | Use TypeScript (default)       |
| `--js`      | Use JavaScript instead         |

---

# nuxt-artisan-cli

[![npm version](https://badge.fury.io/js/nuxt-artisan-cli.svg)](https://www.npmjs.com/package/nuxt-artisan-cli)
[![GitHub](https://img.shields.io/badge/github-nuxt--artisan--cli-blue?logo=github)](https://github.com/HamidNiakan/nuxt-artisan-cli)

## 🧠 Notes

- The CLI auto-creates files in the correct Nuxt 3 structure (`components/`, `pages/`, `stores/`, etc.)
- Convention-over-configuration — just like Laravel
- Compatible with both TypeScript and JavaScript projects

---

#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

/**
 * Generates browser-compatible HTML files from Vue SFC components
 */
class VueHtmlGenerator {
  constructor() {
    this.componentsDir = path.join(__dirname, "..", "components")
  }

  /**
   * Find all Vue component files
   */
  findVueComponents() {
    const vueFiles = []

    const scanDirectory = dir => {
      const items = fs.readdirSync(dir)

      for (const item of items) {
        const fullPath = path.join(dir, item)
        const stat = fs.statSync(fullPath)

        if (stat.isDirectory()) {
          scanDirectory(fullPath)
        } else if (item.endsWith(".vue")) {
          vueFiles.push(fullPath)
        }
      }
    }

    scanDirectory(this.componentsDir)
    return vueFiles
  }

  /**
   * Parse Vue SFC file
   */
  parseVueFile(filePath) {
    const content = fs.readFileSync(filePath, "utf-8")

    // Extract template
    const templateMatch = content.match(/<template[^>]*>([\s\S]*?)<\/template>/)
    const template = templateMatch ? templateMatch[1].trim() : ""

    // Extract script
    const scriptMatch = content.match(/<script[^>]*>([\s\S]*?)<\/script>/)
    const script = scriptMatch ? scriptMatch[1].trim() : ""

    // Extract styles
    const styleMatches = Array.from(
      content.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)
    )
    const styles = styleMatches.map(match => match[1].trim()).join("\n")

    return { template, script, styles }
  }

  /**
   * Convert Vue script to browser-compatible format
   */
  convertScript(script) {
    // Remove export default and clean up
    let cleanScript = script.replace(/export\s+default\s*/, "").trim()

    // If it's an object literal, ensure it's properly formatted
    if (cleanScript.startsWith("{") && cleanScript.endsWith("}")) {
      return cleanScript
    }

    return cleanScript
  }

  /**
   * Generate component name from file path
   */
  getComponentName(filePath) {
    const fileName = path.basename(filePath, ".vue")
    // Convert kebab-case to PascalCase
    return fileName
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join("")
  }

  /**
   * Generate HTML file content
   */
  generateHtml(componentName, template, script, styles) {
    const kebabName = componentName
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase()
      .slice(1)

    return `<!doctype html>
<html lang="en" class="light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${componentName}</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    ${styles ? `<style>\n${styles}\n    </style>` : ""}
    <script>
      // Force light mode for consistent preview
      tailwind.config = {
        darkMode: 'class'
      }
    </script>
  </head>
  <body class="bg-white">
    <div id="app">
      <${kebabName}></${kebabName}>
    </div>

    <script>
      const { createApp } = Vue

      const ${componentName} = {
        template: \`${template.replace(/`/g, "\\`")}\`,
        ${script
          .replace(/^export\s+default\s*/, "")
          .replace(/^{/, "")
          .replace(/}$/, "")}
      }

      createApp({
        components: {
          ${componentName},
        },
      }).mount("#app")
    </script>
  </body>
</html>
`
  }

  /**
   * Process a single Vue file
   */
  processVueFile(filePath) {
    try {
      console.log(`Processing: ${filePath}`)

      const { template, script, styles } = this.parseVueFile(filePath)
      const componentName = this.getComponentName(filePath)

      if (!template) {
        console.warn(`  ⚠️  No template found in ${filePath}`)
        return
      }

      if (!script) {
        console.warn(`  ⚠️  No script found in ${filePath}`)
        return
      }

      const htmlContent = this.generateHtml(
        componentName,
        template,
        script,
        styles
      )
      const outputPath = path.join(path.dirname(filePath), "index.html")

      fs.writeFileSync(outputPath, htmlContent)
      console.log(`  ✅ Generated: ${outputPath}`)
    } catch (error) {
      console.error(`  ❌ Error processing ${filePath}:`, error.message)
    }
  }

  /**
   * Generate HTML files for all Vue components
   */
  generateAll() {
    console.log("🔍 Finding Vue components...")
    const vueFiles = this.findVueComponents()

    if (vueFiles.length === 0) {
      console.log("No Vue components found.")
      return
    }

    console.log(`📦 Found ${vueFiles.length} Vue component(s)`)
    console.log("")

    for (const filePath of vueFiles) {
      this.processVueFile(filePath)
    }

    console.log("")
    console.log("🎉 Generation complete!")
  }

  /**
   * Watch for changes and regenerate
   */
  watch() {
    console.log("👀 Watching for Vue file changes...")

    const vueFiles = this.findVueComponents()

    for (const filePath of vueFiles) {
      fs.watchFile(filePath, (curr, prev) => {
        if (curr.mtime !== prev.mtime) {
          console.log(`\n📝 ${filePath} changed, regenerating...`)
          this.processVueFile(filePath)
        }
      })
    }

    console.log(
      `Watching ${vueFiles.length} Vue file(s). Press Ctrl+C to stop.`
    )
  }
}

// CLI interface
const generator = new VueHtmlGenerator()

const command = process.argv[2]

switch (command) {
  case "watch":
    generator.generateAll()
    generator.watch()
    break
  case "generate":
  default:
    generator.generateAll()
    break
}

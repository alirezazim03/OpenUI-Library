#!/usr/bin/env node

import * as glob from "glob"
import Ajv from "ajv"
import { schema } from "../../ui-metadata/index"
import * as fs from "node:fs"
import * as path from "node:path"

const ajv = new Ajv()
const validate = ajv.compile(schema)

function validateMetadata(): boolean {
  const componentsDir = path.join(process.cwd(), "components")
  // Use forward slashes for glob pattern to ensure cross-platform compatibility
  const pattern = componentsDir.replace(/\\/g, "/") + "/**/component.json"

  try {
    // Use fs.readdirSync recursively to find all component.json files
    function findComponentJsonFiles(dir: string): string[] {
      const files: string[] = []

      try {
        const items = fs.readdirSync(dir)

        for (const item of items) {
          const fullPath = path.join(dir, item)
          const stat = fs.statSync(fullPath)

          if (stat.isDirectory()) {
            files.push(...findComponentJsonFiles(fullPath))
          } else if (item === 'component.json') {
            files.push(fullPath)
          }
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error reading directory ${dir}:`, (error as Error).message)
      }

      return files
    }

    const files = findComponentJsonFiles(componentsDir)

    if (files.length === 0) {
      // eslint-disable-next-line no-console
      console.log("No component.json files found")
      return true
    }

    let hasErrors = false

    for (const file of files) {
      // eslint-disable-next-line no-console
      console.log(`Validating ${file}...`)

      try {
        const content = fs.readFileSync(file, "utf8")
        const metadata = JSON.parse(content)

        const isValid = validate(metadata)

        if (!isValid) {
          // eslint-disable-next-line no-console
          console.error(`❌ Validation failed for ${file}:`)
          // eslint-disable-next-line no-console
          console.error(validate.errors)
          hasErrors = true
        } else {
          // eslint-disable-next-line no-console
          console.log(`✅ ${file} is valid`)
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`❌ Error processing ${file}:`, (error as Error).message)
        hasErrors = true
      }
    }

    return !hasErrors
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error during validation:", (error as Error).message)
    return false
  }
}

const isValid = validateMetadata()
process.exit(isValid ? 0 : 1)
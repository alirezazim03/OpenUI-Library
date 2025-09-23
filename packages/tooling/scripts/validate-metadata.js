#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const glob = require('glob')
const Ajv = require('ajv')
const { schema } = require('../../ui-metadata')

const ajv = new Ajv()
const validate = ajv.compile(schema)

function validateMetadata() {
  const componentsDir = path.join(process.cwd(), 'components')
  const pattern = path.join(componentsDir, '**/component.json')

  try {
    const files = glob.sync(pattern)

    if (files.length === 0) {
      console.log('No component.json files found')
      return true
    }

    let hasErrors = false

    for (const file of files) {
      console.log(`Validating ${file}...`)

      try {
        const content = fs.readFileSync(file, 'utf8')
        const metadata = JSON.parse(content)

        const isValid = validate(metadata)

        if (!isValid) {
          console.error(`❌ Validation failed for ${file}:`)
          console.error(validate.errors)
          hasErrors = true
        } else {
          console.log(`✅ ${file} is valid`)
        }
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message)
        hasErrors = true
      }
    }

    return !hasErrors
  } catch (error) {
    console.error('Error during validation:', error.message)
    return false
  }
}

const isValid = validateMetadata()
process.exit(isValid ? 0 : 1)

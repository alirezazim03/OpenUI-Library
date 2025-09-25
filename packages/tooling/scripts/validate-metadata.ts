#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import * as glob from 'glob'
import Ajv from 'ajv'
import { schema } from '../../ui-metadata/index'

const ajv = new Ajv()
const validate = ajv.compile(schema)

function validateMetadata(): boolean {
  const componentsDir = path.join(process.cwd(), 'components')
  const pattern = path.join(componentsDir, '**/component.json')

  try {
    const files = glob.sync(pattern)

    if (files.length === 0) {
      // eslint-disable-next-line no-console
      console.log('No component.json files found')
      return true
    }

    let hasErrors = false

    for (const file of files) {
      // eslint-disable-next-line no-console
      console.log(`Validating ${file}...`)

      try {
        const content = fs.readFileSync(file, 'utf8')
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
        console.error(`❌ Error processing ${file}:`, error.message)
        hasErrors = true
      }
    }

    return !hasErrors
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error during validation:', error.message)
    return false
  }
}

const isValid = validateMetadata()
process.exit(isValid ? 0 : 1)

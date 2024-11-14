import * as fs from 'fs'
import * as path from 'path'
import readline from 'readline'

// Run this script with npx tsx ./scripts/makeMdx.ts ./content/blog wwwderickwww
// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Function to ensure the filename ends with .mdx
const ensureMdxExtension = (filename: string): string => {
    return filename.endsWith('.mdx') ? filename : `${filename}.mdx`
}

// Function to prompt for categories and then check file existence
const getAdditionalInfoAndCreateFile = (
    directory: string,
    filename: string
) => {
    rl.question('Enter a description for the MDX file: ', (description) => {
        rl.question(
            'Is this MDX file to be published? (yes/no, default: no) ',
            (inputPublished) => {
                const published = inputPublished.trim().toLowerCase() === 'yes'
                rl.question(
                    'Enter categories for the MDX file (comma-separated): ',
                    (inputCategories) => {
                        const categories = inputCategories
                            .split(',')
                            .map((tag) => tag.trim())

                        checkFileAndCreate(
                            directory,
                            filename,
                            description,
                            categories,
                            published
                        )
                    }
                )
            }
        )
    })
}

// Function to check file existence and prompt for new name
const checkFileAndCreate = (
    directory: string,
    filename: string,
    description: string,
    categories: string[],
    published: boolean
) => {
    const fullPath = path.join(directory, ensureMdxExtension(filename))

    fs.access(fullPath, fs.constants.F_OK, (err) => {
        if (err) {
            // If file does not exist, it's safe to create a new one
            createFile(directory, filename, description, categories, published)
        } else {
            console.log('A file with the same name already exists.')
            rl.question('Please enter a new filename: ', (newFilename) => {
                getAdditionalInfoAndCreateFile(directory, newFilename) // Recursively check the new name
            })
        }
    })
}

// Function to create the file with categories
const createFile = (
    directory: string,
    filename: string,
    description: string,
    categories: string[],
    published: boolean
) => {
    const fullPath = path.join(directory, ensureMdxExtension(filename))
    const mdxTemplate = `---
title: ${filename.replace('.mdx', '')}
date: ${new Date().toISOString()}
author: Derick Hoskinson PhD
description: ${description}
published: ${published}
categories: [${categories.map((tag) => `${tag}`).join(', ')}]
---

# New MDX Page

Welcome to your new MDX page. Start editing to add your content!
`

    fs.writeFile(fullPath, mdxTemplate, (err) => {
        rl.close() // Ensure the readline interface is closed
        if (err) {
            console.error('Error creating MDX file:', err)
            process.exit(1) // Exit with an error code
        }
        console.log(`MDX file created successfully at ${fullPath}`)
        process.exit(0) // Clean exit
    })
}

// Get directory and initial filename from command line arguments
const directory = process.argv[2]
const filename = process.argv[3]

// Ensure the directory exists
fs.mkdir(directory, { recursive: true }, (err) => {
    if (err) {
        console.error('Error creating directory:', err)
        rl.close() // Make sure to close readline if directory creation fails
        process.exit(1) // Exit with an error code
    }
    getAdditionalInfoAndCreateFile(directory, filename)
})

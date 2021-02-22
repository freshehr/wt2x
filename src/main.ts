#!/usr/bin/env node
import { program } from 'commander'
import { readFileSync, writeFileSync } from 'fs'
import wt2fhir from './wt2fhir'
// import webtemplate from '../templates/better/a_lot.json'
// import wt2fhir from '../src/wt2fhir'
// const lm = wt2fhir(webtemplate)

program.version(process.env.npm_package_version)

program
    .command('fhir <input> [output]')
    .description('convert webtemplate to fhir logical model', {
        input: 'input file',
        output: 'output file'
    })
    .option('-l --lang', 'language to convert to')
    .action((input, output, options: { lang: string }) => {
        const webtemplateBuffer = readFileSync(input)
        const webtemplate = JSON.parse(webtemplateBuffer.toString())
        const logicalModel = wt2fhir(webtemplate, options.lang)
        writeFileSync(output, JSON.stringify(logicalModel, null, 2))
    })

program
    .command('md <input> [output]')
    .description('convert webtemplate to markdown', {
        input: 'input webtemplate file',
        output: 'output markdown file'
    })
    .action((input: string, output: string) => {
        console.log("Still working on this. Please contribute at https://github.com/sidharthramesh/wt2x")
    })

program.parse(process.argv)
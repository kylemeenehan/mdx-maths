#!/usr/bin/env node
import {open, writeFile, readFile} from 'node:fs/promises';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'
// import {readFileSync, writeFileSync} from 'node:fs';
import {unified} from 'unified'
import {reporter} from 'vfile-reporter'
// import {remark} from 'remark';
import math from 'remark-math';
import pdf from 'remark-pdf/node';
import markdown from 'remark-parse'

console.log('starting up');

const y = yargs(hideBin(process.argv));

await y.scriptName("stemd")
    .usage('$0 <cmd> [args]')
    .command('compile [input] [output]', 'compiles a stemd markdown file to pdf', (yargs: any) => {
        yargs.positional('input', {
            type: 'string',
            default: 'documents/src/index.md',
            describe: 'the source file to be compiled'
        })
        yargs.positional('output', {
            type: 'string',
            default: 'documents/dist/index.pdf',
            describe: 'the path to the compiled pdf'
        })
    }, async (argv: any) => {

        console.log(`compiling ${argv.input} to ${argv.output}`);
        const file = await readFile(argv.input, 'utf8');
        const processed = await unified()
            .use(markdown)
            .use(math)
            .use(pdf as any, {
                output: "buffer"
            })
            .process(file)
        const buffer: any = await processed.result;
        await writeFile(argv.output, buffer);
    })
    .help()
    .argv

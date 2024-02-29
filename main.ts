const fs = require('fs')
const generate = require('./src/generate')
console.log(generate(fs.readFileSync(process.stdin.fd, 'utf-8')))
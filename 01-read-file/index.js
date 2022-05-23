const fs = require('fs')
const path = require('path')

const patchList = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8')
patchList.on('data', chunk => console.log(chunk))
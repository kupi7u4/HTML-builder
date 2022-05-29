const fs = require('fs')
const path = require('path')
const readLine = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
const pathToFile = path.join(__dirname, 'text.txt')
const textFile = fs.createWriteStream(pathToFile)

readLine.write('Введите сообщение:\n')

readLine.on('line', str => {
  if (str.trim() === 'exit') {
    process.exit()
  }
  textFile.write(`${str}\n`)
})

process.on('exit', () => console.log('Работа завершена'))
process.on('SIGINT', () => process.exit())
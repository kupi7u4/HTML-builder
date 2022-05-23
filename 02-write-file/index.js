const fs = require('fs')
const path = require('path')
const readLine = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

// Создаём поток записи в файл
const patchList = fs.createWriteStream(path.join(__dirname, 'text.txt'))

// Вывод сообщения
readLine.write('Введите сообщение:\n')

// // Получаем сообщение и проверяем его на exit
readLine.on('line', str => {
  if (str.trim() === 'exit') {
    process.exit()
  }
  patchList.write(`${str}\n`)
})

// Реализация прощального сообщения при остановке процесса
process.on('exit', () => console.log('Работа завершена'))
process.on('SIGINT', () => process.exit())
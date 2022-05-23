const fs = require('fs')
const path = require('path')

const stylesDirr = path.join(__dirname, 'styles') 

fs.readdir(stylesDirr, (err, files) => {
  if (err) throw err

  let content = ''
  files.forEach(el => {
    if (path.extname(el) === '.css') {
      // Читаем файл
      let input = fs.createReadStream(path.join(stylesDirr, el), 'utf-8')
      let output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'))
      // Записываем прочитанное
      input.on('data', chunk => output.write(content += `${chunk}\n`))
      input.on('error', err => console.log('Ошибка' + err.message))
    }
  })

})
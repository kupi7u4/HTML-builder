const fs = require('fs')
const path = require('path')
const templateFile = path.join(__dirname, 'template.html') 
const componentsDirr = path.join(__dirname, 'components')
const stylesDirr = path.join(__dirname, 'styles') 

fs.promises.mkdir(path.join(__dirname, 'project-dist'), { recursive: true })

fs.readFile(templateFile, 'utf-8', (err, data) => {
  if (err) throw err
  let indexHtml = data
  fs.readdir(componentsDirr, (err, files) => {
    if (err) throw err
    files.forEach(el => {
      fs.readFile(path.join(__dirname, 'components', el), 'utf-8', (err, data) => {
        if (err) throw err
        let fileName = path.parse(el).name
        let tag = `{{${fileName}}}`
        indexHtml = indexHtml.replace(tag, data)
        fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), indexHtml, err => {
          if (err) throw err
        })
      })
    })
  })
})

fs.readdir(stylesDirr, (err, files) => {
  if (err) throw err
  let content = ''
  files.forEach(el => {
    if (path.extname(el) === '.css') {
      // Читаем файл
      let input = fs.createReadStream(path.join(stylesDirr, el), 'utf-8')
      let output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'))
      // Записываем прочитанное
      input.on('data', chunk => output.write(content += `${chunk}\n`))
      input.on('error', err => console.log('Ошибка' + err.message))
    }
  })

})

function copyFiles(name = 'assets') {
  let fromDirr
  let destinationDirr
  if (name === 'assets') {
    fromDirr = path.join(__dirname, 'project-dist', name)
    destinationDirr = path.join(__dirname)
  } else {
    fromDirr = path.join(__dirname, 'project-dist', 'assets', name)
    destinationDirr = path.join(__dirname, 'assets')
  }
  fs.promises.mkdir(fromDirr, { recursive: true })
  try {
    fs.readdir(path.join(destinationDirr, name), (err, files) => {
      if (err) throw err
      files.forEach(el => {
        fs.stat(path.join(destinationDirr, name, el), function (err, stats) {
          if (err) throw err
          //Проверка объекта на то, что он является файлом
          if (stats.isFile()) {
            fs.promises.copyFile(
              path.join(destinationDirr, name, el),
              path.join(fromDirr, el)
            )
          } else {
            let folderName = path.parse(el).name
            copyFiles(folderName)
          }
        })  
      })
      fileDel(files, fromDirr)
    })
  } catch (err) {
    console.log(err);
  }
}
copyFiles()

function fileDel(files, dirr) {
  try {
    fs.readdir(path.join(dirr), (err, filesCopy) => {
      if (err) throw err
      filesCopy.forEach(el => {
        fs.stat(path.join(dirr, el), function (err, stats) {
          if (err) throw err
          if (files.indexOf(el) === -1) {
            if (stats.isFile()) {
              fs.unlink(path.join(dirr, el), err => {
                if (err) throw err
              })
            } else {
              fs.rmdir(path.join(dirr, el), err => {
                if (err) throw err;
              })
            }
          }
        })
      })
    })
  } catch (err) {
    console.log(err)
  }
}

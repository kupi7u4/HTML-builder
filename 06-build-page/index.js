const fs = require('fs')
const path = require('path')

fs.promises.mkdir(path.join(__dirname, 'project-dist'), { recursive: true })

fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
  if (err) throw err
  let indexHtml = data
  fs.readdir(path.join(__dirname, 'components'), (err, files) => {
    if (err) throw err
    files.forEach(el => {
      fs.readFile(path.join(__dirname, 'components', el), 'utf-8', (err, data) => {
        if (err) throw err
        let fileName = path.parse(el).name
        let tag = `{{${fileName}}}`
        indexHtml = indexHtml.replace(tag, data)
        fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), indexHtml, err =>{
          if (err) throw err
        })
      })
    })
  })
})

function copyFiles(name = 'assets') {
  let dirr;
  let src;
  if (name === 'assets') {
    dirr = path.join(__dirname, 'project-dist', name)
    src = path.join(__dirname)
  } else {
    dirr = path.join(__dirname, 'project-dist', 'assets', name)
    src = path.join(__dirname, 'assets')
  }
  fs.promises.mkdir(dirr, { recursive: true })
  try {
    fs.readdir(path.join(src, name), (err, files) => {
      if (err) throw err
      files.forEach(el => {
        fs.stat(path.join(src, name, el), function (err, stats) {
          if (err) throw err
          //Проверка объекта на то, что он является файлом
          if (stats.isFile()) {
            fs.promises.copyFile(
              path.join(src, name, el),
              path.join(dirr, el)
            )
          } else {
            let folderName = path.parse(el).name
            copyFiles(folderName)
          }
        })  
      })
      fileDel(files, dirr)
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

const fs = require('fs')
const path = require('path')

// { recursive: true } - помогает избежать ошибок, в случаях когда директория уже создана
const newDirr = path.join(__dirname, 'files-copy')
fs.promises.mkdir(newDirr, { recursive: true })

try {
  fs.readdir(path.join(__dirname, 'files'), (err, files) => {
    if (err) throw err
    files.forEach(el => {
      //Копируем файл из папки files в files-copy
      fs.promises.copyFile(
        path.join(__dirname, 'files', el),
        path.join(newDirr, el)
      )
    })
    fileDel(files)
  })
} catch (err) {
  console.log(err)
}

function fileDel(files) {
  try {
    fs.readdir(path.join(newDirr), (err, filesCopy) => {
      if (err) throw err
      filesCopy.forEach((el) => {
        if (files.indexOf(el) === -1) {
          fs.unlink(path.join(newDirr, el), err => {if (err) throw err})
        }
      })
    })
  } catch (err) {
    console.log(err)
  }
}


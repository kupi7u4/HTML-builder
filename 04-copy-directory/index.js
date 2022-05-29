const fs = require('fs')
const path = require('path')

// { recursive: true } - помогает избежать ошибок, в случаях когда директория уже создана
const destination = path.join(__dirname, 'files-copy')
const source = path.join(__dirname, 'files')

fs.promises.mkdir(destination, { recursive: true })

try {
  fs.readdir(source, (err, files) => {
    if (err) throw err
    
    files.forEach(el => {
      fs.promises.copyFile(
        path.join(__dirname, 'files', el),
        path.join(destination, el)
      )
    })
    fileDel(files)
  })
} catch (err) {
  console.log(err)
}

function fileDel(files) {
  try {
    fs.readdir(path.join(destination), (err, filesCopy) => {
      if (err) throw err
      filesCopy.forEach((el) => {
        if (files.indexOf(el) === -1) {
          fs.unlink(path.join(destination, el), err => {if (err) throw err})
        }
      })
    })
  } catch (err) {
    console.log(err)
  }
}


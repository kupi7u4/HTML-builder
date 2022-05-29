const fs = require('fs')
const path = require('path')
const pathToFolder = path.join(__dirname, 'secret-folder')

fs.readdir(pathToFolder, (err, files) => {
  if (err) throw err

  files.forEach(el => {
    const pathToFile = path.join(pathToFolder, el)  
    fs.stat(pathToFile, (err, stats) => {
      if (err) throw err
      if (stats.isFile()) {
        let arrName = el.split('.')        
        arrName.push((stats.size / 1000) + 'kb')
        console.log(arrName.join(' - '))
      }
    })
  })

})
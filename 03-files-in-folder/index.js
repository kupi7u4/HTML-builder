const fs = require('fs')
const path = require('path')

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, files) => {
  if (err) throw err
  files.forEach(el => {
    if (!el.isDirectory()) {
      fs.stat(path.join(__dirname, 'secret-folder', el.name), (err, stats) => {
        if (err) throw err
        let arrName = el.name.split('.')        
        arrName.push((stats.size / 1000) + 'kb')
        console.log(arrName.join(' - '))
      })
    }
  })
})
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

  });
})

// 7. Использовать скрипт из задания 04-copy-directory для переноса папки assets в папку project-dist

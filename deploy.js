const fs = require('fs')
const Ftp = require('ftp')
const ftp = new Ftp()
const jschardet = require('jschardet')
const Iconv = require('iconv').Iconv

const serverPath = '/skawashima.com/test/' // 接続するサーバー内Pathを定義

const removeExistingFile = (err, list) => { // リストのファイルを全て削除
  if (err) throw err
  // for (const file of list) {
  //   if (file.type !== 'd') {
  //     console.log(`deleting${file.name}\n\n`)
  //     const detectEncoding = jschardet.detect(file.name).encoding
  //     console.log(detectEncoding)
  //     const iconv = new Iconv(detectEncoding, 'ASCII//TRANSLIT//IGNORE')

  //     const covertedFileName = iconv.convert(file.name).toString()
  //     console.log(covertedFileName)

  //     ftp.delete(`${serverPath}${file.name}`, (err) => {
  //       if (err) throw err
  //       console.log(`deleted: ${file.name}`)
  //       ftp.end()
  //     })
  //   }
  // }
  ftp.delete('skawashima.com/test', err => {
    console.error(err)
    
  })
}

const upload = () => {
  const files = fileRead('dist')
  for (const file of files) {
    console.log(`uploding: ${file}`)
    ftp.put(`${file}`, `${serverPath}${file}`, (err) => {
      if (err) throw err
      console.log(`uploaded: ${file}`)
      ftp.end()
    })
  }
}

ftp.on('ready', () => { // ↓のconnectが成功したら発火
  ftp.list(serverPath, (err, list) => { // 既存ファイルのリストを取得
    console.log(list)
    removeExistingFile(err, list) // 既存ファイルの削除
    upload() // ファイルをアップロード
  })
})

ftp.connect({ // FTP接続する
  host: 'ftp16.gmoserver.jp',
  user: 'sd0979660@gmoserver.jp',
  password: '6$MGr6EmdQCd5kyY'
})

const fileRead = (path) => {
  const fileList = []
  files = fs.readdirSync(path, { withFileTypes: true })
  files.forEach((file) => {
    if (file.isDirectory()) {
      dir_files = fileRead(`${path}/${file.name}`)
      dir_files.forEach((dir_file) => {
        fileList.push(dir_file)
      })
    } else {
      if (file.name !== '.DS_Store') {
          fileList.push(`${path}/${file.name}`.replace('dist/', ''))
      }
    }
  })
  return fileList
}

// console.log(fileRead('./dist'))

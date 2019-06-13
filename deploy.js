'use struct'

const fs = require('fs')
const Ftp = require('ftp')
const ftp = new Ftp()

const serverPath = '/skawashima.com/blog/' // 接続するサーバー内Pathを定義

const removeExistingFile = (err, list) => { // リストのファイルを全て削除
  if (err) throw err
  for (const file of list) {
    if (file.type !== 'd') {
      ftp.delete(`${serverPath}${file.name}`, (err) => {
        if (err) throw err
        console.log(`deleted: ${file.name}`)
        ftp.end()
      })
    }
  }
}

const upload = () => {
  const files = fs.readdirSync('./dist')
  console.log(files)
  for (const file of files) {
    console.log(file)
    ftp.put(`./dist/${file}`, `${serverPath}${file}`, (err) => {
      if (err) throw err
      console.log(`uploaded: ${file}`)
      ftp.end()
    })
  }
}

ftp.on('ready', () => { // ↓のconnectが成功したら発火
  ftp.list(serverPath, (err, list) => { // 既存ファイルのリストを取得
    // removeExistingFile(err, list) // 既存ファイルの削除
    upload() // ファイルをアップロード
  })
})

ftp.connect({ // FTP接続する
  host: 'ftp16.gmoserver.jp',
  user: 'sd0979660@gmoserver.jp',
  password: '6$MGr6EmdQCd5kyY'
})

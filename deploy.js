const FtpDeploy = require('ftp-deploy')
const ftpDeploy = new FtpDeploy()
require('dotenv').config()

const config = {
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_HOST,
  localRoot: __dirname + '/dist',
  remoteRoot: '/skawashima.com/blog/',
  include: ['**/*.*'],
  exclude: ['.DS_Store'],
  deleteRemote: true,
  forcePasv: true
}

ftpDeploy.deploy(config)
  .then((res) => {
    console.log(`finished.`)
  })
  .catch((err) => {
    console.error(err)
  })

ftpDeploy.on('uploaded', (data) => {
  console.log(`uploded ${data.transferredFileCount}: ${data.filename}`) // same data as uploading event
})

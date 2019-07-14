const path = require('path')
const repo = 'config'
const { exists} = require("./utils")
const workingDirPath = path.join(__dirname, repo)
const repoUrl = 'git@github.com:chong0808/config.git'

async function start() {
  exists(workingDirPath)
  const git = require('simple-git')(workingDirPath);

  const isRepo = await new Promise((resolve, reject) => {
    git.checkIsRepo((err, res)=>{
      if (err) reject(err);
      else resolve(res)
    })
  });
  
  if (!isRepo) {
    await new Promise((resolve, reject) => {
      git.clone( repoUrl, (err, data) => {
        console.log("git clone ")
        console.log(err)
        console.log(data)
        if (err) reject(err);
        else resolve(data)
      })
    })
    await git.init();
    await new Promise((resolve, reject) => {
      git.addRemote('master', repoUrl, (err, data) => {
        console.log("git remote origin")
        console.log(err)
        console.log(data)
        if (err) reject(err);
        else resolve(data)
      })
    })
    await new Promise((resolve, reject) => {
      git.checkoutBranch('master', function (err, data) {
        console.log("git pull")
        console.log(err)
        console.log(data)
        if (err) reject(err);
        else resolve(data)
      })
    })
    await new Promise((resolve, reject) => {
      git.pull(function (err, data) {
        console.log("git pull")
        console.log(err)
        console.log(data)
        if (err) reject(err);
        else resolve(data)
      })
    })
  }
  console.log("end")
}

start()




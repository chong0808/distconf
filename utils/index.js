const fs = require('fs')

exports.exists =  (_path) => fs.existsSync(_path) && fs.statSync(_path).isDirectory(_path)

exports.promisify = (git) => {
  git.pullAsync = async function () {
    return new Promise((resolve, reject) => {
      git.pull((err, data) => {
        if (err) reject(err);
        else resolve(data)
      })
    })
  }
  git.checkoutAsync = async function (branchname) {
    return new Promise((resolve, reject) => {
      git.checkout(branchname, function (err, data) {
        if (err) reject(err);
        else resolve(data)
      })
    })
  }
  git.pullAsync = async function () {
    return new Promise((resolve, reject) => {
      git.pull((err, data) => {
        if (err) reject(err);
        else resolve(data)
      })
    })
  }
  git.cloneAsync = async function (repoUrl) {
    await new Promise((resolve, reject) => {
      git.clone(repoUrl, (err, data) => {
        if (err) reject(err);
        else resolve(data)
      })
    })
  }
}
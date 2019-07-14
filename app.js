const path = require('path')
const repo = './config'
const { exists, promisify } = require("./utils")
const workingDirPath = path.join(__dirname, repo)
const repoUrl = 'git@github.com:chong0808/config.git'
let branchName = 'master'
console.log(workingDirPath)
async function start(name) {
  const git = require('simple-git')()
    .outputHandler((command, stdout, stderr) => {
    stdout.pipe(process.stdout);
    stderr.pipe(process.stderr);
  });
  promisify(git)
  if (!exists(workingDirPath)) {
    await git.cloneAsync(repoUrl)
  }
  git.cwd(workingDirPath)
  await git.checkoutAsync(name || branchName)
  await git.pullAsync()
  console.log("end")
}

start()


 



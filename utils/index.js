const fs = require('fs')

exports.exists = function (_path) {
  if (!(fs.existsSync(_path) && fs.statSync(_path).isDirectory(_path))) {
    fs.mkdirSync(_path)
  }
}
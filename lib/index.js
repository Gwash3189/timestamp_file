const { Promise } = require('es6-promise')
const fs = require('fs')
const { join } = require('path')

module.exports = {
  create: (path, cb, date = new Date()) => {
    if (typeof cb === 'object') {
      date = cb
    }

    const sections = path.split('/')
    const newPath = join(...top(sections), `${date.getTime()}_${last(sections)}`)

    return new Promise((resolve, reject) => {
      fs.open(newPath, 'a', (err, fd) => {
        chuck(err, cb, reject)
        fs.close(fd, (err, () => {
          chuck(err, cb, reject)
          finish(cb, resolve, newPath)
        }))
      })
    })
  }
}

function finish (cb, resolve, x) {
    resolve(x)
    if (cb) {
      cb(undefined, x)
    }
}

function chuck (err, cb, reject) {
  if (cb && err) {
    cb(err)
    throw err
  } else if (err) {
    reject(err)
  }
}

function last (arr) {
  return arr[arr.length - 1]
}

function top (arr) {
  return arr.filter((x, i) => {
    if (i === arr.length - 1) {
      return false
    }
    return true
  })
}

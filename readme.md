# Timestamp-file

A simple tool that makes a file with a timestamp prepended to the name

## API

### create

Can be used in classic node callback style, or with promises

```js

const timestampFile = require('timestamp-file')

timestampFile.create('new/file.js', (err, path) => {
  if (err) {
    // shrug
  }
  // otherwise file exists at provided path
})

timestampFile.create('another/location/thing.js')
  .then((path) => {
    // yay
  }, (err) => {
    // boo
  })
```

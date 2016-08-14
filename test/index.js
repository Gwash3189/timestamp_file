const { expect } = require('chai')
const { spy, useFakeTimers } = require('sinon')
const mock = require('mock-require')

let timestamp

describe('timestamp_file', () => {
  const path = 'your/mother.migration.js'

  let openSpy,
    closeSpy

  context('without errors', () => {
    beforeEach(() => {
      openSpy = spy((x, y, cb) => cb(undefined, 1))
      closeSpy = spy((_, cb) => cb())
      useFakeTimers()

      mock('fs', {
        open: openSpy,
        close: closeSpy
      })

      timestamp = require('../lib/index.js')
    })

    context('without a date', () => {
      it('adds a timestamp to the filename', () => {
        timestamp.create(path)
          .then(() => {
            const date = new Date().getTime()
            const [ path ] = openSpy.firstCall.args

            expect(path)
              .to.include(date)
          })
      })
    })

    context('with a date', () => {
      it('adds a timestamp to the filename', () => {
        timestamp.create(path, { getTime: () => 1 })
          .then(() => {
            const [ path ] = openSpy.firstCall.args

            expect(path)
              .to.include(1)
          })
      })
    })

    context('with a callback', () => {
      it('calls the provided call back', (done) => {
        const cbSpy = spy()

        timestamp.create(path, () => {
          cbSpy()

          expect(cbSpy.called)
          .to.be.true

          done()
        })
      })
    })

    context('without a callback', () => {
      it('returns a promise', (done) => {
        timestamp.create(path)
          .then(() => done())
      })
    })
  })

  context('with errors', () => {
    context('when opening the file', () => {
      beforeEach(() => {
        openSpy = spy((x, y, cb) => cb(new Error()))
        closeSpy = spy((_, cb) => cb())

        mock('fs', {
          open: openSpy,
          close: closeSpy
        })

        timestamp = require('../lib/index.js')
      })

      context('with a call back', () => {
        it('provides the error', (done) => {
          timestamp.create(path, (err) => {
            expect(err)
              .to.be.ok

              done()
          })
        })
      })

      context('without a callback', () => {
        it('rejects the promise', (done) => {
          const rejectSpy = spy()
          timestamp.create(path)
            .catch((err) => {
              expect(err)
                .to.be.ok
            })
            .then(() => done())
        })
      })
    })
  })
})

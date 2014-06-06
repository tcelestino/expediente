var expect = require('expect.js')
  , lib = require('../lib')
  , expediente = require('../')
  , start = '10:00'
  , defaults = require('../conf')
  , hours = { hours: 8, minutes: 0 }
  , simple = expediente({ start: start, hours: defaults.hours })
  , verbose = expediente({ start: start, hours: defaults.hours, detailed: true })

describe('#expediente', function () {
  it('should calculate the expected exit time', function () {
    expect(simple).to.eql('19:48')
  })

  it('should return null if the start hour is invalid', function () {
    expect(expediente('25:09')).to.be(null)
  })

  describe('<hours>', function () {
    it('should accept a expedient time as second argument', function () {
      expect(expediente({ start: start, hours: hours })).to.eql('18:00')
    })

    it('should return null if the expedient duration is invalid', function () {
      expect(expediente({ start: start, hours: '27:12' })).to.eql(null)
      // expect(expediente({ start: start, hours: '8:92' })).to.eql(null)
    })
  })

  describe('<verbose>', function () {
    it('should return a detailed object', function () {
      expect(verbose).to.be.a('object')
    })

    it('it should return the start', function () {
      expect(verbose.start).to.eql(start)
    })

    it('it should return the exit hour', function () {
      expect(verbose.finish).to.eql('19:48')
    })

    /*it('should return the limit time', function () {
      expect(verbose.limit).to.eql('20:08')
    })*/

    it('should return the remaining time', function () {
      expect(verbose.remaining).to.eql('09:48')
    })

    it('should work with all the hours argument', function () {
      var hoursVerbose = {
          start: start
        , finish: '18:00'
        // , limit: '18:20'
        , remaining: '08:00'
      }
      expect(expediente({ start: start, hours: hours, detailed: true })).to.eql(hoursVerbose)
    })
  })
})
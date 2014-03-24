var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')
var includePathSearcher = require('include-path-searcher')
var quickTemp = require('quick-temp')
var mapSeries = require('promise-map-series')
var less = require('less')
var _ = require('lodash')


module.exports = LessCompiler
function LessCompiler (sourceTrees, inputFile, outputFile, options) {
  if (!(this instanceof LessCompiler)) return new LessCompiler(sourceTrees, inputFile, outputFile, options)
  this.sourceTrees = sourceTrees
  this.inputFile = inputFile
  this.outputFile = outputFile
  this.options = options || {};
}

LessCompiler.prototype.read = function (readTree) {
  var self = this
  quickTemp.makeOrRemake(this, '_tmpDestDir')
  var destFile = this._tmpDestDir + '/' + this.outputFile
  mkdirp.sync(path.dirname(destFile))
  return mapSeries(this.sourceTrees, readTree)
    .then(function (paths) {
      var file = includePathSearcher.findFileSync(self.inputFile, paths)
      var options = {
        paths: paths
      }
      _.merge(options, self.options)
      var css = less.render(file, options);
      fs.writeFileSync(destFile, css, { encoding: 'utf8' })
      return self._tmpDestDir
    })
}

LessCompiler.prototype.cleanup = function () {
  quickTemp.remove(this, '_tmpDestDir')
}

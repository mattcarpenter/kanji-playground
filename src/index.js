const svgUtils = require('./lib/svg-utils')
const Raphael = require('raphael')
const RaphaelSketchpad = require('./lib/raphael.sketchpad')
const sample = require('../data/sample.svg').default
const Kanji = require('./lib/kanji')

// Register sketchpad plugin
RaphaelSketchpad(Raphael)

const kanji = Kanji.fromXml(sample)
const dimensions = kanji.getDimensions()
const sketchpadEl = document.querySelector('#sketchpad')
const sketchpadContainerEl = document.querySelector('#sketchpad-container')

const sketchpadWidth = sketchpadContainerEl.clientWidth
const sketchpadHeight =  dimensions.height * sketchpadWidth / dimensions.width

sketchpadContainerEl.style.height = sketchpadHeight + 'px'

// draw sample
let xml = kanji.getXml(sketchpadWidth, sketchpadHeight)
document.querySelector('#sketch-guide').innerHTML = xml

const sketchpad = Raphael.sketchpad("sketchpad", {
  width: sketchpadEl.clientWidth,
  height: sketchpadEl.clientHeight,
    editing: true
  });

document.querySelector('#compare').addEventListener('click', function (e) {
  e.preventDefault()

  let sketchpadStrokes = svgUtils.jsonToPathPoints(sketchpad.json())

  console.log(kanji.compareWithStrokes(sketchpadStrokes, sketchpadWidth, sketchpadHeight))
})
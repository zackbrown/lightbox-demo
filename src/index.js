'use strict';

// Famous dependencies
var DOMElement = require('famous/dom-renderables/DOMElement');
var FamousEngine = require('famous/core/FamousEngine');
var Grid = require('./Grid');
var Node = require('famous/core/Node');
var Camera = require('famous/components/Camera');
var Scale = require('famous/components/Scale');
var Opacity = require('famous/components/Opacity');
var Item = require('./item');

function randInt (range) {
    return (range * Math.random())|0;
}

function randomColor () {
    return 'HSL(' + randInt(360) + ', ' + randInt(100) + '%, ' + randInt(100) + '%)'
}

// Boilerplate code to make your life easier
FamousEngine.init();
var scene = FamousEngine.createScene();
var camera = new Camera(scene);
camera.setDepth(1000);

var background = scene.addChild();

window.grid = background.addChild(new Grid());

for (var i = 0 ; i < 40 ; i++) {
    var child = grid.addChild( new Item([250, 275], [400, 700]) );
}

setTimeout(function () {
    grid.onSizeChange();
}, 100);



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
var Sliders = require('./Sliders');
var Button = require('./Button');
var Panel = require('./panel');

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

var slidersOn = false;
var panelOn = false;

background.onReceive = function (e, p) {
    if (e === 'change') {
        if (p.node.name === 'marginX') grid.setMargin((p.value - ''));
        if (p.node.name === 'marginY') grid.setMargin(null, p.value - '');
    } else if (e === 'click' && p.node === button) {
        if (!slidersOn) {
            sliders.slideIn();
            slidersOn = true;
        } else {
            sliders.slideOut();
            slidersOn = false;
        }
    }
}

window.grid = background.addChild(new Grid());
window.sliders = background.addChild(new Sliders());
window.button = background.addChild(new Button());

sliders.setPosition(0, 0, 2);
button.setPosition(0, 0, 5);

for (var i = 0 ; i < 40 ; i++) {
    var child = grid.addChild( new Item([250, 275], [400, 700], i) );
}

setTimeout(function () {
    grid.onSizeChange();
}, 200);



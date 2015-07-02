var Node = require('famous/core/Node');
var DOMElement = require('famous/dom-renderables/DOMElement');

function Sliders () {
    Node.call(this);
    this.el = new DOMElement(this, {
        properties: {
                        backgroundColor: 'black'
                    }
    });
    this.setOpacity(0.8);
    this.setProportionalSize(0.2);
}

Sliders.prototype = Object.create(Node.prototype);
Sliders.prototype.constructor = Sliders;

module.exports = Sliders;


var Node = require('famous/core/Node');
var DOMElement = require('famous/dom-renderables/DOMElement');
var Position = require('famous/components/Position');

function Sliders () {
    Node.call(this);

    this.el = new DOMElement(this, {
        properties: {
                        backgroundColor: 'grey',
                        border: '1px solid white'
                    }
    });

    this.setOpacity(0.8);
    this.setAbsoluteSize(300);
    this.setSizeMode('absolute');
    this.align = new Position(this);
    this.align.set(-310, 0, 3);

    _makeSlider.call(this, 30, 'marginX');
    _makeSlider.call(this, 115, 'marginY');
}

Sliders.prototype = Object.create(Node.prototype);
Sliders.prototype.constructor = Sliders;

Sliders.prototype.slideIn = function slideIn () {
    this.align.set(0, 0, 3, {duration: 200, curve: 'easeIn'});
};

Sliders.prototype.slideOut = function slideOut () {
    this.align.set(-310, 0, 3, {duration: 200, curve: 'easeIn'});
};

function _makeSlider (y, name) {
    var child = this.addChild();
    child.setSizeMode(null, 'absolute').setAbsoluteSize(0, 75).setPosition(0, y);

    var label = child.addChild();
    new DOMElement(label, {
        properties: {
                        color: 'white',
                        textAlign: 'center'
                    },
        content: name || ''
    });

    var slider = child.addChild();
    slider.name = name;
    new DOMElement(slider, {
            tagName: 'input',
            id: name,
            attributes: {
                            type: 'range'
                        }
    });

    slider.addUIEvent('change');

    return child;
}

module.exports = Sliders;


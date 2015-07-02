var Node = require('famous/core/Node');
var Scale = require('famous/components/Scale');
var Opacity = require('famous/components/Opacity');
var DOMElement = require('famous/dom-renderables/DOMElement');

function Overlay (content) {
    Node.call(this);
    this.el = new DOMElement(this, {
        properties: {
                        backgroundColor: 'black',
                        border: '1px solid green',
                        zIndex: '10',
                        fontSize: '20px',
                        fontColor: 'black'
                    },
        content: content || ''
    });
    this.setMountPoint(0.5, 0.5).setOrigin(0.5, 0.5).setAlign(0.5, 0.5);
    this.scale = new Scale(this);
    this.opacity = new Opacity(this);
    this.scale.set(0.6, 0.6, 0.3);
    this.opacity.set(0);
    this.transition = {
        curve: 'easeOutBounce',
        duration: 300
    };
}

Overlay.prototype = Object.create(Node.prototype);
Overlay.prototype.constructor = Overlay;

Overlay.prototype.fadeIn = function fadeIn () {
    this.scale.set(1, 1, 1, this.transition);
    this.opacity.set(0.6, this.transition);
};

Overlay.prototype.fadeOut = function fadeOut () {
    this.scale.set(0.3, 0.3, 0.3, this.transition);
    this.opacity.set(0, this.transition);
};

module.exports = Overlay;


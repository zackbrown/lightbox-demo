var Node = require('famous/core/Node');
var DOMElement = require('famous/dom-renderables/DOMElement');

function Button () {
    Node.call(this);
    this.setAlign(0.01, 0.01)
        .setSizeMode('absolute', 'absolute')
        .setAbsoluteSize(20, 20);
    this.el = new DOMElement(this, {
        properties: {
                        backgroundColor: 'white',
                        borderRadius: '100%'
                    }
    });
    this.addUIEvent('click');
}

Button.prototype = Object.create(Node.prototype);
Button.prototype.constructor = Button;

module.exports = Button;

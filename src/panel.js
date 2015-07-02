var Node = require('famous/core/Node');
var DOMElement = require('famous/dom-renderables/DOMElement');
var Position = require('famous/components/Position');

function randomString () {
    return Math.random().toString(36).substr(2, 10);
}

function Panel () {
    Node.call(this);
    this.a = this.addChild()
                 .setSizeMode('absolute', 'absolute')
                 .setAbsoluteSize(300, 75);
    this.aPos = new Position(this.a);
    this.aPos.set(0);

    this.b = this.addChild()
                 .setSizeMode('absolute', 'absolute')
                 .setAbsoluteSize(300, 125);
    this.bPos = new Position(this.b);
    this.bPos.set(0, 75);

    this.c = this.addChild()
                 .setSizeMode('absolute', 'absolute')
                 .setAbsoluteSize(300, 300);
    this.cPos = new Position(this.c);
    this.cPos.set(0, 200);

    _makeEl(this.a)(this.b)(this.c);
}

Panel.prototype = Object.create(Node.prototype);
Panel.prototype.constructor = Panel;

function _makeEl (node) {
    new DOMElement(node, {
        properties: {
                        color: 'white'
                    },
        content: randomString()
    });
    return _makeEl;
}

Panel.prototype.slideOut = function slideOut () {
    this.aPos.set(0, null, null, {curve: 'easeIn', duration: 300});
    this.bPos.set(0, null, null, {curve: 'easeIn', duration: 500});
    this.cPos.set(0, null, null, {curve: 'easeIn', duration: 700});
};

Panel.prototype.slideIn = function slideIn () {
    this.aPos.set(-300, null, null, {curve: 'easeIn', duration: 300});
    this.bPos.set(-300, null, null, {curve: 'easeIn', duration: 500});
    this.cPos.set(-300, null, null, {curve: 'easeIn', duration: 700});
};

module.exports = Panel;


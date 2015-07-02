var Node = require('famous/core/Node');
var Size = require('famous/components/Size');
var DOMElement = require('famous/dom-renderables/DOMElement');
var Rotation = require('famous/components/Rotation');
var Overlay = require('./Overlay');
var Scale = require('famous/components/Scale');
var Opacity = require('famous/components/Opacity');

function randomInt (range) {
    return (range * Math.random())|0;
}

function randomText (len) {
    return Math.random().toString(36).substr(2, len);
}

function tipTemplate () {
    return randomText(4) + ' ' + randomText(6);
}

function Item (defaultSize, selectedSize, i) {
    Node.call(this);
    this.i = i;
    this.size = new Size(this);
    this.defaultSize = defaultSize;
    this.selectedSize = selectedSize;
    this.size.setAbsolute(defaultSize[0], defaultSize[1]);
    this.size.setMode('absolute', 'absolute');
    this.el = null;
    this.overlay = this.addChild(new Overlay( tipTemplate() ));
    this.overlay.setPosition(0, 0, 2);
    this.backface = this.addChild();
    this.rotation = new Rotation(this);
    this.addUIEvent('mouseenter');
    this.addUIEvent('mouseleave');
    this.addUIEvent('click');
    this.setOrigin(0.5, 0.5);
    this.flipped = false;
    this.makeRing();
    this.makeBackFace();
}

Item.prototype = Object.create(Node.prototype);
Item.prototype.constructor = Item;

Item.prototype.onMount = function () {
    this.el = new DOMElement(this, {
        properties: {
                        background: 'url(/images/goya_' + ((this.i % 12) + 1) + '_thumb.jpg) no-repeat center',
                        zIndex: '100'
                    }
    });
};

Item.prototype.makeRing = function makeRing () {
    this.ring = this.addChild().setOrigin(0.5, 0.5);
    this.ringScale = new Scale(this.ring);
    new DOMElement(this.ring, {
        properties: {
                        border: '1px solid white'
                    }
    });
    this.ringOpacity = new Opacity(this.ring);
    this.ringOpacity.set(0);
}

Item.prototype.makeBackFace = function makeBackFace () {
    new DOMElement(this.backface, {
        properties: {
                        background: 'url(/images/goya_' + ((this.i % 12) + 1) + '.jpg) no-repeat center',
                        backfaceVisibility: 'hidden',
                        webkitBackfaceVisibility: 'hidden'
                    }
    });
    this.backfaceScale = new Scale(this.backface);
    this.backfaceScale.set(0.3, 0.3, 0.3);
    this.backface.setPosition(0, 0, -1);
    this.backface.setOrigin(0.5, 0.5);
    this.backface.setAlign(0.5, 0.5).setMountPoint(0.5, 0.5);
    this.backface.setRotation(0, Math.PI);
    this.backface.setSizeMode('absolute', 'absolute');
};

Item.prototype.onReceive = function (event, payload) {
    if (event === 'mouseenter' && !this.flipped) {
        this.overlay.fadeIn();
        payload.stopPropagation();
    } else if (event === 'mouseleave') {
        this.overlay.fadeOut();
        payload.stopPropagation();
    } else if (event === 'click') {
        if (this.flipped) {
            this.rotation.set(0, 0, 0, {curve: 'easeOutBack', duration: 600});
            this.ringOpacity.set(0);
            this.ringOpacity.set(1, {duration: 600}, function () {
                this.ringOpacity.set(0);
            }.bind(this));
            this.ringScale.set(3, 3, 3);
            this.ringScale.set(1, 1, 1, {duration: 200});
            this.backfaceScale.set(0.3, 0.3, 0.3, {duration: 600});
            this.flipped = false;
        } else {
            this.rotation.set(0, Math.PI, 0, {curve: 'easeOutBack', duration: 600});
            this.ringOpacity.set(1);
            this.ringOpacity.set(0, {duration: 600});
            this.ringScale.set(3, 3, 3, {duration: 600}, function () {
                this.ringScale.set(1, 1, 1, {duration: 100});
            }.bind(this));
            this.backfaceScale.set(1, 1, 1, {duration: 600});
            this.flipped = true;
        }
    }
};

module.exports = Item;


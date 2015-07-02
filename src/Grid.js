'use strict';

var Node = require('famous/core/Node');
var Position = require('famous/components/Position');
var Size = require('famous/components/Size');
var DOMElement = require('famous/dom-renderables/DOMElement');
var Opacity = require('famous/components/Opacity');

function Grid () {
    Node.call(this);
    this._childPositions = [];
    this._childOpacities = [];
    this._cursor = {
        offset: [0, 0],
        index: 0,
        differential: 0,
        size: [0, 0]
    };
    this._margin = [70, 70];
    this._innerGrid = Node.prototype.addChild.call(this);
    this._innerGrid.setProportionalSize(null, 30);
    this._innerEl = new DOMElement(this._innerGrid);
    this._topMargin = 10;
    this._wheelDelta = 0;
    this._snap = true;
    this.selected = null;
    this.back = false;

    this._innerGrid.addUIEvent('wheel');
}

Grid.prototype = Object.create(Node.prototype);
Grid.prototype.constructor = Grid;

Grid.prototype.postLayout = function postLayout () {

    this._innerGrid.setSizeMode('absolute')
        .setAbsoluteSize(
            ((this._cursor.differential * this._cursor.size[0]) + 
            (this._cursor.differential - 1) * this._margin[0])
        );

    this._cursor.offset[0] = 0;
    this._cursor.offset[1] = this._topMargin;
    this._cursor.index = 0;
    this._cursor.differential = 0;
    this._cursor.size = null;
    this._snap = false;

};

Grid.prototype.onReceive = function onReceive (event, payload) {
    if (event === 'wheel') {
        if (this._wheelDelta - payload.deltaY < 0) {
            this._wheelDelta -= payload.deltaY;
            this._innerGrid.setPosition(0, this._wheelDelta);
        }
    } else if (event === 'click') {
        var index = this._innerGrid.getChildren().indexOf(payload.node);
        if (index === this.selected) {
            this.comeForward();
            this.selected = null;
        } else if (this.selected === null) {
            this.selected = index;
            this.pushBack();
        }
    }
};

Grid.prototype.pushBack = function pushBack () {

    for (var i = 0, len = this._childPositions.length ; i < len ; i++) {
        if (i !== this.selected) {
            this._childPositions[i].set(null, null, -2000, this.getTransition());
            this._childOpacities[i].set(0.01, this.getTransition());
        }
    }

    var innerGridSize = this._innerGrid.getSize();
    var innerSize = this.getSize();
    this._innerGrid.getChildren()[this.selected]
                   .backface
                   .setAbsoluteSize(innerGridSize[0] / 2, innerSize[1] - this._topMargin * 2, 0);

    this._childPositions[this.selected].set(
            innerGridSize[0] / 2 - 125,
            this._topMargin - this._wheelDelta + (innerSize[1] / 2 - 137.5 - this._topMargin),
            0, this.getTransition()
    );

};

Grid.prototype.comeForward = function comeFoward () {

    for (var i = 0, len = this._childPositions.length ; i < len ; i++) {
        if (i !== this.selected) {
            this._childPositions[i].set(null, null, 0, this.getTransition());
            this._childOpacities[i].set(1, this.getTransition());
        }
    }

    this.onSizeChange();

};

Grid.prototype.layout = function layout (item, i, cursor) {

    var mySize = this.getSize();
    var itemSize = item.getSize();
    var differential = 0;

    if (!this._childPositions[i]) {
        this._childPositions[i] = new Position(item);
        this._childOpacities[i] = new Opacity(item);
    }

    if (itemSize[0] + cursor.offset[0] + this._margin[0] > mySize[0]) {

        if (!cursor.differential) cursor.differential = i;
        if (!cursor.size) cursor.size = itemSize;

        cursor.offset[0] = item.getMountPoint()[0] * itemSize[0];
        cursor.offset[1] += itemSize[1] + this._margin[1];

    }

    this._childPositions[i]._x.halt();
    this._childPositions[i]._y.halt();
    this._childPositions[i].set(cursor.offset[0], cursor.offset[1], null, this.getTransition());

    cursor.offset[0] += itemSize[0] + this._margin[0];

};


Grid.prototype.setMargin = function setMargin (x, y) {
    this._margin[0] = x != null ? x : this._margin[0];
    this._margin[1] = y != null ? y : this._margin[1];
}

Grid.prototype.addChild = function addChild (item) {
    return this._innerGrid.addChild(item);
};

Grid.prototype.onMount = function onMount () {
    this._innerGrid.setMountPoint(0.5, 0).setOrigin(0.5, 0.5).setAlign(0.5, 0);
};

Grid.prototype.onSizeChange = function onSizeChange (x, y, z) {
    
    var children = this._innerGrid.getChildren();

    for ( var i = 0, len = children.length ; i < len ; i++ )
        if (children[i])
            this.layout(children[i], i, this._cursor);

    this.postLayout();

    if (!this._requestingUpdate) this._requestUpdate();

};

Grid.prototype.getTransition = function getTransition () {
    if (this._snap) return void 0;
    else return {
        curve: 'inOutBack',
        duration: Math.random() * 500 + 600
    };
};
    
module.exports = Grid;


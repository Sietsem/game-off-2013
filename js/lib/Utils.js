'use strict';

Function.prototype.extend = function(object) {
    try {
        this.prototype = Object.create(object.prototype);
        this.prototype.parent = object.prototype;
        return this;
    } catch(err) {
    }
}

function Map() {
    this.map = {};
}

Map.prototype.get = function(key) {
    var value = this.map[key];
    if (value == undefined) return null;
    return value;
}

Map.prototype.set = function(key, value) {
    this.map[key] = value;
}

Map.prototype.remove = function(key) {
    delete this.map[key];
}

Map.prototype.has = function(key) {
    return this.map[key] != undefined;
}

Map.prototype.clear = function() {
    this.map = {};
}

Map.prototype.keys = function() {
    return Object.keys(this.map);
}

function round (a, b) {
    return Math.round(a*Math.pow(10, b)) / Math.pow(10, b);
}

function cosInterpolate(a, b, x) {
    var ft = x*Math.PI;
    var f = (1 - Math.cos(ft)) * 0.5;
    return a * (1-f) + b * f;
}

function cosInterpolateV(a, b, x) {
    return [cosInterpolate(a[0], b[0], x), cosInterpolate(a[1], b[1], x), cosInterpolate(a[2], b[2], x)];
}
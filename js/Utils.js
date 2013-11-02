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
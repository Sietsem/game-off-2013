'use strict';

Function.prototype.extend = function(object) {
    try {
        this.prototype = Object.create(object.prototype);
        this.prototype.parent = object.prototype;
        return this;
    } catch(err) {
    }
}
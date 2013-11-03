'use strict';

function Programs (callback) {
	var self = this;

    this.main = new Program("main");
    this.main.loadShaders(function() {
    	self.main.enableAttribLocation("in_Position");
    	self.main.enableAttribLocation("in_Color");

    	callback();
    });
}
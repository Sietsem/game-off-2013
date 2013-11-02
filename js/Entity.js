'use strict';

function Entity () {
	this.position = vec3.create();
	this.acceleration = vec3.create();
	this.speed = vec3.create();
}

Entity.prototype.logic = function (delta) {
	vec3.set(this.acceleration, 0, 0, 0);
	vec3.add(this.acceleration, this.acceleration, [0, -9.81, 0]); //Add gravity to acceleration
	vec3.add(this.speed, this.acceleration, this.speed); //Add acceleration to speed
	vec3.add(this.position, this.position, this.speed); //Add speed to position
}
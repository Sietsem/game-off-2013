'use strict';

function Entity () {
	this.position = vec3.create();
	this.acceleration = vec3.create();
	this.speed = vec3.create();
}

Entity.prototype.logic = function (delta) {
	vec3.set(acceleration, 0, 0, 0);
	vec3.add(acceleration, acceleration, [0, -9.81, 0]); //Add gravity to acceleration
	vec3.add(speed, acceleration, speed); //Add acceleration to speed
	vec3.add(position, position, speed); //Add speed to position
}
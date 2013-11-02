'use strict';

function Entity () {
	this.position = vec3.create();
	this.acceleration = vec3.create();
	this.speed = vec3.create();
}

Entity.prototype.logic = function (delta) {
}

Entity.prototype.move = function (delta, input) {
	vec3.set(this.acceleration, 0, 0, 0);
	if (input != undefined) {
		vec3.set(this.acceleration, input[0], input[1], input[2]);
	}

	var friction = -12;
	var frictionV = vec3.create();
	vec3.mul(frictionV, this.speed, [friction, friction, friction])

	vec3.add(this.acceleration, this.acceleration, frictionV);
	//vec3.add(this.acceleration, this.acceleration, [0, -9.81, 0]);

	var addedSpeed = vec3.create();
	vec3.mul(addedSpeed, this.acceleration, [delta/1000, delta/1000, delta/1000]);
	vec3.add(this.speed, addedSpeed, this.speed);

	var addedPos = vec3.create();
	vec3.mul(addedPos, this.speed, [delta/1000, delta/1000, delta/1000]);
	vec3.add(this.position, this.position, addedPos);
}
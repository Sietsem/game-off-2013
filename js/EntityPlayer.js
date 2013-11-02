'use strict';

function EntityPlayer () {
	Entity.call(this);
}
EntityPlayer.extend(Entity);

EntityPlayer.prototype.logic = function (delta) {
	Entity.prototype.logic.call(this, delta);

	var input = vec3.create();
	if (Input.getKeyPressed('w')) {
		vec3.add(input, input, [0, 0, 25]);
	}
	if (Input.getKeyPressed('r')) {
		vec3.add(input, input, [0, 0, -25]);
	}
	if (Input.getKeyPressed('a')) {
		vec3.add(input, input, [25, 0, 0]);
	}
	if (Input.getKeyPressed('s')) {
		vec3.add(input, input, [-25, 0, 0]);
	}
	Entity.prototype.move.call(this, delta, input);
}
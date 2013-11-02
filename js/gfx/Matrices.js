'use strict';

function Matrices () {
	this.projection = mat4.create();
	this.modelview = mat4.create();
}

Matrices.prototype.identity = function (fov, aspectratio, near, far) {
	mat4.identity(this.modelview);
}

Matrices.prototype.perspective = function (fov, aspectratio, near, far) {
	mat4.perspective(this.projection, fov, aspectratio, near, far);
}

Matrices.prototype.translateV = function (vec) {
	mat4.translate(this.modelview, this.modelview, vec);
}

Matrices.prototype.translate = function (x, y, z) {
	mat4.translate(this.modelview, this.modelview, [x, y, z]);
}

Matrices.prototype.rotate = function (rad, axis) {
	mat4.rotate(this.modelview, this.modelview, rad, axis);
}
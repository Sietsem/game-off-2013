'use strict';

function Camera (world) {
	this.world = world;

	this.lastCameraPos = vec3.create();
}

Camera.prototype.setMatrix = function (delta) {
	var playerPos = vec3.clone(this.world.player.position);
	var cameraPos = vec3.clone(this.lastCameraPos);

	var cameraPosSupposed = vec3.clone(playerPos);
	vec3.add(cameraPosSupposed, cameraPosSupposed, [this.world.player.width/2, 8, 8]);

	var d = Math.abs(vec3.distance(cameraPos, cameraPosSupposed));
	if (d > 2.5) {
		cameraPos = cosInterpolateV(cameraPos, cameraPosSupposed, 0.1);
	}
	cameraPos = cosInterpolateV(cameraPos, cameraPosSupposed, 0.1);

	var centerPos = vec3.clone(playerPos);
	vec3.add(centerPos, centerPos, [this.world.player.width/2, 0, 0]);

    this.world.main.matrices.lookAt(cameraPos, centerPos);

    this.world.main.setMatrixUniforms();

    this.lastCameraPos = vec3.clone(cameraPos);
}
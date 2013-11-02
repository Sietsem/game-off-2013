'use strict';

function EntityPlayer () {
}
EntityPlayer.extend(Entity);

EntityPlayer.prototype.logic = function (delta) {
	console.log(delta);
}
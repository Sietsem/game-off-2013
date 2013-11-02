'use strict';

function EntityPlayer () {
	Entity.call(this);
}
EntityPlayer.extend(Entity);

EntityPlayer.prototype.logic = function (delta) {
	Entity.prototype.logic.call(this, delta);
}
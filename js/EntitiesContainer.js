'use strict';

function EntitiesContainer () {
	this.entities = [];
}

EntitiesContainer.prototype.spawn = function (entity) {
	this.entities.push(entity);
}

EntitiesContainer.prototype.kill = function (entity) {
	var index = this.entities.indexOf(entity);
	if (index < 0) return false;

	array.splice(index);
	return true;
}

EntitiesContainer.prototype.loop = function (callback, context) {
	for (var entity : this.entities) {
		callback.call(context, entity);
	}
}
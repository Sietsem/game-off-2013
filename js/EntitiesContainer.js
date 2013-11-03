'use strict';

function EntitiesContainer () {
	this.entities = [];
}

EntitiesContainer.prototype.add = function (entity) {
	this.entities.push(entity);
}

EntitiesContainer.prototype.remove = function (entity) {
	var index = this.entities.indexOf(entity);
	if (index < 0) return false;

	array.splice(index);
	return true;
}

EntitiesContainer.prototype.loop = function (context, callback) {
	//for (var key in this.entities) {
	for (var i = 0; i < this.entities.length; i++) {
		callback.call(context, this.entities[i]);
	}
}
'use strict';

function World () {
    this.entities = new EntitiesContainer();

    this.player = new EntityPlayer();
    this.spawn(this.player);
}

World.prototype.spawn = function (entity) {
    this.entities.add(entity);
}

World.prototype.kill = function (entity) {
    this.entities.remove(entity);
}

World.prototype.logic = function (delta) {
    this.entities.loop(this, function(entity) { entity.logic(delta); });
}
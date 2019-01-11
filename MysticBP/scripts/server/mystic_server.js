var system = server.registerSystem(0,0);
var global = { tick: 0 };

system.initialize = function() {
	global.viewAllEntities = this.registerQuery();
};

system.update = function () {
	global.tick += 1;
    if (global.tick === 5) {
        let allEntities = system.getEntitiesFromQuery(global.viewAllEntities);
        let size = allEntities.length;
        for (let index = 0; index < size; ++index) {
			if (allEntities[index].__identifier__ === "mystic:forcefield") {
				if (this.hasComponent(allEntities[index], "minecraft:is_shaking")) {
                    let checkActivated = this.getComponent(allEntities[index], "minecraft:variant");
					if (checkActivated.value === 1) {
						this.broadcastEvent("minecraft:display_chat_event", "Found Forcefield");
					}
                }
            }
        }
        global.tick = 0;
    }
};
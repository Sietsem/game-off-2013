'use strict';

function World (main) {
    this.main = main;
    this.entities = new EntitiesContainer();

    this.player = new EntityPlayer();
    this.spawn(this.player);

    this.map = [];
    for (var i = 0; i < 64; i++) {
        this.map[i] = [];
        for (var j = 0; j < 64; j++) {
            this.map[i][j] = ((i == 0) || (i == 63) || (j == 0) || (j == 63) || Math.random() > 0.8) ? 1 : 0;
        }
    }
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

World.prototype.createMesh = function () {
    var maxX = this.map.length;
    var maxY = this.map[0].length;
    var vertices = [
           0, 0, maxY, 0.4, 0.4, 0.4, 1.0,
        maxX, 0, maxY, 0.4, 0.4, 0.4, 1.0,
           0, 0,    0, 0.4, 0.4, 0.4, 1.0,

        maxX, 0,    0, 0.4, 0.4, 0.4, 1.0,
        maxX, 0, maxY, 0.4, 0.4, 0.4, 1.0,
           0, 0,    0, 0.4, 0.4, 0.4, 1.0,
    ];
    var addVertex = function (x, y, z, r, g, b, a) {
        vertices[pos+0] = x;
        vertices[pos+1] = y;
        vertices[pos+2] = z;
        vertices[pos+3] = r;
        vertices[pos+4] = g;
        vertices[pos+5] = b;
        vertices[pos+6] = a;
        pos += 7;
    }
    var pos = vertices.length;
    for (var x = 0; x < maxX; x++) {
        for (var y = 0; y < maxY; y++) {
            var value = this.map[x][y];
            if (value == 1) {
                /*if (this.map[x][y-1] != 1) {
                    addVertex(x,   0, y, 0.4, 0.4, 0.4, 1);
                    addVertex(x,   1, y, 1.0, 1.0, 1.0, 1);
                    addVertex(x+1, 1, y, 1.0, 1.0, 1.0, 1);
                    addVertex(x+1, 0, y, 0.4, 0.4, 0.4, 1);
                    addVertex(x+1, 1, y, 1.0, 1.0, 1.0, 1);
                    addVertex(x,   0, y, 0.4, 0.4, 0.4, 1);
                }*/
                if (this.map[x][y+1] != 1) {
                    addVertex(x+1, 1, y+1, 1.0, 1.0, 1.0, 1);
                    addVertex(x,   1, y+1, 1.0, 1.0, 1.0, 1);
                    addVertex(x,   0, y+1, 0.4, 0.4, 0.4, 1);
                    addVertex(x+1, 0, y+1, 0.4, 0.4, 0.4, 1);
                    addVertex(x+1, 1, y+1, 1.0, 1.0, 1.0, 1);
                    addVertex(x,   0, y+1, 0.4, 0.4, 0.4, 1);
                }
                if (this.map[x-1] == undefined || this.map[x-1][y] != 1) {
                    addVertex(x, 1, y+1, 1.0, 1.0, 1.0, 1);
                    addVertex(x, 1, y,   1.0, 1.0, 1.0, 1);
                    addVertex(x, 0, y,   0.4, 0.4, 0.4, 1);
                    addVertex(x, 0, y+1, 0.4, 0.4, 0.4, 1);
                    addVertex(x, 1, y+1, 1.0, 1.0, 1.0, 1);
                    addVertex(x, 0, y,   0.4, 0.4, 0.4, 1);
                }
                if (this.map[x+1] == undefined || this.map[x+1][y] != 1) {
                    addVertex(x+1, 0, y,   0.4, 0.4, 0.4, 1);
                    addVertex(x+1, 1, y,   1.0, 1.0, 1.0, 1);
                    addVertex(x+1, 1, y+1, 1.0, 1.0, 1.0, 1);
                    addVertex(x+1, 0, y,   0.4, 0.4, 0.4, 1);
                    addVertex(x+1, 1, y+1, 1.0, 1.0, 1.0, 1);
                    addVertex(x+1, 0, y+1, 0.4, 0.4, 0.4, 1);
                }
                addVertex(x+1, 1, y+1, 1.0, 1.0, 1.0, 1);
                addVertex(x+1, 1, y,   1.0, 1.0, 1.0, 1);
                addVertex(x,   1, y,   1.0, 1.0, 1.0, 1);
                addVertex(x,   1, y+1, 1.0, 1.0, 1.0, 1);
                addVertex(x+1, 1, y+1, 1.0, 1.0, 1.0, 1);
                addVertex(x,   1, y,   1.0, 1.0, 1.0, 1);
            }
        }
    }
    return vertices;
}

World.prototype.render = function () {
    this.main.programs.main.use();

    this.main.matrices.perspective(45/180*Math.PI, this.main.width/this.main.height, 0.1, 1000.0);

    this.main.matrices.identity();
    //this.main.matrices.translate(0, 6, 0);
    this.main.matrices.rotate(50/180*Math.PI, [1, 0, 0]);
    this.main.matrices.translateV([-this.player.position[0], -this.player.position[1], -this.player.position[2]]);
    this.main.matrices.translate(0, -8, 0);

    this.main.setMatrixUniforms();

    if (this.vbo == undefined) {
        this.vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        var vertices = this.createMesh();
        this.vboSize = vertices.length/7;
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.vertexAttribPointer(this.main.programs.main.getAttribLocation("in_Position"), 3, gl.FLOAT, false, 28, 0);
    gl.vertexAttribPointer(this.main.programs.main.getAttribLocation("in_Color"), 4, gl.FLOAT, false, 28, 12);

    gl.drawArrays(gl.TRIANGLES, 0, this.vboSize);
}
'use strict';

function EntityPlayer (world) {
	Entity.call(this, world);

	this.position = [5, 0, 10];
	this.width  = 0.4;
	this.height = 0.8;
	this.depth  = 0.4;
}
EntityPlayer.extend(Entity);

EntityPlayer.prototype.logic = function (delta) {
	Entity.prototype.logic.call(this, delta);

	var input = vec3.create();
	if (Input.getKeyPressed('w') || Input.getKeyPressed('up')) {
		vec3.add(input, input, [0, 0, -25]);
	}
	if (Input.getKeyPressed('r') || Input.getKeyPressed('down')) {
		vec3.add(input, input, [0, 0, 25]);
	}
	if (Input.getKeyPressed('a') || Input.getKeyPressed('left')) {
		vec3.add(input, input, [-25, 0, 0]);
	}
	if (Input.getKeyPressed('s') || Input.getKeyPressed('right')) {
		vec3.add(input, input, [25, 0, 0]);
	}
	Entity.prototype.move.call(this, delta, input);
}

EntityPlayer.prototype.render = function () {
    if (this.vbo == undefined) {
        this.vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        var vertices = [
            this.width, this.height, this.depth, 1.0, 0.0, 0.0, 1.0,
        	0.0, 		this.height, this.depth, 1.0, 0.0, 0.0, 1.0,
        	0.0, 		0.0,  		 this.depth, 1.0, 0.0, 0.0, 1.0,
        	this.width, 0.0,  		 this.depth, 1.0, 0.0, 0.0, 1.0,
        	this.width, this.height, this.depth, 1.0, 0.0, 0.0, 1.0,
        	0.0, 		0.0,  		 this.depth, 1.0, 0.0, 0.0, 1.0,

        	0.0, this.height, this.depth, 		 1.0, 1.0, 0.0, 1.0,
        	0.0, this.height, 0.0, 		  		 1.0, 1.0, 0.0, 1.0,
        	0.0, 0.0, 		  0.0, 		  		 1.0, 1.0, 0.0, 1.0,
        	0.0, 0.0, 		  this.depth, 		 1.0, 1.0, 0.0, 1.0,
        	0.0, this.height, this.depth, 		 1.0, 1.0, 0.0, 1.0,
        	0.0, 0.0, 		  0.0, 		  	 	 1.0, 1.0, 0.0, 1.0,

        	this.width, this.height, this.depth, 1.0, 0.0, 1.0, 1.0,
        	this.width, this.height, 0.0, 		 1.0, 0.0, 1.0, 1.0,
        	0.0, 		this.height, 0.0, 		 1.0, 0.0, 1.0, 1.0,
        	0.0, 		this.height, this.depth, 1.0, 0.0, 1.0, 1.0,
        	this.width, this.height, this.depth, 1.0, 0.0, 1.0, 1.0,
        	0.0, 		this.height, 0.0, 		 1.0, 0.0, 1.0, 1.0,

        	this.width, 0.0, 		 0.0,		 0.0, 0.0, 1.0, 1.0,
        	this.width, this.height, 0.0, 		 0.0, 0.0, 1.0, 1.0,
        	this.width, this.height, this.depth, 0.0, 0.0, 1.0, 1.0,
        	this.width, 0.0,  		 0.0,  		 0.0, 0.0, 1.0, 1.0,
        	this.width, this.height, this.depth, 0.0, 0.0, 1.0, 1.0,
        	this.width, 0.0,  		 this.depth, 0.0, 0.0, 1.0, 1.0,

        	this.width, this.height, this.depth, 0.0, 1.0, 0.0, 1.0,
        	this.width, this.height, 0.0,  		 0.0, 1.0, 0.0, 1.0,
        	0.0, 		this.height, 0.0,  		 0.0, 1.0, 0.0, 1.0,
        	0.0, 		this.height, this.depth, 0.0, 1.0, 0.0, 1.0,
        	this.width, this.height, this.depth, 0.0, 1.0, 0.0, 1.0,
        	0.0, 		this.height, 0.0,  		 0.0, 1.0, 0.0, 1.0,
        ];
        this.vboSize = vertices.length/7;
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.vertexAttribPointer(this.world.main.programs.main.getAttribLocation("in_Position"), 3, gl.FLOAT, false, 28, 0);
    gl.vertexAttribPointer(this.world.main.programs.main.getAttribLocation("in_Color"), 4, gl.FLOAT, false, 28, 12);

    this.world.main.matrices.translateV(this.position);
    this.world.main.setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLES, 0, this.vboSize);
}
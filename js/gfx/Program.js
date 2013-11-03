'use strict';

function Program (name) {
    this.name = name;
}

Program.prototype.loadShaders = function (callback) {
    var self = this;
    $.get("shaders/" + self.name + ".vs?" + Math.random(), function (data) {
        self.vsSource = data;
        $.get("shaders/" + self.name + ".fs?" + Math.random(), function (data) {
            self.fsSource = data;

            self.vertexShader   = self.getShader(gl, self.vsSource, false);
            self.fragmentShader = self.getShader(gl, self.fsSource, true);

            self.id = gl.createProgram();
            gl.attachShader(self.id, self.vertexShader);
            gl.attachShader(self.id, self.fragmentShader);
            gl.linkProgram(self.id);

            if (!gl.getProgramParameter(self.id, gl.LINK_STATUS)) {
                alert("Unable to initialize the shader program.");
            }

            self.use();

            callback(self);
        });
    });
}

Program.prototype.use = function () {
	gl.useProgram(this.id);
}

Program.prototype.enableAttribLocation = function (attrib) {
	var pos = this.getAttribLocation(attrib);
	gl.enableVertexAttribArray(pos);
}

Program.prototype.getAttribLocation = function (attrib) {
	return gl.getAttribLocation(this.id, attrib);
}

Program.prototype.getUniformLocation = function (uniform) {
    return gl.getUniformLocation(this.id, uniform);
}

Program.prototype.getShader = function (gl, source, fragment) {
    var shader;
    if (fragment) {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else {
        shader = gl.createShader(gl.VERTEX_SHADER);
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("An error occurred compiling the " + ((fragment) ? "fragment" : "vertex") + " shader: " + gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}
'use strict';

function main () {
}

main.prototype.init = function () {
    this.canvas = document.getElementById("glcanvas");
    Input.setMouseTarget(this.canvas);
    this.width  = this.canvas.width;
    this.height = this.canvas.height;

    this.initWebGL();

    if(!gl) return;

    var self = this;

    this.world = new World(this);

    this.matrices = new Matrices();
    this.programs = new Programs(function() {
        setInterval(function () { self.onTick(); }, 16);
    });
}

main.prototype.initWebGL = function () {
    globals.gl = null;

    try {
        gl = this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl");
    } catch(e) {}

    if (!gl) {
        alert("Unable to initialize WebGL. Your browser may not support it.");
    }
}

main.prototype.onTick = function () {
    var now = (new Date()).getTime();
    if (this.time == undefined) {
        this.time = now;
    }
    var delta = now - this.time;
    this.time = now;

    this.logic(delta);
    this.render();
}

main.prototype.logic = function (delta) {
    this.world.logic(delta);
}

main.prototype.render = function () {
    gl.viewport(0, 0, this.width, this.height);

    gl.clearColor(0.0, 0.0, 0.5, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    this.world.render();
}

main.prototype.setMatrixUniforms = function () {
    var pUniform = this.programs.main.getUniformLocation("mProjection");
    gl.uniformMatrix4fv(pUniform, false, this.matrices.projection);

    var mvUniform = this.programs.main.getUniformLocation("mModelView");
    gl.uniformMatrix4fv(mvUniform, false, this.matrices.modelview);
}

var globals = this;
var m = new main();
window.addEventListener('load', function () {
    m.init();
}, false);
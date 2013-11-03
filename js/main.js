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

    this.fps = this.fpsTime = this.tillTick = 0;

    var self = this;

    this.world = new World(this);
    this.lastTick = window.performance.now();

    this.matrices = new Matrices();
    this.programs = new Programs(function() {
        setInterval(function () { self.onTick(); }, 0);
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
    var a = window.performance.now();
    var delta = a - this.lastTick;
    this.lastTick = a;
    this.tillTick += delta;
    if (this.tillTick >= (1000/60)) {
        this.onRealTick();
        this.tillTick %= (1000/60);
    }
}

main.prototype.onRealTick = function () {
    var now = (new Date()).getTime();
    if (this.time == undefined) {
        this.time = now;
    }
    var delta = now - this.time;
    this.time = now;

    var a = window.performance.now();
    this.logic(delta);
    this.render();
    var a = window.performance.now() - a;
    document.getElementById("fps").innerHTML = "FPS: " + this.lastFps + "<br>Milliseconds: " + round(a, 3) + "<br>Theoratical fps: " + round(1000/a, 0);

    this.fps++;
    this.fpsTime += delta;

    if (this.fpsTime > 1000) {
        console.log(this.fps + " fps");
        this.fpsTime -= 1000;
        this.lastFps = this.fps;
        this.fps = 0;
    }
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
attribute vec3 in_Position;

uniform mat4 mModelView;
uniform mat4 mProjection;

void main(void) {
    gl_Position = mProjection * mModelView * vec4(in_Position, 1.0);
}
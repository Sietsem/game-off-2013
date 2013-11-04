attribute vec3 in_Position;
attribute vec4 in_Color;

uniform mat4 mModelView;
uniform mat4 mProjection;

varying vec4 pass_Color;

void main(void) {
    gl_Position = mProjection * mModelView * vec4(in_Position, 1.0);
    pass_Color = in_Color;
}
'use strict';

var Input = {};

/**
 * Create an text form at the given location.
 * @param {number} x             
 * @param {number} y             
 * @param {number} width         
 * @param {number} height        
 * @param {string} defaultString What should be already filled in
 * @param {string} textAlign     Alignment of the text inside the form
 */
function InputTextform(x, y, width, height, defaultString, textAlign) {
    if (defaultString == undefined) defaultString = '';
    if (textAlign == undefined) textAlign = 'center';

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.inputElement = this._createTextform(x, y, width, height, defaultString, textAlign);

    Screen.containerElement.appendChild(this.inputElement);
}

InputTextform.prototype._createTextform = function(x, y, width, height, defaultString, textAlign) {
    var inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'text');
    inputElement.value = defaultString;
    inputElement.style.position = 'absolute';
    inputElement.style.margin = '0';
    inputElement.style.padding = '0';
    inputElement.style.border = '0';
    inputElement.style.outline = '0';
    inputElement.style.background = 'none';
    inputElement.style.zIndex = 200;
    inputElement.style.left = (x) + 'px';
    inputElement.style.top = (y) + 'px';
    inputElement.style.width = (width) + 'px';
    inputElement.style.height = (height) + 'px';
    inputElement.style.textAlign = textAlign;
    inputElement.style.fontSize = '18px';
    inputElement.spellcheck = false;
    inputElement.maxLength = 120;

    inputElement.focus();

    return inputElement;
}

/**
 * Move this text form around
 * @param {number} x 
 * @param {number} y 
 */
InputTextform.prototype.setPosition = function(x, y, width, height) {
    this.inputElement.style.left = (x) + 'px';
    this.inputElement.style.top = (y) + 'px';
    this.inputElement.style.width = (width) + 'px';
    this.inputElement.style.height = (height) + 'px';

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

/**
 * Get the value of the form
 * @return {string} 
 */
InputTextform.prototype.getValue = function() {
    return this.inputElement.value;
}

/**
 * Remove this text form
 */
InputTextform.prototype.remove = function() {
    Screen.containerElement.removeChild(this.inputElement);
}






var _pressedKeys = {},
    _pressedKeysOnce = {},
    _keyCodes = {
        65: 'a',66: 'b',67: 'c',68: 'd',69: 'e',70: 'f',71: 'g',72: 'h',73: 'i',
        74: 'j',75: 'k',76: 'l',77: 'm',78: 'n',79: 'o',80: 'p',81: 'q',82: 'r',
        83: 's',84: 't',85: 'u',86: 'v',87: 'w',88: 'x',89: 'y',90: 'z', 190: '.',
        49: '1', 50: '2', 51: '3', 52: '4', 53: '5', 54: '6', 55: '7', 56: '8', 57: '9', 48: '0',
        32: 'space', 46: 'del', 13: 'enter', 16: 'shift', 8: 'backspace', 17: 'control', 27: 'escape',
        9: 'tab', 37: 'left', 39: 'right', 38: 'up', 40: 'down',
        121: 'F10'
    }

Input.getKeyPressed = function(name) {
    return _pressedKeys[name] == undefined ? false : true;
}

// Only returns true once when called until the key is lifted again
Input.getKeyPressedOnce = function(name) {
    var keyPressed = Input.getKeyPressed(name);

    if (keyPressed && _pressedKeysOnce[name] == undefined) {
        _pressedKeysOnce[name] = true;
        return true;
    }

    return false;
}


var _onKeyDown = function(event) {
    // log(event.keyCode);
    var i = _keyCodes[event.keyCode];
    if (i == undefined) return;

    /*if (i == 'left' || i == 'right' || i == 'up' || i == 'down') {
        event.preventDefault();
    }*/

    if (i == 'escape' || i == 'tab' || i == 'F10') {
        event.preventDefault();
    }

    _pressedKeys[i] = true;
}

var _onKeyUp = function(event) {
    // event.preventDefault();
    var i = _keyCodes[event.keyCode];
    if (i == undefined) return;

    delete _pressedKeys[i];
    delete _pressedKeysOnce[i];
}



var _mouseTarget = null,
    _mouseX = 0,
    _mouseY = 0,
    _mouseDelta = 0,
    _mousePressedLeftHold = false,
    _mousePressedRightHold = false,
    _mousePressedLeft = false,
    _mousePressedRight = false;

Input.BUTTON_LEFT = 0;
Input.BUTTON_RIGHT = 2;

Input.setMouseTarget = function(element) {
    _mouseTarget = element;

    document.addEventListener('mousemove', _onMouseMove, false);
    element.addEventListener('mousedown', _onMouseDown, false);
    element.addEventListener('mouseup', _onMouseUp, false);
    element.addEventListener('contextmenu', _onContextMenu, false);
    document.addEventListener('mousewheel', _onMouseScroll, false);
    document.addEventListener('DOMMouseScroll', _onMouseScroll, false);

    element.addEventListener('touchstart', _touchStart, false);
    element.addEventListener('touchend', _touchEnd, false);
    element.addEventListener('touchcancel', _touchCancel, false);
    element.addEventListener('touchmove', _touchMove, false);
}

Input.getMouseScroll = function() {
    return _mouseDelta;
}

Input.getMousePosition = function() {
    return new Vec2(Math.floor(_mouseX), Math.floor(_mouseY));
}

Input.getMousePressed = function(button) {
    if (button == Input.BUTTON_LEFT) return _mousePressedLeft;
        else if (button == Input.BUTTON_RIGHT) return _mousePressedRight;

    return false;
}

Input.getMousePressedOnce = function(button) {
    if (button == Input.BUTTON_LEFT && _mousePressedLeft && !_mousePressedLeftHold) {
        _mousePressedLeftHold = true;
        return true;
    } else if (button == Input.BUTTON_RIGHT && _mousePressedRight && !_mousePressedRightHold) {
        _mousePressedRightHold = true;
        return true;
    }

    return false;
}

var _onContextMenu = function(event) {
    event.preventDefault();
}

var _onMouseDown = function(event) {
    var b = event.button;
    if (b == 0) _mousePressedLeft = true;
        else if (b == 2) _mousePressedRight = true;

    if (_fullscreenEnabled && !_isFullscreen) {
        _requestFullscreen();
    }

    if (_pointerLockEnabled && !_isPointerLocked) {
        _requestPointerLock();
    }
}

var _onMouseUp = function(event) {
    var b = event.button;
    if (b == 0) {
        _mousePressedLeft = false;
        _mousePressedLeftHold = false;
    } else if (b == 2) {
        _mousePressedRight = false;
        _mousePressedRightHold = false;
    }
}

var _onMouseScroll = function(e) {
    _mouseDelta += Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
}

var _onMouseMove = function(event) {
    if (_isPointerLocked) {
        var x = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        var y = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        _mouseX += x;
        _mouseY += y;
    } else {
        var bb = _mouseTarget.getBoundingClientRect();

        _mouseX = event.pageX - bb.left;
        _mouseY = event.pageY - bb.top;
    }
}


var _fullscreenEnabled = false;
var _isFullscreen = false;
var _pointerLockEnabled = false;
var _isPointerLocked = false;
Input.setPointerLocked = function(e) {
    _pointerLockEnabled = e;
}

Input.getPointerLocked = function() {
    return _isPointerLocked;
}

var _requestPointerLock = function() {
    _mouseTarget.requestPointerLock = _mouseTarget.requestPointerLock || _mouseTarget.mozRequestPointerLock || _mouseTarget.webkitRequestPointerLock || null;

    if (_mouseTarget.requestPointerLock != null) {
        _mouseTarget.requestPointerLock();
    } else {
        log('Pointer cannot be locked', log.ERROR);
    }
}

var _pointerLockChange = function(event) {
    var element = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || null;

    if (element) {
        _isPointerLocked = true;
    } else {
        _isPointerLocked = false;
    }
}

var _pointerLockError = function(event) {
    if (_fullscreenEnabled) {
        log('Pointer cannot be locked.', log.WARN);
    } else {
        log('Pointer cannot be locked, trying full screen next time.', log.WARN);

        Input.setFullscreen(true);
    }
}


Input.setFullscreen = function(e) {
    _fullscreenEnabled = e;
}

Input.getFullscreen = function() {
    return _isFullscreen;
}

var _requestFullscreen = function() {
    _mouseTarget.requestFullscreen = _mouseTarget.requestFullscreen || _mouseTarget.mozRequestFullscreen || _mouseTarget.webkitRequestFullscreen || null;

    if (_mouseTarget.requestFullscreen != null) {
        _mouseTarget.requestFullscreen();
    } else {
        log('Pointer cannot be locked', log.ERROR);
    }
}

var _fullscreenChange = function(event) {
    var element = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullscreenElement || null;

    if (element) {
        _isFullscreen = true;
    } else {
        _isFullscreen = false;
    }
}

var _touchMap = new Map();
var _hadTouchOnce = false;
var _touchStart = function(event) {
    _hadTouchOnce = true;

    var touches = event.touches || null;
    if (touches != null) {
        for (var i = 0; i < touches.length; i++) {
            var e = touches[i];
            if (!_touchMap.has(e.identifier)) {
                _touchMap.set(e.identifier, new TouchWrapper(e));
            }
        }
    }
}

var _touchEnd = function(event) {
    var touches = event.touches || null;
    if (touches != null) {
        // Set used to false
        var touchMapKeys = _touchMap.keys();
        for (var i = 0; i < touchMapKeys.length; i++) {
            _touchMap.get(touchMapKeys[i]).used = false;
        }

        // Touches who still exists set used to true
        for (var i = 0; i < touches.length; i++) {
            _touchMap.get(touches[i].identifier).used = true;
        }

        // Remove removed touches from touchMap
        var touchMapKeys = _touchMap.keys();
        for (var i = 0; i < touchMapKeys.length; i++) {
            if (!_touchMap.get(touchMapKeys[i]).used) {
                _touchMap.remove(touchMapKeys[i]);
            }
        }
    }
}

var _touchCancel = function(event) {
    _touchEnd(event);
}

var _touchMove = function(event) {
    event.preventDefault();

    var touches = event.touches || null;
    if (touches != null) {
        for (var i = 0; i < touches.length; i++) {
            var e = touches[i];
            if (_touchMap.has(e.identifier)) {
                _touchMap.get(e.identifier).setPosition(e);
            }
        }
    }
}

Input.getTouches = function() {
    var keys = _touchMap.keys();
    var list = [];
    for (var i = 0; i < keys.length; i++) {
        list.push(_touchMap.get(keys[i]));
    }

    return list;
}

Input.getHadTouchOnce = function() {
    return _hadTouchOnce;
}


var TouchWrapper = function(touch) {
    this.id = touch.identifier;
    this.used = true;
    this.x = 0;
    this.y = 0;
    this.touch = touch;

    this.setPosition(touch);
}

TouchWrapper.prototype.setPosition = function(touch) {
    this.x = touch.screenX;
    this.y = touch.screenY;
    this.touch = touch;
}




if (document.addEventListener != undefined) {
    document.addEventListener('keydown', _onKeyDown, false);
    document.addEventListener('keyup', _onKeyUp, false);

    document.addEventListener('pointerlockchange', _pointerLockChange, false);
    document.addEventListener('mozpointerlockchange', _pointerLockChange, false);
    document.addEventListener('webkitpointerlockchange', _pointerLockChange, false);

    document.addEventListener('pointerlockerror', _pointerLockError, false);
    document.addEventListener('mozpointerlockerror', _pointerLockError, false);
    document.addEventListener('webkitpointerlockerror', _pointerLockError, false);

    document.addEventListener('fullscreenchange', _fullscreenChange, false);
    document.addEventListener('mozfullscreenchange', _fullscreenChange, false);
    document.addEventListener('webkitfullscreenchange', _fullscreenChange, false);
}
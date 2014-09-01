(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/ec2-user/Documents/thinkCopter/public/fake_6bef3411.js":[function(require,module,exports){
/*jshint browser:true */
/*global Avc:true, YUVWebGLCanvas: true, Size: true, requestAnimationFrame:true */

/* requestAnimationFrame polyfill: */
(function (window) {
    'use strict';
    var lastTime = 0,
        vendors = ['ms', 'moz', 'webkit', 'o'],
        x,
        length,
        currTime,
        timeToCall;

    for (x = 0, length = vendors.length; x < length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[
            vendors[x] + 'RequestAnimationFrame'
        ];
        window.cancelAnimationFrame = window[
            vendors[x] + 'CancelAnimationFrame'
        ] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            currTime = new Date().getTime();
            timeToCall = Math.max(0, 16 - (currTime - lastTime));
            lastTime = currTime + timeToCall;
            return window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
}(window));


/* NodeCopterStream: */
(function (window, document, undefined) {
    'use strict';
    var NS,
        socket,
        avc,
        webGLCanvas,
        width,
        height,
        callbackOnce = null;

    function setupAvc() {
        avc = new Avc();
        avc.configure({
            filter: 'original',
            filterHorLuma: 'optimized',
            filterVerLumaEdge: 'optimized',
            getBoundaryStrengthsA: 'optimized'
        });
        avc.onPictureDecoded = handleDecodedFrame;
    }

    function handleNalUnits(message) {
        avc.decode(new Uint8Array(message.data));
    }

    function handleDecodedFrame(buffer, bufWidth, bufHeight) {
        var callback;

        requestAnimationFrame(function () {
            var lumaSize = bufWidth * bufHeight,
                chromaSize = lumaSize >> 2;

            webGLCanvas.YTexture.fill(buffer.subarray(0, lumaSize));
            webGLCanvas.UTexture.fill(buffer.subarray(lumaSize, lumaSize + chromaSize));
            webGLCanvas.VTexture.fill(buffer.subarray(lumaSize + chromaSize, lumaSize + 2 * chromaSize));
            webGLCanvas.drawScene();
        });

        // call callback with Y portion (grayscale image)
        if (null !== callbackOnce && width) {
            callback = callbackOnce;
            callbackOnce = null;
            // decoded buffer size may be larger,
            // so use subarray with actual dimensions
            callback(buffer.subarray(0, width * height));
        }
    }

    function setupCanvas(div) {
        var canvas = document.createElement('canvas');

        width = div.attributes.width ? div.attributes.width.value : 640;
        height = div.attributes.height ? div.attributes.height.value : 360;

        canvas.width = width;
        canvas.height = height;
        canvas.style.backgroundColor = "#333333";
        div.appendChild(canvas);

        webGLCanvas = new YUVWebGLCanvas(canvas, new Size(width, height));
    }


    NS = function (div, options) {
        var hostname, port;
        options = options || {};
        hostname = options.hostname || window.document.location.hostname;
        port = options.port || window.document.location.port;

        setupCanvas(div);
        setupAvc();

        socket = new WebSocket(
             'ws://' + hostname + ':' + port + '/dronestream'
        );
        socket.binaryType = 'arraybuffer';
        socket.onmessage = handleNalUnits;
    };

    // enqueue callback oto be called with next (black&white) frame
    NS.prototype.onNextFrame = function (callback) {
        callbackOnce = callback;
    };

    window.NodecopterStream = NS;

}(window, document, undefined));

},{}]},{},["/home/ec2-user/Documents/thinkCopter/public/fake_6bef3411.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvaG9tZS9lYzItdXNlci9Eb2N1bWVudHMvdGhpbmtDb3B0ZXIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUvZWMyLXVzZXIvRG9jdW1lbnRzL3RoaW5rQ29wdGVyL3B1YmxpYy9mYWtlXzZiZWYzNDExLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qanNoaW50IGJyb3dzZXI6dHJ1ZSAqL1xuLypnbG9iYWwgQXZjOnRydWUsIFlVVldlYkdMQ2FudmFzOiB0cnVlLCBTaXplOiB0cnVlLCByZXF1ZXN0QW5pbWF0aW9uRnJhbWU6dHJ1ZSAqL1xuXG4vKiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcG9seWZpbGw6ICovXG4oZnVuY3Rpb24gKHdpbmRvdykge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICB2YXIgbGFzdFRpbWUgPSAwLFxuICAgICAgICB2ZW5kb3JzID0gWydtcycsICdtb3onLCAnd2Via2l0JywgJ28nXSxcbiAgICAgICAgeCxcbiAgICAgICAgbGVuZ3RoLFxuICAgICAgICBjdXJyVGltZSxcbiAgICAgICAgdGltZVRvQ2FsbDtcblxuICAgIGZvciAoeCA9IDAsIGxlbmd0aCA9IHZlbmRvcnMubGVuZ3RoOyB4IDwgbGVuZ3RoICYmICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lOyArK3gpIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvd1tcbiAgICAgICAgICAgIHZlbmRvcnNbeF0gKyAnUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ1xuICAgICAgICBdO1xuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbXG4gICAgICAgICAgICB2ZW5kb3JzW3hdICsgJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJ1xuICAgICAgICBdIHx8IHdpbmRvd1t2ZW5kb3JzW3hdICsgJ0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuICAgIH1cblxuICAgIGlmICghd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSkge1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGNhbGxiYWNrLCBlbGVtZW50KSB7XG4gICAgICAgICAgICBjdXJyVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgdGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIDE2IC0gKGN1cnJUaW1lIC0gbGFzdFRpbWUpKTtcbiAgICAgICAgICAgIGxhc3RUaW1lID0gY3VyclRpbWUgKyB0aW1lVG9DYWxsO1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhjdXJyVGltZSArIHRpbWVUb0NhbGwpO1xuICAgICAgICAgICAgfSwgdGltZVRvQ2FsbCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKCF3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUpIHtcbiAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoaWQpO1xuICAgICAgICB9O1xuICAgIH1cbn0od2luZG93KSk7XG5cblxuLyogTm9kZUNvcHRlclN0cmVhbTogKi9cbihmdW5jdGlvbiAod2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciBOUyxcbiAgICAgICAgc29ja2V0LFxuICAgICAgICBhdmMsXG4gICAgICAgIHdlYkdMQ2FudmFzLFxuICAgICAgICB3aWR0aCxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICBjYWxsYmFja09uY2UgPSBudWxsO1xuXG4gICAgZnVuY3Rpb24gc2V0dXBBdmMoKSB7XG4gICAgICAgIGF2YyA9IG5ldyBBdmMoKTtcbiAgICAgICAgYXZjLmNvbmZpZ3VyZSh7XG4gICAgICAgICAgICBmaWx0ZXI6ICdvcmlnaW5hbCcsXG4gICAgICAgICAgICBmaWx0ZXJIb3JMdW1hOiAnb3B0aW1pemVkJyxcbiAgICAgICAgICAgIGZpbHRlclZlckx1bWFFZGdlOiAnb3B0aW1pemVkJyxcbiAgICAgICAgICAgIGdldEJvdW5kYXJ5U3RyZW5ndGhzQTogJ29wdGltaXplZCdcbiAgICAgICAgfSk7XG4gICAgICAgIGF2Yy5vblBpY3R1cmVEZWNvZGVkID0gaGFuZGxlRGVjb2RlZEZyYW1lO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZU5hbFVuaXRzKG1lc3NhZ2UpIHtcbiAgICAgICAgYXZjLmRlY29kZShuZXcgVWludDhBcnJheShtZXNzYWdlLmRhdGEpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVEZWNvZGVkRnJhbWUoYnVmZmVyLCBidWZXaWR0aCwgYnVmSGVpZ2h0KSB7XG4gICAgICAgIHZhciBjYWxsYmFjaztcblxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGx1bWFTaXplID0gYnVmV2lkdGggKiBidWZIZWlnaHQsXG4gICAgICAgICAgICAgICAgY2hyb21hU2l6ZSA9IGx1bWFTaXplID4+IDI7XG5cbiAgICAgICAgICAgIHdlYkdMQ2FudmFzLllUZXh0dXJlLmZpbGwoYnVmZmVyLnN1YmFycmF5KDAsIGx1bWFTaXplKSk7XG4gICAgICAgICAgICB3ZWJHTENhbnZhcy5VVGV4dHVyZS5maWxsKGJ1ZmZlci5zdWJhcnJheShsdW1hU2l6ZSwgbHVtYVNpemUgKyBjaHJvbWFTaXplKSk7XG4gICAgICAgICAgICB3ZWJHTENhbnZhcy5WVGV4dHVyZS5maWxsKGJ1ZmZlci5zdWJhcnJheShsdW1hU2l6ZSArIGNocm9tYVNpemUsIGx1bWFTaXplICsgMiAqIGNocm9tYVNpemUpKTtcbiAgICAgICAgICAgIHdlYkdMQ2FudmFzLmRyYXdTY2VuZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjYWxsIGNhbGxiYWNrIHdpdGggWSBwb3J0aW9uIChncmF5c2NhbGUgaW1hZ2UpXG4gICAgICAgIGlmIChudWxsICE9PSBjYWxsYmFja09uY2UgJiYgd2lkdGgpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrID0gY2FsbGJhY2tPbmNlO1xuICAgICAgICAgICAgY2FsbGJhY2tPbmNlID0gbnVsbDtcbiAgICAgICAgICAgIC8vIGRlY29kZWQgYnVmZmVyIHNpemUgbWF5IGJlIGxhcmdlcixcbiAgICAgICAgICAgIC8vIHNvIHVzZSBzdWJhcnJheSB3aXRoIGFjdHVhbCBkaW1lbnNpb25zXG4gICAgICAgICAgICBjYWxsYmFjayhidWZmZXIuc3ViYXJyYXkoMCwgd2lkdGggKiBoZWlnaHQpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldHVwQ2FudmFzKGRpdikge1xuICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cbiAgICAgICAgd2lkdGggPSBkaXYuYXR0cmlidXRlcy53aWR0aCA/IGRpdi5hdHRyaWJ1dGVzLndpZHRoLnZhbHVlIDogNjQwO1xuICAgICAgICBoZWlnaHQgPSBkaXYuYXR0cmlidXRlcy5oZWlnaHQgPyBkaXYuYXR0cmlidXRlcy5oZWlnaHQudmFsdWUgOiAzNjA7XG5cbiAgICAgICAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIGNhbnZhcy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiMzMzMzMzNcIjtcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cbiAgICAgICAgd2ViR0xDYW52YXMgPSBuZXcgWVVWV2ViR0xDYW52YXMoY2FudmFzLCBuZXcgU2l6ZSh3aWR0aCwgaGVpZ2h0KSk7XG4gICAgfVxuXG5cbiAgICBOUyA9IGZ1bmN0aW9uIChkaXYsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGhvc3RuYW1lLCBwb3J0O1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgaG9zdG5hbWUgPSBvcHRpb25zLmhvc3RuYW1lIHx8IHdpbmRvdy5kb2N1bWVudC5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgICAgICAgcG9ydCA9IG9wdGlvbnMucG9ydCB8fCB3aW5kb3cuZG9jdW1lbnQubG9jYXRpb24ucG9ydDtcblxuICAgICAgICBzZXR1cENhbnZhcyhkaXYpO1xuICAgICAgICBzZXR1cEF2YygpO1xuXG4gICAgICAgIHNvY2tldCA9IG5ldyBXZWJTb2NrZXQoXG4gICAgICAgICAgICAgJ3dzOi8vJyArIGhvc3RuYW1lICsgJzonICsgcG9ydCArICcvZHJvbmVzdHJlYW0nXG4gICAgICAgICk7XG4gICAgICAgIHNvY2tldC5iaW5hcnlUeXBlID0gJ2FycmF5YnVmZmVyJztcbiAgICAgICAgc29ja2V0Lm9ubWVzc2FnZSA9IGhhbmRsZU5hbFVuaXRzO1xuICAgIH07XG5cbiAgICAvLyBlbnF1ZXVlIGNhbGxiYWNrIG90byBiZSBjYWxsZWQgd2l0aCBuZXh0IChibGFjayZ3aGl0ZSkgZnJhbWVcbiAgICBOUy5wcm90b3R5cGUub25OZXh0RnJhbWUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2tPbmNlID0gY2FsbGJhY2s7XG4gICAgfTtcblxuICAgIHdpbmRvdy5Ob2RlY29wdGVyU3RyZWFtID0gTlM7XG5cbn0od2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKSk7XG4iXX0=

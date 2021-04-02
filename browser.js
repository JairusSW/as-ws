require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"ws":[function(require,module,exports){
class WS5 extends WebSocket {

    constructor(uri, protocols) {

        super(uri, protocols)

    }
    
    on(event, callback) {

        if(event === 'open') super.onopen = e => callback(e)

        if (event === 'message') super.onmessage = e => callback(e.data)

        if(event === 'close') super.onclose = e => callback(e)

        if (event === 'error') super.onerror = e => callback(e)

    }
}

window.WebSocket5 = WS5
},{}]},{},[]);

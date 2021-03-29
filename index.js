const fs = require("fs");
const loader = require("as-bind").AsBind;

let wasmModule

let sockets = []

const ws = require('ws')

const imports = {
    index: {
        sendPointer: (id, event, pointer) => {

            if (!sockets[id]) return
    
            sockets[id]['pointers'][event.toLowerCase().trim()] = wasmModule.exports.table.get(pointer)
    
        },
        initWS: (address) => {
    
            console.log('(JS) Created New socket. Id: ', sockets.length)
    
            sockets.push({
                pointers: {
                    message: null,
                    error: null,
                    listening: null,
                    connect: null,
                    close: null
                },
                socket: new ws(address),
                cache: [],
                ready: false
            })
    
            let id = sockets.length - 1
    
            let socket = sockets[id]

            // Handle messages before ready (b/c closures) :P
            socket.socket.on('open', () => {

                socket.ready = true

                for (const message of socket.cache) {

                    socket.socket.send(message)
                    
                }
            })
    
            socket.socket.on('message', (data, info) => {
            
                // Only supports numbers :(
    
                const func = socket.pointers['message']
    
                if (isNaN(parseInt(data.toString()))) return
                // Only numbers are allowed.
    
                if (typeof func === 'function') func(parseInt(data.toString()))
                // Send if type is number
    
            })
    
            socket.socket.on('listening', () => {
            
                const func = socket.pointers['listening']
    
                if (typeof func === 'function') func()
    
            })
    
            socket.socket.on('close', () => {
            
                const func = socket.pointers['close']
    
                if (typeof func === 'function') func()
    
            })
    
            socket.socket.on('error', () => {
            
                const func = socket.pointers['error']
    
                if (typeof func === 'function') func()
    
            })
    
            socket.socket.on('connect', () => {
            
                const func = socket.pointers['connect']
    
                if (typeof func === 'function') func()
    
            })
            
            return id
    
        },
        sendWS: (id, message) => {
    
            if (sockets[id].ready === false) {
                
                sockets[id].cache.push(message)

                return
                
            }

            sockets[id]['socket'].send(message)
    
            return
    
        },
        closeWS: (id, number) => {
    
            sockets[id]['socket'].close(number)
    
        }
    }
}

require('as-console/bind')(imports)

wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + "/build/untouched.wasm"), imports);

module.exports = wasmModule.exports;
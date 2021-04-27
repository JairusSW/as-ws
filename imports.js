let Websockets = []

const ws = require('ws')

class WebSocketImport {
    
    constructor() {
        
        this._exports = null

        this.wasmImports = {
            WebSocket: {
                sendPointer: (id, event, pointer) => {
        
                    if (!Websockets[id]) return
        
                    Websockets[id]['pointers'][this._exports.__getString(event).toLowerCase().trim()] = this._exports.table.get(pointer)
        
                },
                initWS: (address) => {
        
                    Websockets.push({
                        pointers: {
                            message: null,
                            error: null,
                            listening: null,
                            connect: null,
                            close: null
                        },
                        socket: new ws(this._exports.__getString(address)),
                        cache: [],
                        ready: false
                    })
        
                    let id = Websockets.length - 1
        
                    let socket = Websockets[id]
        
                    // Handle messages before ready (b/c closures) :P
                    socket.socket.on('open', () => {
        
                        socket.ready = true
        
                        for (const message of socket.cache) {
        
                            socket.socket.send(message)
                            
                        }
                    })
        
                    socket.socket.on('message', (data, info) => {
        
                        const func = socket.pointers['message']
        
                        if (typeof func === 'function') func(this._exports.__newString(data))
        
                    })
        
                    socket.socket.on('listening', () => {
                    
                        const func = socket.pointers['listening']
        
                        if (typeof func === 'function') func()
        
                    })
        
                    socket.socket.on('close', () => {
                    
                        const func = socket.pointers['close']
        
                        if (typeof func === 'function') func()
        
                    })
        
                    socket.socket.on('error', (err) => {
                    
                        const func = socket.pointers['error']
        
                        if (typeof func === 'function') func(this._exports.__getString(err))
        
                    })
        
                    socket.socket.on('connect', () => {
                    
                        const func = socket.pointers['connect']
        
                        if (typeof func === 'function') func()
        
                    })
                    
                    return id
        
                },
                sendWS: (id, message) => {
        
                    if (Websockets[id].ready === false) {
                        
                        Websockets[id].cache.push(this._exports.__getArray(message))
        
                        return
                        
                    }
        
                    Websockets[id]['socket'].send(this._exports.__getArray(message))
        
                    return
        
                },
                closeWS: (id, number) => {
        
                    Websockets[id]['socket'].close(number)
        
                }
            },
        
        }
    }

    get wasmExports() {
		return this._exports
	}
	set wasmExports(e) {
		this._exports = e
        this._exports.__getString = e.__getString
        this._exports.__newString = e.__newString
        this._exports.__newArray = e.__newArray
        this._exports.__getArray = e.__getArray
	}

	getFn(fnIndex) {
		if (!this.wasmExports)
			throw new Error(
				'Make sure you set .wasmExports after instantiating the Wasm module but before running the Wasm module.',
			)
		return this.table.get(fnIndex)
	}
}

module.exports = WebSocketImport
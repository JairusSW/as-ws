module.exports = `
    let sockets = []

    const ws = require('ws')

    this['WebSocket'] = {
    WebSocket: {
        sendPointer: (id, event, pointer) => {

            if (!sockets[id]) return

            sockets[id]['pointers'][wasmModule.exports.__getString(event).toLowerCase().trim()] = wasmModule.exports.table.get(pointer)

        },
        initWS: (address) => {

            sockets.push({
                pointers: {
                    message: null,
                    error: null,
                    listening: null,
                    connect: null,
                    close: null
                },
                socket: new ws(wasmModule.exports.__getString(address)),
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

                const func = socket.pointers['message']

                if (typeof func === 'function') func(wasmModule.exports.__newString(data))

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

                if (typeof func === 'function') func(wasmModule.exports.__getString(err))

            })

            socket.socket.on('connect', () => {
            
                const func = socket.pointers['connect']

                if (typeof func === 'function') func()

            })
            
            return id

        },
        sendWS: (id, message) => {

            if (sockets[id].ready === false) {
                
                sockets[id].cache.push(wasmModule.exports.__getArray(message))

                return
                
            }

            sockets[id]['socket'].send(wasmModule.exports.__getArray(message))

            return

        },
        closeWS: (id, number) => {

            sockets[id]['socket'].close(number)

        }
    }
}`
# As-WebSocket
**WebSocket bindings for AssemblyScript**

## Setting up

1. Enable As-bind
2. Add --exportTable flag

## Usage

**AssemblyScript WebSocket**

```js
import { WebSocket } from 'as-ws'

const socket = new WebSocket('ws://localhost:3000')

socket.on('message', (data) => {
//--> Only supports incoming numbers
    console.log('Message: ' + data)

})

socket.on('listening', () => {

    console.log('Listening')

})

socket.send('Hello From AssemblyScript!')

```
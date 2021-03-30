# As-WebSocket
**WebSocket bindings for AssemblyScript**

## Setting up

- Add --exportTable and --exportRuntime flags

## Usage

**AssemblyScript WebSocket**

```js
import { WebSocket } from 'as-ws'

const socket = new WebSocket('ws://localhost:3000')

socket.on('message', (data) => {

    console.log('Message: ' + data)

})

socket.on('listening', () => {

    console.log('Listening')

})

socket.send('Hello From AssemblyScript!')

```
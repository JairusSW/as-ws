import { Bitray } from 'as-bitray'

import { console } from 'as-console'

// JS Imports
declare function sendWS(id: i32, data: Uint8Array): void
declare function initWS(address: string): i32
declare function closeWS(id: i32, number: number): void
declare function sendPointer(id: number, event: string, pointer: i32): void
// Miscellanious

// API
export class WebSocket {

  private id: i32 = 0

  constructor(address: string) {

    let id = initWS(address)

    this.id = id

  }

  sendBinary(data: Uint8Array): void {

    sendWS(this.id, data)

  }
  send(data: string): void {

    sendWS(this.id, Uint8Array.wrap(String.UTF8.encode(data)))

  }
  close(number: number): void {

    closeWS(this.id, number)

  }

  // WIP: Add string support for as-bind
  on(event: string, callback: (data: number) => void): void {

    sendPointer(this.id, event, load<i32>(changetype<usize>(callback)))
    // NOTE: Does not call every time! Only calls if once.
  }
  
}

// Socket Testing

export function test(): void {

  const socket = new WebSocket('ws://localhost:3000')

  console.log('Sending Message (AS)...')

  socket.on('message', (data) => {

    console.log('Response (AS): ' + data.toString())
    
  })

  socket.on('listening', () => {

    console.log('Listening (AS)')
    
  })

  socket.send('Hello From AssemblyScript!')
  
}
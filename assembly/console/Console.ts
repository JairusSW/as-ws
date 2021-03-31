declare function consoleDebug(message: string): void

declare function consoleError(message: string): void

declare function consoleInfo(message: string): void

declare function consoleTime(label: string): void

declare function consoleTimeEnd(label: string): void

declare function consoleTimeLog(label: string): void

declare function consoleWarn(message: string): void

declare function consoleLog(message: string): void

export namespace console {

    export function debug(message: string): void {

      consoleDebug(message)

    }

    export function error(message: string): void {

      consoleError(message)

    }

    export function info(message: string): void {

      consoleInfo(message)
        
    }

    export function time(label: string): void {

      consoleTime(label)
        
    }

    export function timeEnd(label: string): void {

      consoleTimeEnd(label)
        
    }

    export function timeLog(label: string): void {

      consoleTimeLog(label)
        
    }

    export function warn(message: string): void {

      consoleWarn(message)
        
    }

    export function log(message: string): void {

    consoleLog(message)
      
  }
  
}
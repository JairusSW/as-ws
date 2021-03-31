const fs = require("fs");

const loader = require('@assemblyscript/loader');

let wasmModule

const wsImports = require('./import')

const imports = {
    ...eval(wsImports),
}

wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + "/build/optimized.wasm"), imports);

module.exports = wasmModule.exports;
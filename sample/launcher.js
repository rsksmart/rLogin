const open = require('open');

const startingUrl = `http://localhost:3006${process.argv.length === 3 && process.argv[2] === 'backend' ? '/?backend=yes' : ''}`

open(startingUrl).catch(() => process.exit(1))

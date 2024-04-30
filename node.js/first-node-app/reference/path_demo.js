const path = require('path')

console.log(path.basename(__filename), path.dirname(__filename), path.extname(__filename), path.parse(__filename))
/* 
    module must do:
    1. Export a single function that takes exactly the arguments described.  
    2. Call the callback exactly once with an error or some data as described.  
    3. Don't change anything else, like global variables or stdout.  
    4. Handle all the errors that may occur and pass them to the callback.

    if (err)
      return callback(err)
*/

module.exports = function (dir, ext, callback) { 
    const fs = require('fs')
    const path = require('path')
    let list = []

    fs.readdir(dir, (err, files) => {
        if (err) {
            return callback(err)
        }
        
        files.forEach((file) => {
            if (path.extname(file) == "." + ext) {
                list.push(file)
            }
        })

        return callback(null, list)
    })
}
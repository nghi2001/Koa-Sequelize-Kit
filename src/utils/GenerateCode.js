const crypto = require("crypto");

export const generateCode =  () => {
    let code =  crypto.randomBytes(6).toString('base64')
    return code
}
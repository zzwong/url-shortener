const crypto = require('crypto')

exports.shorten = url => crypto.createHmac('sha256', url).update('Super Secrit').digest('hex').substring(0,5);

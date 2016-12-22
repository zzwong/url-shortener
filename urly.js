const crypto = require('crypto')

exports.shorten = url => {
  let short_id = crypto.createHmac('sha256', url)
                   	 .update('Super Secrit')
                   	 .digest('hex')
										 .substring(0,5)
  return short_id
}

const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.cookies.token
    if (token == null) 
    {
        return res.status(401)
    }
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403)
        }
        req.user = user
        req.token = token
        next()
    })
}
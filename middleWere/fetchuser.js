var jwt = require('jsonwebtoken');
const JWT_SECRET = "any text or number you want to add here to create jwt Token"

const fetchuser = (req, res, next)=> {
    const token = req.header('auth-token');
    if (!token) {
        res.status(500).send(error.message);
    }
    try {

        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message)
    }

}



module.exports = fetchuser;
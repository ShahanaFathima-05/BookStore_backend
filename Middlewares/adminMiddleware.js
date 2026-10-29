
const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ msg: 'Token is missing' });
    }

    const token = authHeader.split(' ')[1];

    const verifiedData = jwt.verify(
      token,
      process.env.secretkey
    );

    console.log('Verified data:', verifiedData);

    req.payload = verifiedData;

    next();
  } catch (err) {
    return res.status(401).json({
      msg: 'Invalid or expired token'
    });
  }
};

module.exports = jwtMiddleware;

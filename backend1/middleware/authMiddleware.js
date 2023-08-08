const admin = require("../config/firebase-config");

const protect = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    // get token from header
    // verify token
    const decoded = await admin.auth().verifyIdToken(token);
    // req.admin = decoded.uid;
    // console.log(decoded);
  
    
    if (decoded) {
      // Token is valid, move to the next middleware
      
      return next();
    }

    return res.status(401).json({ message: "Unauthorized" });
  } catch (e) {
    return res.status(500).json({ message: "Internal Error" });
  }
};

module.exports = { protect };

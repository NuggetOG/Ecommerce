const checkAdmin = (adminEmail) => {
    return (req, res, next) => {
      if (!req.user || !req.user.id) {
        return res.status(401).json({
          message: "Unauthorised user"
        });
      }
  
      try {
        if (req.user.email === adminEmail) {
          return next();
        }
        return res.status(401).json({
          message: "You don’t have permission to enter this route"
        });
      } catch (error) {
        return res.status(500).json({
          message: "Internal server error"
        });
      }
    };
  };
  
  module.exports = checkAdmin;
  
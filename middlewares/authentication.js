const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const toketCookieValue = req.cookies[cookieName];
    if (!toketCookieValue) {
      return next();
    }
    try {
      const userPayload = validateToken(toketCookieValue);
      req.user = userPayload;
    } catch (error) {}
    return next();
  };
}

module.exports = {
  checkForAuthenticationCookie,
};

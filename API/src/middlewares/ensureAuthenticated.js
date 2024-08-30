const { verifyToken } = require('../config/auth');
const AppError = require('../utils/AppError');

async function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  // console.log(`authHeader: ${authHeader}`);
  if (!authHeader) {
    throw new AppError('JWT token not provided', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await verifyToken(token);

    // console.log(decoded);
    request.user = {
        id: decoded.userId,
        role: decoded.role, // or permissions: decoded.permissions
      };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}

module.exports = ensureAuthenticated;
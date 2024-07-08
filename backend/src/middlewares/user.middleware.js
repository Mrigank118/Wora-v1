
import cookieParser from 'cookie-parser';

const setupAuthMiddleware = (app) => {
  // Middleware to parse cookies
  app.use(cookieParser());
};

export default setupAuthMiddleware;

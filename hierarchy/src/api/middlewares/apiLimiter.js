import rateLimit from "express-rate-limit";

export const SignupRateLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 10,
      message: "Too many requests, please try again after 15 minutes",
      standardHeaders: true,
      legacyHeaders: false,
});

export const LoginRateLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 10,
      message: "Too many requests, please try again after 15 minutes",
      standardHeaders: true,
      legacyHeaders: false,
});

export const AuthRateLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 10,
      message: "Too many requests, please try again after 15 minutes",
      standardHeaders: true,
      legacyHeaders: false,
});

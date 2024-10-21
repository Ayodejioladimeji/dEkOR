import jwt from "jsonwebtoken";

export const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.NEXT_PUBLIC_ACTIVATION_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

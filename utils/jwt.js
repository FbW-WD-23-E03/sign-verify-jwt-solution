import jwt from "jsonwebtoken";

export function signToken(user) {
  const payload = {
    email: user.email,
    _id: user._id,
  };

  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.SECRET_KEY);
}

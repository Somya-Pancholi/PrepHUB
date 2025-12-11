import jwt from "jsonwebtoken";

export default async function auth(req, res, next) {
  // Check Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1]; // Get the token part
  console.log("Token received:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    req.user = { id: decoded.user.id, role: decoded.user.role };
    next();
  } catch (err) {
    console.error("JWT verify error:", err.message);
    return res.status(401).json({ message: "Token is not valid" });
  }
}

/*// middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.user.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = { id: user._id.toString(), role: user.role };
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default auth;
/*import jwt from "jsonwebtoken";
import User from "../models/User.js";


export default async function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id);   // <-- requires async

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = {
      id: user._id.toString(),
      role: user.role 
    };

    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
}

/*import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function auth(req, res, next){
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = {
      id: user._id.toString(),
      isAdmin: user.isAdmin || false, // Add this
    };

    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
}*/
   


/*import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token)
    return res.status(401).json({ message: "You must login first" });

  // Expecting: Authorization: Bearer token
  //const token = authHeader.split(" ")[1];

  //if (!token)
    //return res.status(401).json({ msg: "Token missing, login again" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // store user ID
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
}


/*import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // user id stored in token
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default auth;*/
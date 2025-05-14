import express from "express";
import {
  signUp,
  login,
  logout,
  onboard,
} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", login);
//we used post method for operation which changes server state we use post method
//we used post method for logout because we are using cookies
//and we want to clear the cookie from the client side
router.post("/logout", logout);

router.post("/onboarding", protectedRoute, onboard);

//check if the user is logged in or not
router.get("/me", protectedRoute, (req, res) => {
  res.status(200).json({ success: true, user: req.user, message: "my data sent " });
});

export default router;

const express = require("express");
const { check } = require("express-validator");
const controller = require("../controllers/authController");
const authMiddleware = require("../middleware/AuthMiddleware");

const router = new express.Router();

router.post(
  "/registration",
  [
    check("email", "Wrong format of email").isEmail(),
    check("username", "Name can`t be empty").notEmpty(),
    check(
      "password",
      "Password size should be bigger than 4 and smaller than 8"
    ).isLength({ max: 8, min: 4 }),
  ],
  controller.registration
);
router.post("/logout", controller.logOut);
router.post("/login", controller.logIn);
router.get("/refresh", controller.refresh);
router.get("/users", authMiddleware, controller.getUsers);

module.exports = router;

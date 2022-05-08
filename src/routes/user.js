const express = require("express");

const { auth } = require("../middleware/auth");

const router = express.Router();

const {
    userRegister,
    userLogin,
    userDelete,
    userUpdate,

    getUser,
    getUsers
} = require("../controllers/user");

const { upload } = require("../helpers/multerConfig");

router.post("/register", upload.single("image"), userRegister);
router.post("/login", userLogin);
router.put("/:userId", auth, upload.single("image"), userUpdate);
router.delete("/:userId", auth, userDelete);

router.get("/:userId", auth, getUser);
router.get("/", auth, getUsers);

module.exports = router;
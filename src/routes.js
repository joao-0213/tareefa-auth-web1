const express = require("express");
const { login, protectedContent, contentOne, contentTwo } = require("./controllers/authController");

const router = express.Router();

// Rota pública
router.get("/", (request, response) => {
  response.json({ message: "Endpoint que não exige autenticação!" });
});

// Rota de login
router.post("/login", login);

// Rota protegida
router.get("/protected", protectedContent);

router.get("/contentone", contentOne);

router.get("/contenttwo", contentTwo);


module.exports = router;

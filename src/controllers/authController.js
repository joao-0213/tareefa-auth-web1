const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const login = (request, response) => {
  const { username, password } = request.body;

  if (username === "professor.lucas" && password === "1234") {
    const payload = {
      sub: username,
      name: "Lucas José de Souza",
      iat: Math.floor(Date.now() / 1000),
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1d" });
    return response.json({ message: "Login bem-sucedido!", token });
  }

  response.status(401).json({ message: "Credenciais inválidas" });
};

const protectedContent = (request, response) => {
  const token = request.headers["authorization"];

  if (!token) {
    return response.status(403).json({ message: "Token não fornecido" });
  }

  try {
    const bearerToken = token.split(" ")[1];
    const decoded = jwt.verify(bearerToken, secretKey);

    response.json({ message: "Conteúdo protegido acessado!", user: decoded });
  } catch (error) {
    return response.status(403).json({ message: "Token inválido ou expirado" });
  }
};

const contentOne = (request, response) => {
  const token = request.headers["authorization"];

  if (!token) {
    return response.status(403).json({ message: "Cadê o token?" });
  }

  try {
    const bearerToken = token.split(" ")[1];
    const decoded = jwt.verify(bearerToken, secretKey);

    response.json({ message: "Parabéns, você conseguiu entrar!", user: decoded });
  } catch (error) {
    return response.status(403).json({ message: "Token incorreto ou expirado" });
  }
};

const contentTwo = (request, response) => {
  const token = request.headers["authorization"];

  if (!token) {
    return response.status(403).json({ message: "Token não enviado" });
  }

  try {
    const bearerToken = token.split(" ")[1];
    const decoded = jwt.verify(bearerToken, secretKey);

    response.json({ message: "UAUU! Você acessou o conteúdo protegido 2.", user: decoded });
  } catch (error) {
    return response.status(403).json({ message: "Token incorreto ou expirado" });
  }
};

module.exports = { login, protectedContent, contentOne, contentTwo };

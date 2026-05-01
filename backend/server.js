import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const __dirname = path.resolve();
const usersFilePath = path.join(__dirname, "data", "users.json");
const itemsFilePath = path.join(__dirname, "data", "items.json");
const JWT_SECRET = "keysuperp00persecret";

function readUsers() {
  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(usersFilePath, "utf-8");
  return JSON.parse(data);
}
function writeUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Неверный токен" });
    }
    req.user = user;
    next();
  });
}

function readItems() {
  if (!fs.existsSync(itemsFilePath)) {
    fs.writeFileSync(itemsFilePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(itemsFilePath, "utf-8");
  return JSON.parse(data);
}

function writeItems(items) {
  fs.writeFileSync(itemsFilePath, JSON.stringify(items, null, 2));
}

function validateItemFields(title, description) {
  if (!title || typeof title !== "string" || title.trim() === "") {
    return {
      valid: false,
      message: "Поле title обязательно и не может быть пустым",
    };
  }

  if (
    !description ||
    typeof description !== "string" ||
    description.trim() === ""
  ) {
    return {
      valid: false,
      message: "Поле description обязательно и не может быть пустым",
    };
  }

  return { valid: true };
}

app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = readUsers();
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      return res.status(400).json({ message: "Пользователь уже существует" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now(),
      email: email,
      password: hashedPassword,
    };

    users.push(newUser);
    writeUsers(users);

    res.status(201).json({ message: "Пользователь зарегистрирован" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = readUsers();
    const user = users.find((user) => user.email === email);

    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Неверный пароль" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});
app.get("/api/profile", authenticateToken, (req, res) => {
  const users = readUsers();
  const user = users.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: "Пользователь не найден" });
  }
  res.json({ id: user.id, email: user.email });
});

// Взаимодействие с элементами (CRUD)

// Вернуть массив элементов
app.get("/api/items", authenticateToken, (req, res) => {
  const items = readItems();
  const userItems = items.filter((item) => item.userId === req.user.id);
  res.json(userItems);
});

// Создать новый элемент
app.post("/api/items", authenticateToken, (req, res) => {
  const { title, description } = req.body;

  const validation = validateItemFields(title, description);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  const items = readItems();
  const newItem = {
    id: Date.now(),
    userId: req.user.id,
    title,
    description,
  };
  items.push(newItem);

  writeItems(items);
  res.status(201).json(newItem);
});

// Обновить элемент
app.put("/api/items/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const validation = validateItemFields(title, description);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  const items = readItems();
  const itemIndex = items.findIndex(
    (item) => item.id === parseInt(id) && item.userId === req.user.id,
  );
  if (itemIndex === -1) {
    return res.status(404).json({ message: "Элемент не найден" });
  }
  items[itemIndex] = { ...items[itemIndex], title, description };
  writeItems(items);
  res.json(items[itemIndex]);
});

// Удалить элемент
app.delete("/api/items/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const items = readItems();
  const itemIndex = items.findIndex(
    (item) => item.id === parseInt(id) && item.userId === req.user.id,
  );
  if (itemIndex === -1) {
    return res.status(404).json({ message: "Элемент не найден" });
  }
  const deletedItem = items.splice(itemIndex, 1)[0];
  writeItems(items);
  res.json(deletedItem);
});

app.listen(PORT, () => console.log(`Сервер запущен: http://localhost:${PORT}`));

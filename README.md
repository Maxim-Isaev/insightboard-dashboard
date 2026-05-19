# insightboard-dashboard

"insightBoard" - демонстрационный fullstack-проект: личный дашборд с аутентификацией JWT, CRUD-таблицей и аналитическим графиком.
Цель — показать владение современным стеком (React, TypeScript, Node.js, Express, Docker).

## Стек технологий:

- **Frontend:** React 18, TypeScript, Redux Toolkit, React Router, Axios, SCSS Modules, Chart.js
- **Backend:** Node.js, Express, JWT, bcryptjs, файловое хранилище (json в /backend/data)
- **DevOps:** Docker, docker-compose
- **Testing:** Vitest
- **Инструменты:** ESLint, Prettier, Git, GitHub, VS Code, Copilot, Coderabbit

## Функциональность

- Регистрация и вход (JWT-токен, хеширование паролей bcryptjs)
- Личный кабинет (профиль с email)
- Дашборд с графиком активности (Chart.js)
- CRUD-таблица задач (создание, обновление, удаление)
- Адаптивная вёрстка (мобильная и десктопная версии)
- Unit-тесты для Redux-редьюсеров (Vitest)
- Docker-контейнеризация (бэкенд + фронтенд)

## Требования к окружению

- Node.js 20.x или выше
- npm 10.x или выше
- Docker 24+

## Основные зависимости (версии, с которыми гарантированно работает проект)

**Frontend:**

- React 18.3+
- TypeScript 5.4+
- Redux Toolkit 2.2+
- React Router 6.23+
- Vite 5.2+

**Backend:**

- Express 4.19+
- jsonwebtoken 9.0+
- bcryptjs 2.4+

Полный список можно посмотреть в `package.json` каждой подпапки.

## Конфигурация и инструменты

- **TypeScript** — строгая типизация (конфигурация `tsconfig.json`)
- **ESLint + Prettier** — линтинг и форматирование кода
- **Vitest** — unit-тесты (конфиг `vitest.config.ts`)
- **Docker** — контейнеризация (2 `Dockerfile` + `docker-compose.yml`)
- **Vite** — сборка фронтенда
- **nginx** — отдача статики в продакшене (собственный конфиг для роутинга React Router)

## Запуск проекта

### Локальный запуск (для разработки)

### backend

```bash
cd backend
npm install
node server.js
```

Сервер запустится на http://localhost:5000

### frontend

```bash
cd frontend
npm install
npm run dev
```

Приложение будет доступно по адресу, указанному в терминале (обычно http://localhost:5173)

### Запуск через Docker (для продакшен)

Из корневой папки проекта выполнить:

```bash
docker compose up --build
```

После сборки фронтенд будет доступен на http://localhost, бэкенд — на http://localhost:5000.

Остановка:

```bash
docker compose down
```

### Запуск тестов

```bash
cd frontend
npm test
```

## Структура проекта

Проект разделён на две независимые части: backend/ и frontend/.

## Демо-доступ

Зарегистрируйтесь через форму на странице /login. После входа автоматически попадёте на дашборд.

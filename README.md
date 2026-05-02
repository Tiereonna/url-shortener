# URL Shortener API

A backend API that turns long URLs into short, shareable links. When a user opens the short link, they are redirected back to the original website.

This project was built to practice backend development, API routing, database storage, Prisma ORM, MySQL, and Postman testing.

## Tech Stack

| Tool | Purpose |
|---|---|
| Node.js | Runs the backend server |
| Express.js | Handles API routes and requests |
| Prisma ORM | Connects the app to the MySQL database |
| MySQL | Stores original URLs and short codes |
| Nanoid | Generates unique short codes |
| Postman | Tests API routes |

## Features

- Create a short URL from a long URL
- Save the original URL and short code in MySQL
- Redirect short links back to the original website
- Return clear JSON responses
- Test API routes with Postman
- Use Prisma ORM for database queries

## How It Works

1. A user sends a long URL to the API.
2. The server creates a random short code with Nanoid.
3. Prisma saves the original URL and short code in MySQL.
4. The API returns a shortened URL.
5. When the short URL is opened, the server finds the matching record and redirects to the original website.

## API Routes

| Method | Route | Description |
|---|---|---|
| GET | `/` | Checks if the backend is running |
| POST | `/shorten` | Creates a new short URL |
| GET | `/:shortCode` | Redirects to the original URL |

## Example Request

```http
POST /shorten
```

```json
{
  "original": "https://www.google.com"
}
```

## Example Response

```json
{
  "message": "URL created successfully",
  "shortUrl": "http://localhost:5000/n9BAMV",
  "original": "https://www.google.com/"
}
```

## Redirect Example

If the API returns this short link:

```text
http://localhost:5000/n9BAMV
```

Opening it redirects the user to:

```text
https://www.google.com/
```

## Running the Project Locally

Install dependencies:

```bash
npm install
```

Start the backend server:

```bash
npm run dev
```

The server runs at:

```text
http://localhost:5000
```

## Environment Variables

Create a `.env` file in the project root and add:

```env
PORT=5000
DATABASE_URL="mysql://root@localhost:3306/url_shortener_db"
```

The `.env` file is ignored in Git so database credentials are not pushed to GitHub.

## What I Learned

While building this project, I practiced:

- Creating API routes with Express
- Sending and receiving JSON data
- Using Prisma with a MySQL database
- Saving and retrieving database records
- Debugging backend and database connection errors
- Testing routes with Postman
- Using Git and GitHub to track project updates

## Status

Completed backend project with working URL creation, database storage, and redirect functionality.

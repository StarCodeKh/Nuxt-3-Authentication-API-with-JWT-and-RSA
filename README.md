# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install

Environment Variables

After cloning this project, copy the example environment file and configure your environment variables:

cp .env.example .env


Then, open the .env file and update the values as needed, for example:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=nuxt_rsa_auth

JWT_SECRET=your_super_secret_key
JWT_EXPIRES=1h

## MySQL Database Setup

CREATE DATABASE nuxt_rsa_auth;
USE nuxt_rsa_auth;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


Make sure to replace your_mysql_password and your_super_secret_key with your actual database password and a secure JWT secret.

Generate RSA Keys

This project uses RSA encryption for secure password handling. You need to generate your own RSA key pair before running the project:

mkdir -p storage/rsa
openssl genrsa -out storage/rsa/private.pem 2048
openssl rsa -in storage/rsa/private.pem -pubout -out storage/rsa/public.pem


Important: Never commit your private key (private.pem) to version control.

Development Server

Start the development server on http://localhost:3000:

# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev

Production

Build the application for production:

# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build


Locally preview production build:

# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
# PANEL - Comic & Anime E-Commerce Platform

PANEL is a modern, premium online comic, anime, and superhero merchandise store prototype built using the MERN stack (MongoDB, Express, React, Node.js). This project serves as a comprehensive third-year college major project prototype, showcasing a fully integrated frontend and backend with a striking comic-book aesthetic.

## Features

- **Comic UI/UX:** A high-contrast, black and white manga/comic-book design with thick borders and striking fonts.
- **Product Management:** Browse, search, filter, and sort products (Comics, Figures, Apparel, Accessories, Anime, Merchandise). Admin can perform full CRUD operations.
- **Cart & Checkout:** Fully functional shopping cart with quantity updates and checkout process.
- **Order Receipts:** Automatic generation of branded, manga-styled PDF receipts upon checkout (zero external dependencies).
- **Authentication:** JWT-based authentication with encrypted passwords using bcrypt.
- **Role-based Access:** Differentiated access for normal users and administrators.
- **Order Management:** Users can view their order history; admins can view and update the status of all orders.
- **Responsive Design:** Fully responsive layout for desktop, tablet, and mobile viewing.

## Folder Structure

```
LUXE/
├── client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── assets/
│   │   ├── components/     # Reusable UI components (Navbar, Footer, ProductCard, etc.)
│   │   ├── context/        # React Context (Auth, Cart)
│   │   ├── layouts/        # MainLayout component
│   │   ├── pages/          # Application views (Home, Shop, Cart, Checkout, Admin, etc.)
│   │   ├── services/       # Axios API service layer (auth, products, orders, users)
│   │   ├── utils/
│   │   ├── App.jsx         # Main React component and Routing
│   │   ├── index.css       # Global styles (Tailwind CSS)
│   │   └── main.jsx        # Entry point
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                 # Express + Node.js Backend
│   ├── config/
│   │   └── db.js           # MongoDB connection setup
│   ├── controllers/        # Request handlers (auth, product, order, user)
│   ├── middleware/         # Custom middleware (auth checks, error handling)
│   ├── models/             # Mongoose schemas (User, Product, Order)
│   ├── routes/             # API routes mapping
│   ├── seed/
│   │   └── seed.js         # Script to populate the database with sample data
│   ├── utils/
│   │   └── generateToken.js# JWT token generation logic
│   ├── server.js           # Backend entry point
│   ├── .env                # Environment variables
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register a new user
- `POST /login` - Authenticate user & get token
- `GET /me` - Get current user profile (Protected)
- `PUT /profile` - Update user profile (Protected)

### Product Routes (`/api/products`)
- `GET /` - Fetch all products (supports search, sort, filters)
- `GET /:id` - Fetch single product by ID
- `POST /` - Create a product (Admin only)
- `PUT /:id` - Update a product (Admin only)
- `DELETE /:id` - Delete a product (Admin only)

### Order Routes (`/api/orders`)
- `POST /` - Create new order (Protected)
- `GET /` - Fetch all orders (Admin only)
- `GET /my` - Fetch logged in user's orders (Protected)
- `PUT /:id` - Update order status (Admin only)
- `DELETE /:id` - Delete order (Admin only)

### User Routes (`/api/users`)
- `GET /` - Fetch all users (Admin only)
- `PUT /:id` - Update user role (Admin only)
- `DELETE /:id` - Delete user (Admin only)

## Environment Variables

Ensure you have a `.env` file in the `server` directory with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/luxe
JWT_SECRET=your_secret_key
```

## Installation & Setup

1. **Ensure MongoDB Community Server is running locally on port 27017.**

2. **Backend Setup:**
   Open a terminal and navigate to the `server` directory:
   ```bash
   cd LUXE/server
   npm install
   ```

3. **Seed Database:**
   To populate the database with dummy products, an admin account, and user accounts:
   ```bash
   npm run seed
   ```
   *Note: Running the seed script will clear all existing data in the database.*

4. **Start Backend Server:**
   ```bash
   npm run dev
   ```
   The backend should start and display:
   ```
   MongoDB Connected...
   Server running on Port 5000
   ```

5. **Frontend Setup:**
   Open a new terminal and navigate to the `client` directory:
   ```bash
   cd LUXE/client
   npm install
   ```

6. **Start Frontend Server:**
   ```bash
   npm run dev
   ```

7. **Access the Application:**
   Open your browser and go to `http://localhost:5173/`.

### Default Accounts

After running the seed script, you can log in with:

**Admin User:**
- Email: `admin@panel.com`
- Password: `admin123`

**Customer User:**
- Email: `rahul@example.com`
- Password: `password123`

# AtithiStay — Atithi Devo Bhava 🏡

A property listing and booking platform built with **Node.js**, **Express**, **MongoDB**, and **EJS**. AtithiStay lets users discover, list, and review stays, complete with image uploads, interactive maps, authentication, and authorization.

---

### 🌐 Live Demo

👉 **[Visit AtithiStay — Atithi Devo Bhava](https://atithistay-atithi-devo-bhava.onrender.com)**

---

## ✨ Features

- **User Authentication & Authorization**
  - Secure signup/login with Passport.js (`passport-local`, `passport-local-mongoose`)
  - Passwords are salted and hashed — never stored in plain text
  - Session-based auth using `express-session` with MongoDB-backed session store (`connect-mongo`)
  - Route protection via `isLoggedIn` middleware
  - Owner-only and author-only access control (`isOwner`, `isReviewAuthor`)
  - Redirect-to-original-page after login (`saveRedirectUrl`)

- **Listings Management (CRUD)**
  - Create, read, update, and delete property listings
  - Server-side form validation (Joi-based schema validation)
  - Image upload via `multer` with cloud storage on **Cloudinary**
  - Live image preview with blurred placeholder on the edit page
  - Cascade deletion — deleting a listing removes its associated reviews (Mongoose middleware)

- **Reviews & Ratings**
  - Add and delete reviews tied to specific listings
  - Star-rating UI powered by [Starability](https://github.com/LunarLogic/starability)
  - Reviews removed cleanly from listings using MongoDB's `$pull` operator

- **Interactive Maps**
  - Integrated with **MapLibre GL JS** + **MapTiler**
  - Geocoding converts a listing's location into coordinates (GeoJSON `Point`)
  - Map markers with popups showing listing title and location

- **UX Enhancements**
  - Flash messages for success/error feedback (`connect-flash`)
  - Bootstrap 5 UI with a GST/tax toggle switch on listing prices
  - Search and filter UI on the home page
  - Responsive, styled navbar with conditional login/logout options

- **Architecture**
  - Follows the **MVC (Model–View–Controller)** design pattern
  - Routes organized using `express.Router()` and `router.route()` for clean, grouped endpoints
  - Centralized error handling with a custom `ExpressError` class and `wrapAsync` utility

---

## 🛠️ Tech Stack

| Layer            | Technology                                    |
| ---------------- | --------------------------------------------- |
| Runtime          | Node.js                                       |
| Framework        | Express.js                                    |
| Database         | MongoDB (Mongoose ODM), MongoDB Atlas         |
| View Engine      | EJS                                           |
| Styling          | Bootstrap 5, CSS3                             |
| Authentication   | Passport.js, passport-local-mongoose          |
| Sessions         | express-session, connect-mongo                |
| File Uploads     | Multer, Cloudinary, multer-storage-cloudinary |
| Maps & Geocoding | MapLibre GL JS, MapTiler                      |
| Flash Messaging  | connect-flash                                 |
| Validation       | Joi                                           |

---

## 📁 Folder Structure

```
AtithiStay/
│
├── assets/
│   └── AtithiStay - Atithi Devo Bhava.png
│
├── controllers/
│   ├── listings.controllers.js
│   ├── reviews.controllers.js
│   └── users.controllers.js
│
├── init/
│   ├── data.js
│   └── index.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── node_modules/
│
├── public/
│   ├── css/
│   │   ├── ratings.css
│   │   └── style.css
│   └── js/
│       ├── map.js
│       └── script.js
│
├── routes/
│   ├── listings.routes.js
│   ├── reviews.routes.js
│   └── user.routes.js
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── views/
│   ├── includes/
│   │   ├── flash.ejs
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   ├── layouts/
│   │   └── boilerplate.ejs
│   ├── listings/
│   │   ├── edit.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   └── show.ejs
│   ├── users/
│   │   ├── login.ejs
│   │   └── signup.ejs
│   └── error.ejs
│
├── .env
├── app.js
├── cloudinaryConfig.js
├── middleware.js
├── package-lock.json
├── package.json
└── schema.js
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local instance or MongoDB Atlas)
- Cloudinary account (for image storage)
- MapTiler account (for maps and geocoding)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/<your-username>/AtithiStay.git
   cd AtithiStay
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```env
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret

   MAPTILER_API_KEY=your_maptiler_api_key

   ATLASDB_URL=your_mongodb_atlas_connection_string
   SESSION_SECRET=your_session_secret
   ```

4. **Run the application**

   ```bash
   node app.js
   ```

   or, if using nodemon:

   ```bash
   npx nodemon app.js
   ```

5. **Visit the app**
   ```
   http://localhost:3000/listings
   ```

---

## 🔑 Key Routes

| Method     | Route                             | Description                  | Protected    |
| ---------- | --------------------------------- | ---------------------------- | ------------ |
| GET        | `/listings`                       | View all listings            | No           |
| GET        | `/listings/new`                   | Form to create a new listing | Yes          |
| POST       | `/listings`                       | Create a new listing         | Yes          |
| GET        | `/listings/:id`                   | View a single listing        | No           |
| GET        | `/listings/:id/edit`              | Form to edit a listing       | Yes (Owner)  |
| PUT        | `/listings/:id`                   | Update a listing             | Yes (Owner)  |
| DELETE     | `/listings/:id`                   | Delete a listing             | Yes (Owner)  |
| POST       | `/listings/:id/reviews`           | Add a review                 | Yes          |
| DELETE     | `/listings/:id/reviews/:reviewId` | Delete a review              | Yes (Author) |
| GET / POST | `/signup`                         | Register a new user          | No           |
| GET / POST | `/login`                          | Log in                       | No           |
| GET        | `/logout`                         | Log out                      | Yes          |

---

## 🚀 Deployment

The application is deployed on [Render](https://render.com/).

Ensure all environment variables are configured in the Render dashboard, and that the MongoDB Atlas cluster allows connections from the deployed server's IP.

---

## 👤 Author

Prasad Nayak

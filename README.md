
# Blacro

Blacro is a modern, minimal, and responsive e-commerce web application built with React, Tailwind CSS, and a Node.js/Express backend. It features authentication, product browsing, cart, wishlist, and profile management, with a focus on clean UI and smooth user experience.

---

## 🚀 Features

- **User Authentication:** Signup, login, and persistent sessions using JWT cookies.
- **Product Catalog:** Browse all products, or filter by Men/Women categories.
- **Product Details:** View product images, sizes, and add to cart.
- **Cart & Wishlist:** Add/remove products, view cart and wishlist, and proceed to checkout.
- **Profile Page:** View user info, cart count, wishlist count, and order history.
- **Responsive Design:** Mobile-first, works great on all devices.
- **Modern UI:** Built with Tailwind CSS and Framer Motion for smooth animations.
- **State Management:** Uses React Context and Jotai for global state.
- **API Integration:** Connects to a RESTful backend for all data operations.

---

## 🖥️ Tech Stack

- **Frontend:** React, Tailwind CSS, Framer Motion, Jotai
- **Backend:** Node.js, Express, Prisma (with PostgreSQL or SQLite)
- **Auth:** JWT (stored in HTTP-only cookies)
- **Other:** Vite, Axios

---

## 📂 Project Structure

```
client/
  ├── public/
  │   └── images/           # Product and cover images
  ├── src/
  │   ├── api/              # API calls (auth, product, cart, user)
  │   ├── assets/           # Fonts, icons, etc.
  │   ├── atoms/            # Jotai atoms for state
  │   ├── components/       # Reusable UI components
  │   ├── context/          # React context providers
  │   ├── data/             # Static data (if any)
  │   ├── pages/            # Page components (Home, Login, Signup, Profile, etc.)
  │   ├── App.jsx           # Main app component
  │   ├── main.jsx          # Entry point
  │   └── index.css         # Tailwind CSS import
  ├── package.json
  └── vite.config.js
```

---

## 🛠️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/blacro.git
cd blacro
```

### 2. Install Dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd server
npm install
```

### 3. Environment Variables
## 📂 Project Structure

- **Frontend:**  
  If you use environment variables (e.g., for API URLs), create a `.env` file in `client/` as needed.

- **Backend:**  
  Create a `.env` file in `server/` for your database and JWT secrets. Example:
  ```
  DATABASE_URL=postgresql://user:password@localhost:5432/blacro
  JWT_SECRET=your_jwt_secret
  ```

### 4. Database Setup

If using Prisma:

```bash
cd server
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Start the Development Servers

#### Backend

```bash
cd server
npm run dev
```

#### Frontend

```bash
cd client
npm run dev
```

- The frontend will typically run at [http://localhost:5173](http://localhost:5173)
- The backend will typically run at [http://localhost:5000](http://localhost:5000)

---

## 🧑‍💻 Usage

- **Home:** Animated cover, category navigation, and featured products.
- **Store:** Browse all, men, or women products.
- **Product Card:** Select size, quantity, add to cart or wishlist.
- **Cart:** View and manage cart items.
- **Wishlist:** View and manage wishlist items.
- **Profile:** View user info, cart/wishlist counts, and logout.

---

## 📝 Customization

- **Images:** Place your product and cover images in `client/public/images/`.
- **Theme:** Tweak Tailwind classes in components for your own color scheme.
- **API URLs:** Update API endpoints in `client/src/api/` if your backend URL changes.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Jotai](https://jotai.org/)
- [Prisma](https://www.prisma.io/)
- [Vite](https://vitejs.dev/)

---

## 📷 Screenshots

![Homepage Screenshot](client/public/images/image.png)
![Product Page](client/public/images/image_copy.png)
![login Page](client/public/images/login.png)
![signup page](client/public/images/signup.png)

---



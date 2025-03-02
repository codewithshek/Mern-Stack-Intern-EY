# Mern Stack Intern EY: Building a Robust Web Application
A comprehensive web application developed using the MERN stack, designed to provide a seamless and efficient user experience.

🖼️ Preview
![image](https://github.com/user-attachments/assets/9414b187-4099-4438-86c9-2de60314b56b)

[image](https://github.com/user-attachments/assets/86fe95cf-3fc2-4b08-b87d-dafcbe07f91e)

![image](https://github.com/user-attachments/assets/1bb67f7d-fab4-4e4b-947b-d023b3e074d6)

# 🚀 Features
* User Authentication: Secure login and registration system.
* Dynamic Menu: Interactive menu for users to browse and select items.
* Order Management: Efficient system for placing and tracking orders.
* Admin Dashboard: Comprehensive dashboard for managing menu items, orders, and restaurants.

# 🛠 Tech Stack
## Frontend
* HTML, CSS (Tailwind CSS), TypeScript
* React (for building user interfaces)
* Vite (for fast development and build tooling)

## Backend
* Node.js (Express for server-side operations)
* MongoDB (Database for storing application data)
* JWT (JSON Web Tokens for secure authentication)

# 📂 Directory Structure
```
github.com/codewithshek/mern-stack-intern-ey/
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── server/
│   ├── index.js
│   ├── .env
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── MenuItem.js
│   │   ├── Order.js
│   │   ├── Restaurant.js
│   │   └── User.js
│   └── routes/
│       ├── auth.js
│       ├── menu.js
│       ├── orders.js
│       └── restaurants.js
└── src/
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    ├── vite-env.d.ts
    ├── components/
    │   ├── AdminRoute.tsx
    │   ├── Footer.tsx
    │   ├── MenuItem.tsx
    │   ├── Navbar.tsx
    │   ├── ProtectedRoute.tsx
    │   └── RestaurantCard.tsx
    ├── context/
    │   ├── AuthContext.tsx
    │   └── CartContext.tsx
    ├── pages/
    │   ├── Cart.tsx
    │   ├── Checkout.tsx
    │   ├── Home.tsx
    │   ├── Login.tsx
    │   ├── MyOrders.tsx
    │   ├── NotFound.tsx
    │   ├── OrderDetails.tsx
    │   ├── OrderSuccess.tsx
    │   ├── Profile.tsx
    │   ├── Register.tsx
    │   ├── RestaurantDetails.tsx
    │   └── admin/
    │       ├── Dashboard.tsx
    │       ├── MenuItems.tsx
    │       ├── Orders.tsx
    │       └── Restaurants.tsx
    └── utils/
        └── axios.ts
```
# 📌 Setup & Installation
> 1. Clone the Repository

 ```sh
 git clone https://github.com/codewithshek/mern-stack-intern-ey.git
 cd mern-stack-intern-ey
 ```

> 2. Install Dependencies

 ```sh
 npm install
 ```

> 3. Run the Application

 ```sh

Start the frontend
 npm run dev

Start the backend
 npm run server
 ```

> 4. Access the Application
 Open your browser and navigate to http://localhost:5173/ to start using the application.


# 📜 Key Functions
* authenticateUser(email, password): Authenticates a user using their email and password.
* fetchMenuItems(): Retrieves the list of menu items from the database.
* placeOrder(orderDetails): Places a new order with the provided details.
* getOrderStatus(orderId): Fetches the current status of an order using its ID.

# 💡 Future Enhancements
<div style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
  <p>✅ Implement real-time order tracking.</p>
  <p>✅ Add support for multiple payment gateways.</p>
  <p>✅ Develop a mobile application for better accessibility.</p>
</div>

# 🤝 Contributing
Feel free to fork and submit pull requests. Any contributions are welcome!

----

Made with ❤️ by D ABHISHEK YADAV as part of the EY Internship

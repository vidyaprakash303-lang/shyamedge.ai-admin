Shyamedge Admin (Vite + React)

Run:
1) npm install
2) create .env (or use .env.example) with VITE_API_BASE=http://localhost:8080
3) npm run dev

Backend requirements:
- POST /api/auth/login -> { token }
- OAuth endpoints: /api/auth/google, /api/auth/facebook, /api/auth/apple
- CRUD: /api/content, /api/portfolio, /api/testimonials, /api/blog, /api/collab
- Upload: POST /api/upload -> { url: "/uploads/..." }

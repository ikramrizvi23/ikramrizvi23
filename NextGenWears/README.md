# NextGen Wears — Demo E‑commerce Frontend

Simple static demo of a garments store (shirts, trousers, hoodies, jackets).

Run locally
- Option A: open `NextGenWears/index.html` in your browser (works but some browsers block fetch from file://)
- Option B (recommended): serve with a simple static server:

```bash
# Python 3
cd NextGenWears
python -m http.server 8000
# then open http://localhost:8000
```

What’s included
- `index.html` — main page
- `styles.css` — simple responsive styles
- `app.js` — product rendering, cart, localStorage persistence
- `products.json` — sample product data

Next steps (suggestions)
- Add a backend API and database for inventory and orders
- Integrate payment gateway (Stripe/PayPal)
- Add authentication, admin product management
- Replace sample images with your own photography

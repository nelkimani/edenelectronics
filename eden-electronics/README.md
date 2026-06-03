# Eden Electronics 🛍️

> **Smart Living Starts Here** — Premium electronics & home goods in Chuka Town, Tharaka Nithi County, Kenya.

## Tech Stack

- **React 18** + **TypeScript 5** — component-based UI with full type safety
- **Vite 5** — lightning-fast dev server and optimised production builds
- **Tailwind CSS v3** — utility-first styling with custom design tokens
- **React Router v6** — client-side routing (Home, Shop, Detail, Cart, Contact, 404)
- **Lucide React** — consistent icon set
- **No backend required** — orders flow through WhatsApp

---

## Project Structure

```
eden-electronics/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.tsx         # Fixed top nav with cart badge
│   │   ├── Footer.tsx         # 3-column footer
│   │   ├── ProductCard.tsx    # Reusable product card
│   │   └── Toast.tsx          # Add-to-cart notification
│   ├── context/
│   │   └── CartContext.tsx    # Global cart state (add/remove/update/checkout)
│   ├── data/
│   │   └── products.ts        # All 16 products, 5 categories, constants
│   ├── pages/
│   │   ├── Home.tsx           # Hero slider + categories + featured + promo
│   │   ├── Shop.tsx           # Full grid with search & category filters
│   │   ├── ProductDetail.tsx  # Specs, qty picker, cart + WhatsApp actions
│   │   ├── Cart.tsx           # Line items, qty controls, WhatsApp checkout
│   │   ├── Contact.tsx        # 2 branch cards + WhatsApp CTA
│   │   └── NotFound.tsx       # 404 page
│   ├── types/
│   │   └── index.ts           # Product, CartItem, Category types
│   ├── App.tsx                # BrowserRouter + CartProvider + Routes
│   ├── main.tsx               # React entry point
│   └── index.css              # Tailwind + CSS custom properties + utilities
├── index.html                 # SEO meta tags, OG, Twitter Card, fonts
├── tailwind.config.ts         # Custom colours, fonts, animations
├── vite.config.ts
├── tsconfig.json
└── vercel.json                # SPA rewrite rule for Vercel
```

---

## Local Development

### 1. Install dependencies
```bash
npm install
```

### 2. Start dev server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

### 3. Build for production
```bash
npm run build
```
Output goes to `dist/` — ready to deploy.

### 4. Preview production build locally
```bash
npm run preview
```

---

## Deploying to Vercel (Recommended — Free)

### Option A: Via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option B: Via GitHub (easiest)
1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Vercel auto-detects Vite — click **Deploy**
5. Done! Your site is live

### Custom Domain
1. In Vercel dashboard → your project → **Settings → Domains**
2. Add `edenelectronics.co.ke`
3. Point your domain's DNS to Vercel nameservers (or add CNAME/A records as shown)
4. Vercel provisions SSL automatically — free HTTPS ✅

---

## Customisation

### Update products
Edit `src/data/products.ts` — add, remove or update any product in the `PRODUCTS` array.

### Update contact info
Edit the constants at the bottom of `src/data/products.ts`:
```ts
export const WHATSAPP_NUMBER = '254798928060'
export const EMAIL = 'info@edenelectronics.co.ke'
export const PHONE = '+254 798 928 060'
```

### Update brand colours
Edit `src/index.css` CSS custom properties:
```css
:root {
  --gold: hsl(24, 95%, 53%);
  --bg: hsl(220, 30%, 8%);
  /* ... */
}
```

### Add real product images
Replace the emoji in each product with an `<img>` tag in `src/components/ProductCard.tsx` and `src/pages/ProductDetail.tsx`. Add an `image` field to the `Product` type and data.

---

## WhatsApp Integration

Orders are sent as pre-formatted WhatsApp messages to `+254 798 928 060`.

**Cart checkout message format:**
```
Hello Eden Electronics! I would like to order:

• Samsung Galaxy A54 × 1 — KES 40,500
• JBL PartyBox 310 × 1 — KES 44,200

Total: KES 84,700

Please confirm availability and payment details. Thank you! 🙏
```

---

## SEO

- Title, meta description, canonical URL in `index.html`
- Open Graph tags for Facebook/WhatsApp link previews
- Twitter Card tags
- Semantic HTML throughout (h1, h2, nav, footer, etc.)

---

## Licence

© 2024 Eden Electronics, Chuka Town, Kenya. All rights reserved.

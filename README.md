# NileCart - E-commerce Web Application

A modern e-commerce web application built for South Sudan, featuring WhatsApp-based ordering and Supabase authentication.

## Features

- 🛒 **Product Catalog**: Browse products across Electronics, Groceries, Fashion, and Home categories
- 🛍️ **Shopping Cart**: Add/remove items with real-time cart updates
- 📱 **WhatsApp Integration**: Order via WhatsApp with automatic message generation
- 🔐 **User Authentication**: Secure signup/signin with Supabase
- 📍 **Delivery Address**: Collect delivery information for orders
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS and shadcn/ui
- 💰 **SSP Currency**: South Sudanese Pound pricing
- 👤 **User Profiles**: Account management and order history

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/amirphiladam2/NileCart.git
   cd NileCart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   Edit `.env.local` with your actual values:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_WHATSAPP_NUMBER=+211900000000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## Testing Signup

1. Go to `/auth` page
2. Click "Sign Up" tab
3. Enter email and password
4. Check your email for confirmation link
5. Click the link to confirm your account

## Deployment

### Vercel (Recommended)

1. **Connect GitHub to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your NileCart repository

2. **Set Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all variables from `env.example`

3. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://your-app.vercel.app`

### Other Platforms

This is a standard Vite + React application that can be deployed to:
- Netlify
- GitHub Pages
- AWS Amplify
- Any platform supporting Node.js

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
| `VITE_WHATSAPP_NUMBER` | WhatsApp number for orders | Yes |

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Build Tool**: Vite
- **Authentication**: Supabase Auth
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React Context providers
├── data/              # Sample data and utilities
├── hooks/             # Custom React hooks
├── integrations/      # External service integrations
├── lib/               # Utility functions
├── pages/             # Page components
└── assets/            # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues and questions:
- Create an issue on GitHub
- Check the [TROUBLESHOOTING.md](TROUBLESHOOTING.md) file

## License

This project is licensed under the MIT License.
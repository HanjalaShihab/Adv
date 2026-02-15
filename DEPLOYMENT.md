# Adv. Gazi Nazrul Islam Manik - Portfolio Website

A professional portfolio website for Adv. Gazi Nazrul Islam Manik, built with React, Express, and MongoDB.

## 🚀 Features

- Bengali language support
- Case management system
- Secure admin panel with JWT authentication
- MongoDB Atlas integration
- Responsive design
- Hidden admin access (4 clicks on "Cases" navbar)

## 📋 Prerequisites

- Node.js 18+ (for local development with MongoDB Atlas)
- MongoDB Atlas account
- npm or yarn

## 🛠️ Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Adv
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your credentials:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `ADMIN_USERNAME`: Your admin username
   - `ADMIN_PASSWORD`: Your admin password
   - `JWT_SECRET`: A random secret string

4. **Use Node.js 18 (recommended for MongoDB Atlas)**
   ```bash
   nvm use 18
   # or: nvm install 18 && nvm use 18
   ```

5. **Start the development servers**
   
   Terminal 1 - Frontend:
   ```bash
   npm run dev
   ```
   
   Terminal 2 - Backend:
   ```bash
   npm run server
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Admin Panel: Click "Cases" navbar 4 times

## 🌐 Deploying to Vercel

### Step 1: Prepare Your Repository

1. **Initialize Git (if not already)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub**
   ```bash
   gh repo create adv-portfolio --public --source=. --push
   # or manually create repo on GitHub and push
   ```

### Step 2: Deploy to Vercel

1. **Go to [Vercel](https://vercel.com)**
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Add Environment Variables** in Vercel dashboard:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
   MONGO_DB_NAME=advPortfolio
   ADMIN_USERNAME=your_username
   ADMIN_PASSWORD=your_password
   JWT_SECRET=your_secret_key
   NODE_ENV=production
   ```

6. **Deploy!**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Step 3: MongoDB Atlas Configuration

1. **Whitelist Vercel IPs** in MongoDB Atlas:
   - Go to Network Access
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add Vercel's specific IP ranges

2. **Test the deployment**:
   - Visit your Vercel URL
   - Click "Cases" 4 times to access admin
   - Login with your credentials
   - Add/edit cases

## 🔒 Admin Access

To access the admin panel:
1. Navigate to the website
2. Click on "Cases" in the navigation bar 4 times rapidly
3. You'll be redirected to the admin login page
4. Login with your credentials

## 📁 Project Structure

```
Adv/
├── src/
│   ├── components/     # React components (Layout, etc.)
│   ├── pages/          # Page components (Home, Projects, Admin, etc.)
│   ├── data/           # Fallback data
│   ├── api.js          # API configuration
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── server.js           # Express backend server
├── vercel.json         # Vercel deployment config
├── .env                # Environment variables (not committed)
├── .env.example        # Example environment variables
└── package.json        # Dependencies and scripts
```

## 🧪 API Endpoints

- `POST /api/login` - Admin authentication
- `GET /api/cases` - Get all cases (public)
- `POST /api/cases` - Create new case (authenticated)
- `PUT /api/cases/:id` - Update case (authenticated)
- `DELETE /api/cases/:id` - Delete case (authenticated)

## 🔧 Troubleshooting

### MongoDB Atlas Connection Issues (Local)

If you see SSL/TLS errors locally:
1. Use Node.js 18: `nvm use 18`
2. The app automatically relaxes TLS for local development
3. Alternatively, add data via MongoDB Atlas web interface

### Build Errors on Vercel

- Check that all environment variables are set
- Verify MongoDB connection string is correct
- Check Vercel build logs for specific errors

## 📝 License

Private project for Adv. Gazi Nazrul Islam Manik

## 👨‍💻 Developer

Built with ❤️ using React, Express, MongoDB, and Vite

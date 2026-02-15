import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import jwt from 'jsonwebtoken'
import { MongoClient, ObjectId } from 'mongodb'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173'
const jwtSecret = process.env.JWT_SECRET || 'change-this-secret'
const adminUsername = process.env.ADMIN_USERNAME || 'manik12345'
const adminPassword = process.env.ADMIN_PASSWORD || 'admin12345'
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://advmanik:advmanik@cluster0.f5iygty.mongodb.net/?retryWrites=true&w=majority'
const dbName = process.env.MONGO_DB_NAME || 'advPortfolio'

app.use(cors({ origin: corsOrigin }))
app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let db
let casesCollection

// Function to connect to MongoDB Atlas
async function connectToMongoDB() {
  try {
    const hasAtlasUri = mongoUri && mongoUri.includes('mongodb+srv://')
    
    if (!hasAtlasUri) {
      throw new Error('No MongoDB Atlas URI provided. Please check MONGO_URI in .env')
    }
    
    console.log('🔗 Connecting to MongoDB Atlas...')
    console.log('   Database:', dbName)
    console.log('   Environment:', process.env.NODE_ENV || 'development')
    
    // Connection options
    const clientOptions = {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    }
    
    // For local development: use relaxed TLS options to work around OpenSSL issues
    const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1'
    if (!isProduction) {
      console.log('   [DEV] Using relaxed TLS settings for local development')
      clientOptions.tlsAllowInvalidCertificates = true
      clientOptions.tlsAllowInvalidHostnames = true
      clientOptions.tls = true
    }
    
    const client = new MongoClient(mongoUri, clientOptions)
    await client.connect()
    
    console.log('✓ Connected to MongoDB Atlas successfully')
    
    db = client.db(dbName)
    casesCollection = db.collection('cases')
    
    // Test the connection
    await casesCollection.countDocuments()
    console.log('✓ Database verified and ready')
    
    return client
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error.message)
    console.error('   Please check:')
    console.error('   1. MONGO_URI is correct in .env')
    console.error('   2. MongoDB Atlas allows connections from your IP')
    console.error('   3. Database user credentials are valid')
    process.exit(1)
  }
}

await connectToMongoDB()

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const payload = jwt.verify(token, jwtSecret)
    req.user = payload
    return next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {}

  if (username !== adminUsername || password !== adminPassword) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = jwt.sign({ username }, jwtSecret, { expiresIn: '6h' })
  return res.json({ token })
})

app.get('/api/cases', async (req, res) => {
  try {
    const items = await casesCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray()
    const serialized = items.map((item) => ({
      id: item._id.toString(),
      title: item.title,
      category: item.category,
      summary: item.summary,
      outcome: item.outcome,
      createdAt: item.createdAt,
    }))
    return res.json(serialized)
  } catch (error) {
    return res.status(500).json({ message: 'Database error' })
  }
})

app.post('/api/cases', authenticate, async (req, res) => {
  const { title, category, summary, outcome } = req.body || {}

  if (!title || !category || !summary || !outcome) {
    return res.status(400).json({ message: 'Missing fields' })
  }

  try {
    const newCase = {
      title,
      category,
      summary,
      outcome,
      createdAt: new Date().toISOString(),
    }
    const result = await casesCollection.insertOne(newCase)
    const item = {
      id: result.insertedId.toString(),
      ...newCase,
    }
    return res.status(201).json(item)
  } catch (error) {
    return res.status(500).json({ message: 'Database error' })
  }
})

app.put('/api/cases/:id', authenticate, async (req, res) => {
  const { id } = req.params
  const { title, category, summary, outcome } = req.body || {}

  if (!title || !category || !summary || !outcome) {
    return res.status(400).json({ message: 'Missing fields' })
  }

  try {
    const updatedCase = {
      title,
      category,
      summary,
      outcome,
    }
    
    const result = await casesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedCase }
    )
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Not found' })
    }
    
    const item = await casesCollection.findOne({ _id: new ObjectId(id) })
    const serialized = {
      id: item._id.toString(),
      title: item.title,
      category: item.category,
      summary: item.summary,
      outcome: item.outcome,
      createdAt: item.createdAt,
    }
    
    return res.json(serialized)
  } catch (error) {
    return res.status(500).json({ message: 'Database error' })
  }
})

app.delete('/api/cases/:id', authenticate, async (req, res) => {
  const { id } = req.params
  
  try {
    const result = await casesCollection.deleteOne({ _id: new ObjectId(id) })
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Not found' })
    }
    return res.json({ success: true })
  } catch (error) {
    return res.status(404).json({ message: 'Not found' })
  }
})

// Serve static files from dist folder
const distPath = path.join(__dirname, 'dist')
app.use(express.static(distPath, {
  maxAge: '1d',
  etag: false
}))

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  // Don't serve index.html for API routes (they would have been handled above)
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(distPath, 'index.html'), (err) => {
      if (err) {
        res.status(404).json({ message: 'Not found' })
      }
    })
  }
})

// Start server for local development (when run directly with node)
const server = app.listen(port, () => {
  console.log(`✓ Server running on port ${port}`)
})

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n⚠ Shutting down gracefully...')
  server.close()
  process.exit(0)
})

// Export for Vercel serverless
export default app

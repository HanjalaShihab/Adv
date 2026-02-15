// Run this script on a system with compatible OpenSSL 
// or use Node v18: nvm use 18 && node seed-atlas.js

import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const atlasUri = process.env.MONGO_URI
const dbName = process.env.MONGO_DB_NAME || 'advPortfolio'

// Sample cases to seed
const sampleCases = [
  {
    title: "সিভিল মামলা - সম্পত্তি বিরোধ",
    category: "সিভিল",
    summary: "জমি সংক্রান্ত একটি জটিল মামলা যেখানে পারিবারিক সম্পত্তির অধিকার নিয়ে বিরোধ ছিল।",
    outcome: "মক্কেল বিজয়ী হয়েছেন এবং সম্পত্তির সম্পূর্ণ অধিকার পেয়েছেন।",
    createdAt: new Date().toISOString()
  },
  {
    title: "ফৌজদারি মামলা - মিথ্যা অভিযোগ",
    category: "ফৌজদারি",
    summary: "একটি মিথ্যা অভিযোগের বিরুদ্ধে সফল প্রতিরক্ষা।",
    outcome: "মক্কেল সম্পূর্ণ খালাস পেয়েছেন এবং ক্ষতিপূরণ প্রদান করা হয়েছে।",
    createdAt: new Date().toISOString()
  }
]

async function seedData() {
  try {
    console.log('Connecting to MongoDB Atlas...')
    const client = new MongoClient(atlasUri)
    await client.connect()
    console.log('✓ Connected to Atlas')
    
    const db = client.db(dbName)
    const collection = db.collection('cases')
    
    // Check existing count
    const count = await collection.countDocuments()
    console.log(`Current cases in database: ${count}`)
    
    // Insert sample data
    console.log('Inserting sample cases...')
    const result = await collection.insertMany(sampleCases)
    console.log(`✓ Inserted ${result.insertedCount} cases`)
    
    // Show all cases
    const cases = await collection.find({}).toArray()
    console.log('\nAll cases in database:')
    cases.forEach((c, i) => {
      console.log(`${i + 1}. ${c.title} (${c.category})`)
    })
    
    await client.close()
    console.log('\n✓ Done!')
  } catch (error) {
    console.error('✗ Error:', error.message)
    process.exit(1)
  }
}

seedData()

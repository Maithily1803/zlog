import mongoose from 'mongoose'

let isConnected = false

async function connectDB() {
  if (isConnected) return

  await mongoose.connect(process.env.MONGODB_URI)
  isConnected = true
}

export default connectDB
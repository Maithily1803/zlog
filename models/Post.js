import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: 'Admin' },
  tags: [String],
  coverImage: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Post || mongoose.model('Post', PostSchema)
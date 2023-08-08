const mongoose = require('mongoose')
// import mongoose from 'mongoose'
const connectDB = async () => {
  try {
    // mongoose.set('strictQuery', true);
    const conn = await mongoose.connect('mongodb+srv://baigfaraz000:000@todo.k0azjhf.mongodb.net/TodoTasks?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log('MongoDB connected you are good to GO!')
  } catch (error) {
    console.error(`Error:${error.message}`)                        
    process.exit(1)
  }
}

module.exports = connectDB

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');


dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', // Next.js URL
  credentials: true
}));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

app.use('/api', authRoutes);


// const io = require('socket.io')(server, { cors: { origin: 'http://localhost:3000', credentials: true } })

// io.on('connection', socket => {
//   console.log('User connected')
//   socket.on('message', (msg) => {
//     io.emit('message', msg)
//   })
// })


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

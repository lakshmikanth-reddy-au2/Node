const dotenv = require('dotenv');
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const chatsRoutes = require('./routes/chatsRoutes');
const messageRoutes = require('./routes/messagesRoute');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config({ path: './env'});

connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send({
        message: 'Hello'
    })
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/chat', chatsRoutes);
app.use('/messages', messageRoutes)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
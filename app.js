require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./src/routers/auth');
const userRoutes = require('./src/routers/userRouter');
const { errorHandler } = require('./middleware/errorhandler');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

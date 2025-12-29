const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Routes
app.use('/api', require('./routes/rootRoute'));

// MongoDB Connection
mongoose
    .connect('mongodb+srv://gopisingh8741_db_user:feYo5avHsUyWh1vi@cluster0.lrwuzif.mongodb.net/live_db')
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

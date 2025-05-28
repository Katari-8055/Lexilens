import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongoDB.js';
import userRouter from './routes/userRoute.js';
import imageRouter from './routes/imageRoute.js';

const PORT = process.env.PORT || 3000;



const app = express();



//MiddleWares----------------------------------------------

app.use(express.json());
app.use(cors());

//MongoDb connection--------------------------------
connectDB();

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// Routes -------------------------------------------------
app.use('/api/users',userRouter);
app.use('/api/images', imageRouter);


app.listen(PORT, () => {
    console.log('Backend server is running on http://localhost:3000');
});
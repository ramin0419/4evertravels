import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import tourRoute from '../backend/routes/tours.js'
import userRoute from '../backend/routes/users.js'
import authRoute from '../backend/routes/auth.js'
import reviewRoute from '../backend/routes/reviews.js'
import bookingRoute from '../backend/routes/bookings.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 8000
const corsOption = {
     origin : true,
     credentials: true
}

//database connection
mongoose.set("strictQuery", false);
const connect = async() => {
     try {
          await mongoose.connect(process.env.MONGO_URI,{
               useNewUrlParser : true,
               useUnifiedTopology : true,
          });
          console.log('MongoDB database connected');
     } catch (error) {
          console.log('MongoDB database connection failed');
     }
}

//middleware
app.use(express.json());
app.use(cors(corsOption));
app.use(cookieParser());
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/tours', tourRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/review', reviewRoute)
app.use('/api/v1/booking', bookingRoute)

app.listen(port, () =>{
     connect();
     console.log('server listening on port', port);
})
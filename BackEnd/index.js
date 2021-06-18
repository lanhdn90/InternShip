import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import postRoutes from './routes/posts.js';

const app = express();
app.use(cookieParser());

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use(cors());
//app.use router phai o duoi cors
app.use('/post', postRoutes);

let number = 0
var test = setInterval(()=>{number++; console.log(number)},5000);

 

const CONNECTION_URL = 'mongodb://localhost/test_my_database';
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true  })
.then(()=>app.listen(PORT, () => { console.log("Server started on http://localhost:" + PORT) }))
.catch((err)=>{console.log(err.message)});

mongoose.set('useFindAndModify', false);


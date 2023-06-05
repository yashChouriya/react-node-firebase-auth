const express = require('express');
const cors=require('cors');
const userRoute =require('./routes/userRoutes.js');
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({
    exposedHeaders: '*'
  }));
app.use('/signup',userRoute);


const port=process.env.PORT || 8001;
app.listen(port,()=>console.log(`connected to port ${port}`));
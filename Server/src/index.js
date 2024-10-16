const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
module.exports = app;
const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.routes');
app.get("/",(req,res)=>{
    return res.status(200).json({message:"testing api"})

});
app.use('/auth',authRouter);
app.use('/user',userRouter);
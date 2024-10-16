const { connect } = require("mongoose");
const app=require(".");

const PORT=3000;
app.listen(PORT,()=>{
    connectDb();
    console.log('Server is running on http://localhost:3000',PORT);
})

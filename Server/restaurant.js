  const dotenv=require('dotenv');
 const express=require('express');
 const mongoose=require('mongoose');
 const app=express();
 const managerRoute=require('./Routers/managerRoute')
 const chefRoute = require('./Routers/chefRoute');
 const receptionistRoute = require('./Routers/receptionistRoute');
 const deliveryRoute = require('./Routers/deliveryRoute');
 const clientRoute = require("./Routers/clientRoute");
 const homePageRoute = require('./Routers/homePageRoute');
 const cors = require('cors');
app.use(express.json()); // for JSON requests
app.use(express.urlencoded({ extended: true })); // for form requests
dotenv.config();

// Enable CORS for frontend dev server
app.use(cors({ origin: true, credentials: true }));

 

mongoose.connect(process.env.MONGO_URL);
  

 
// first page should appear for all users to decision where will you go 
app.use("/", homePageRoute);
 
app.use('/chef',chefRoute);

app.use('/manager',managerRoute);

app.use('/receptionist', receptionistRoute);

app.use('/delivery',deliveryRoute);

app.use("/client", clientRoute);





 app.listen(3000, ()=>{
    console.log("server is running on http://localhost:3000");  
 })
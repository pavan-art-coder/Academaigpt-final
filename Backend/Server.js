


const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const userRoutes=require('./routes/authroutes')
const documentRoutes=require('./routes/documentroutes') 
const chatRoutes=require('./routes/chatroutes')
const toolrouter=require('./routes/toolrouter')
const config=require('./config')   



const app=express()
const PORT=config.PORT|| 5000
const connectDB=require('./database.js/db')
const admin = require("firebase-admin");

const MONGO_URI=config.mongoUri


const corsOptions = {
    origin: 'https://academaigpt-final-ojbx.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(bodyParser.json())
app.use('/api/auth',userRoutes)
app.use('/api/documents',documentRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/tools',toolrouter)



const serviceAccount = JSON.parse(config.firebaseServiceAccountKey);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.get('/',(req,res)=>{
    res.send('Welcome to AcademiaGPT Backend Server')
})


app.listen(PORT,async()=>{
    try{ 
        await connectDB(MONGO_URI)
        console.log(`Server is running on port ${PORT}`)
        
    }catch(error){
        console.log('Error connecting to Server:',error)
    }
});

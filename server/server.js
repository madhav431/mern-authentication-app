const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const user = require('./model');
const jwt = require('jsonwebtoken');
const middleware = require('./middleware');

const app = express();
app.use(express.json());
app.use(cors({origin:"*"}));
mongoose.connect('mongodb+srv://<user>:<password>@cluster0.eqqo6ry.mongodb.net/?retryWrites=true&w=majority').then(
    ()=>console.log('DB connected..')
)


app.get('/',(req,res)=>{
    res.send('hello world');
});

app.post('/register',async (req,res)=>{
    
    try{
        const {name,email,phone,password} = req.body;
        const exist = await user.findOne({email});
        if(exist){
            return res.status(400).send('user already exist');
        }
        const newUser = new user({
            name,email,phone,password
        });
        await newUser.save();
        return res.status(200).send('user registered succesfully');
    }
    catch(err){
        res.status(500).send('Server error');
        console.log(err);
    }
});

app.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body;
        const exist = await user.findOne({email});
        if(!exist){
            return res.status(400).send('Invalid email');
        }
        if(password!==exist.password){
            return res.status(400).send('Invalid password');
        }
        let payload = {
            user : {
                id: exist.id
            }
        }
        jwt.sign(payload,'jwtSecret',{expiresIn:3600000},
            (err,token)=>{
                if(err) throw err;
                return res.json({token});
            }
        )
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server error');
    }
});

app.get('/myprofile',middleware,async(req,res)=>{
    try{
        const exist = await user.findById(req.user.id);
        if(!exist){
            return res.status(400).send('User not found');
        }
        return await res.status(200).json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('server error');
    }
})

app.listen(5000,()=>console.log('Server is Running..'));
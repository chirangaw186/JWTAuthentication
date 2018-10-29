const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req,res) => {
    res.json({
        message: 'Welcome to the api'
    });
});

app.post('/api/posts', verifyToken ,(req,res)=>{

    jwt.verify(req.token, 'secretkey', (err,authData)=>{
        if(err){
            //  res.sendStatus(403);
            console.log('error');
         
        } else{
            res.json({
                message:'Post created!',
                authData
            });
        }

    });

    
});

app.post('/api/login',(req,res)=>{
    //mock user
    const user = {
        id: 1,
        username: 'brad',
        email: 'brad@gmail.com'
    }
    
    jwt.sign({user},'secretkey',{ expiresIn: '30s' }, (err,token)=>{
        res.json({ 
            token
        })
    });
});

//format token
//Authorization :Bearer<access_token>

function verifyToken (req,res,next ){
    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefined

    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        req.token = bearerToken;

        next();

    }else{
         res.sendStatus(403);
       // console.log('error in verify token');
    }

}

app.listen(5000,()=>console.log('Server started on port 5000'));    
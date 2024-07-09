const User = require("../models/user.model")
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const  oauth2  = require("../oauth2"); 
const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');

const CLIENT_ID = oauth2.client_id; 
const CLIENT_SECRET = oauth2.client_secret; 
const REDIRECT_URI = oauth2.redict_uril; 
const REFRESH_TOKEN = oauth2.refreshToken; 

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'your_email@gmail.com',
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
    //   accessToken: oAuth2Client.getAccessToken(),
    },
  });

// This is a post request 
exports.sendCodes = async(req, res) =>{
    const {email} = req.body; 
    const verificationCode = Math.floor(100000 + Math.random()*900000).toString(); 

    // save the user verification code to the db
    try{
        const user = await User.findOneAndUpdate(
            {email},
            {verificationCode}, 
            {new:true}
        );
        if (!user){
            return res.status(404).json({error: 'User not found'}); 
        }
        // Send verification code to the user via email

        const mailOptions = {
            from: 'izabayop@carleton.edu',
            to: email, 
            Subject: "CarlParty Verification Code", 
            text: `Your verification code is: ${verificationCode}`,
        }; 
        await transporter.sendMail (mailOptions); 

        res.status(200).json({message:'Verification Code Sent with Success'})
    } catch(error){
        console.error(error); 
        res.status(500).json({error: 'Server Error: Could not send you email'})
    }
}; 

// this is also a post request 
exports.register = async(req, res) =>{
    console.log("email sent in controllers", req.body)
    const {email} = req.body; 
    try {
        let user = await User.findOne ({ email }); 
        if (user){
            return res.status(200).json ({message: "user exists"}); 
        }
        //create new user ... appently we never go this far
        user = new User ({
            email, 
        })
        await user.save(); 
        res.status (200).json ({message: "User created with success"});
    } catch (error) {
        console.error(error); 
        res.status(500).json({error: "server error: could not create user"})
    }

}; 

// also a post request 
exports.login = async (req, res) => {
    console.log("trying to log in ")
    const {email, password} = req.body; 
    try {
        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({error: "User not found"})
        } 
        if (!!user.isVerified){
            return res.status(400).json({error: "user not verified"})
        }
        // Create and return JWT token
        const payload = {
        user: {
          id: user.id,
            },
        };
  
        jwt.sign(payload, 'jwtSecret', { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.status(200).json({ token });
        });
    } catch(error){
        console.error (error); 
        res.status(500).json({error: "Server error: Could not login User"})
    }
}; 

// also a post request
exports.verify = async (req, res) =>{
    const {email, verificationCode} = req.body; 

    try{
        const user = await User.findOne ({email, verificationCode})
        if (!User){
            return res.status(404).json({ error: 'Invalid verification code' });
        }
        // Update user to mark as verified
        user.isVerified = true;
        user.verificationCode = null;
        await user.save();
        res.status(200).json({ message: 'User verified successfully' });

    } catch(error){
        console.error(error); 
        res.status(500).json({error:"Server error: Unable to verify user"})
    }
}

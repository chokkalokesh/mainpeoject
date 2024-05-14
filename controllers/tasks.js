const nodemailer = require('nodemailer');
const {DetailSchema , forgotpasswordSchema} = require("../models/tasks")
const bcrypt = require('bcrypt');
let temp = 0

const getusername= async(req,res)=>{
    const {email} = req.body;

    try {
        //console.log(email)
        const user = await DetailSchema.findOne({email});
        // console.log(user)
        return res.status(200).json({getusername:user.username})
    } catch (error) {
        return res.status(200).json({msg:"error in finding the username with the emanil" ,code:404})
    }
}

const checkUsername = async(req,res)=>{
    const {username} = req.body
    try {
        const existingUser = await DetailSchema.findOne({ username });
        if(existingUser){
            return res.status(200).json({ msg: 'exits', reason: 'not valid' });
        }
        return res.status(200).json({ msg: 'Nexits', reason: 'Valid username', getusername:username });
    } catch (error) {
        console.error('Error checking username availability:', error);
        res.status(500).json({ message: 'An error occurred while checking username availability' });
    }
}


const checkEmail = async(req,res)=>{
    const {email} = req.body
    try {
        const existingUser = await DetailSchema.findOne({ email });
        if(existingUser){
            return res.status(200).json({ msg: 'exits', reason: 'not valid' });
        }
        return res.status(200).json({ msg: 'Nexits', reason: 'Valid username' });
    } catch (error) {
        console.error('Error checking username availability:', error);
        res.status(500).json({ message: 'An error occurred while checking username availability' });
    }
}

const gettask = async (req, res) => {
    try {
        const { name, password} = req.body;

        const detail = await DetailSchema.findOne({ email: name });
        if (!detail) {
            return res.status(200).json({ msg: 'Username_notfound', reason: ' user Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, detail.password);

        if (isPasswordValid) {
            return res.status(200).json({ msg: 'LOGGED IN' });
        } 
        else {
            return res.status(200).json({ msg: 'Password_notfound', reason: 'Invalid credentials' });}

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
}

const createtask = async(req,res)=>{
    const {username,email,password,otp,data}= req.body
    if (parseInt(data, 10)===data){
        try {

            const existingUser = await DetailSchema.findOne({ username });

            if (existingUser) {
                return res.status(200).json({ msg: 'User already exists', reason: 'Please choose a different Email' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const detail = await DetailSchema.create({ username,email, password: hashedPassword,coins:0 });

            const newUser = new forgotpasswordSchema({ email, otp:0 });
            await newUser.save();

            //await forgotpasswordSchema.create({ email, otp });

            if(!detail){
                res.status(405).json({detail})
            }
            res.status(200).json({detail});
        } catch (error) {
            res.status(404).send("Error occured")
        }
    }
    else{
        console.log(data,otp)
    }
}


const sendotp=async(req,res)=>{
    const { email } = req.body;
    try {
        
        // Generate a random 6-digit OTP
        otp = Math.floor(100000 + Math.random() * 900000);
        temp=otp;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'theonlineman0718@gmail.com', 
                pass: 'jqea ihuv garb qxeu' 
            }
        });

        const mailOptions = {
            from: 'theonlineman0718@gmail.com',
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP for verification is: ${otp}`
        };
        try {
            await transporter.sendMail(mailOptions);
            return res.status(200).json({ msg: 'OTP sent successfully' ,dataa:temp});
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ msg: 'Error sending OTP' });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
}

const getallusersinfo = async(req,res)=>{
    try {
        const allusers = await DetailSchema.find()
        // console.log(user)
        //console.log("backend admin")
        //console.log(allusers)
        return res.status(200).json({msg:allusers})
    } catch (error) {
        return res.status(200).json({msg:"error in finding all the usernames admin" ,code:404})
    }
}


const forgotpasswordbutton=async(req,res)=>{
    const { tempmail ,tempotp } = req.body;
    console.log(tempmail, tempotp)
    try {
        const existingUser = await forgotpasswordSchema.findOne({ email:tempmail });
        if (existingUser) {
            if(tempotp === existingUser.otp){
                return res.status(200).json({msg:"otp matched" ,statuscode:true})
            }
            else{
                return res.status(200).json({msg:"otp not matched" ,statuscode:false})
            }
        } else {
            return res.status(500).json({ msg: 'No user Found', status:false});
        }

    } catch (error) {
        
    }
}

const sendforgototp=async(req,res)=>{
    const { email } = req.body;
    try {
        
        // Generate a random 6-digit OTP
        otp = Math.floor(100000 + Math.random() * 900000);
        temp=otp;
        const existingUser = await forgotpasswordSchema.findOne({ email:email });
        if (existingUser) {
            // update the otp field
            existingUser.otp = otp;

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'theonlineman0718@gmail.com', 
                    pass: 'jqea ihuv garb qxeu' 
                }
            });
        
            const mailOptions = {
                from: 'theonlineman0718@gmail.com',
                to: email,
                subject: 'OTP Verification',
                text: `Your OTP for verification is: ${otp}`
            };
            try {
                await transporter.sendMail(mailOptions);
                await existingUser.save();
                
                return res.status(200).json({ msg: 'OTP sent successfully' ,status :true});
            } catch (error) {
                console.error(error.message);
                return res.status(500).json({ msg: 'Error sending OTP' });
            }
        }
        else{
            return res.status(500).json({ msg: 'No user Found in forgot password', status:false});
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
}

const updatepassword=async(req,res)=>{
    const { urlusername,temppassword } = req.body;
    //console.log(urlusername,temppassword)
    try {
        const existingUser = await DetailSchema.findOne({ email:urlusername });
        if (existingUser) {
            const hashedPassword = await bcrypt.hash(temppassword, 10);
            existingUser.password = hashedPassword;
            await existingUser.save();
            res.status(200).send({msg:"Password updated successfully." , status:true});
            //update the password
        } else {
            //returm
            res.status(200).send({msg:"no user found", status:false});
        }
        
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    gettask,
    createtask,
    sendotp,
    checkUsername,
    checkEmail,
    getusername,
    getallusersinfo,
    sendforgototp,
    forgotpasswordbutton,
    updatepassword
}
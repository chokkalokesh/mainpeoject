const express = require('express')
const router = express.Router()
const {gettask , 
    createtask, 
    sendotp,
    checkUsername, 
    checkEmail, 
    getusername ,
    getallusersinfo ,
    sendforgototp ,
    forgotpasswordbutton,
    updatepassword} = require("../controllers/tasks")

router.route('/login').post(gettask)
router.route('/signup').post(createtask)
router.route('/verify-otp').post(sendotp)
router.route('/checkUsername').post(checkUsername)
router.route('/checkEmail').post(checkEmail)
router.route('/getusername').post(getusername)
router.route('/getallusersinfo').post(getallusersinfo)
router.route('/sendforgototp').post(sendforgototp)
router.route('/forgotpassword').post(forgotpasswordbutton)
router.route('/updatepassword').post(updatepassword)


module.exports = router
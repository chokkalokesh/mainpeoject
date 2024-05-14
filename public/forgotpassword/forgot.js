document.addEventListener('DOMContentLoaded',()=>{

    const email = document.getElementById('email')
    const otp = document.getElementById('otp')
    const text = document.getElementById('p_wrongusername')

    document.getElementById('sendotp').addEventListener('click',async (e)=>{
        e.preventDefault()
        try {
            const response= await axios.post('http://localhost:5501/api/v1/details/sendforgototp', {
                "email": email.value
            });
            if (response.status === 200) {
                    temp=response.data.dataa
                    text.innerText = "OTP SEND";
                    text.style.color = 'green';
                }
        } catch (error) {
            console.log("otpbutton errorrrrr in frontend forgot password")
            console.log(error);
            text.innerText = "Error sending OTP";
            text.style.color = "red";
        }
    })

    document.getElementById('checkotp').addEventListener('click',async(e)=>{
        e.preventDefault()
        // console.log(email.value)
        // console.log( typeof otp.value)
        // console.log((otp.value).toString().length);
        const tempmail = email.value
        const tempotp =Number(otp.value)
        console.log(tempmail,tempotp);

        if ((otp.value).toString().length ===6) {
            try {
                const response = await axios.post('http://localhost:5501/api/v1/details/forgotpassword', { tempmail, tempotp });
                console.log(response.data)
                if(response.data.statuscode){
                    text.innerText='Verification done'
                    text.style.color = 'green';


                    const newpage = "./resetpassword/reset.html"
                    // C:\Users\chokk\OneDrive\Desktop\axios\public\notificatiofolder\notif.html
                    let fullurl = newpage+'?username='+encodeURIComponent(tempmail)
                    window.location.href =fullurl 
                    //window.location.href = "./resetpassword/reset.html"
                }
                else{
                    text.innerText='Try again'
                    text.style.color = 'red';
                }
            } catch (error) {
                text.innerText='Error'
                text.style.color = 'red';
                console.log(error)
            }

        } else {
            text.innerText='Not a valid crediatials ,please check'
            text.style.color = 'red';
            //console.log("Email does not contain @gmail.com");
        }














        // if(length(otp.value) >5){
        //     console.log('valid')
        // }
        // try {
        //     const response = await axios.post('http://localhost:5501/api/v1/details/forgotpassword', {
        //          email.value, otp.value });

        // } catch (error) {
            
        // }
        

    })







})
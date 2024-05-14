document.addEventListener('DOMContentLoaded',()=>{
    
    const password1 = document.getElementById('password1')
    const password2 = document.getElementById('password2')
    const text = document.getElementById('p_wrongusername')
    const inputs = document.getElementsByName('input')
    
    document.getElementById('saveButton').addEventListener('click',async(e)=>{
        e.preventDefault()
        if(password1.value != password2.value){
            text.innerText='Passwords as not same'
            text.style.color = 'red';
        }
        else{
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const urlusername = urlParams.get('username');
            const temppassword = password1.value;
            console.log(urlusername)

            try {
                const response = await axios.post('http://localhost:5501/api/v1/details/updatepassword', { urlusername, temppassword });
                if(response.data.status){
                    window.location.href ='../../login.html'
                }
                else{
                    text.innerText='Error in uodating the passowrds'
                    text.style.color = 'red';

                }
            } catch (error) {
                console.log(error)
            }
        }
    })







})
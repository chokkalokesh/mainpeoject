document.addEventListener('DOMContentLoaded',async ()=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlusername = urlParams.get('username');
    
    document.getElementById('logo').addEventListener('click',()=>{
        const newpage = '../dashboard/dashboard.html'
        let fullurl = newpage+'?username='+encodeURIComponent(urlusername)
        window.location.href =fullurl 
    })

    document.getElementById('allProducts').addEventListener('click',()=>{
        const newpage = '../All-products/all.html'
        let fullurl = newpage+'?username='+encodeURIComponent(urlusername)
        window.location.href =fullurl
    })
    // myRepo

    document.getElementById('myRepo').addEventListener('click',()=>{
        const newpage = '../Myrepo/repo.html'
        let fullurl = newpage+'?username='+encodeURIComponent(urlusername)
        window.location.href =fullurl
    })
    document.getElementById('paymentGateway').addEventListener('click',()=>{
        const newpage = '../1_payment/demo.html'  
        let fullurl = newpage+'?username='+encodeURIComponent(urlusername)
        window.location.href =fullurl
    })

    document.getElementById('notificationbell').addEventListener('click',()=>{
        const newpage = '../notificationfolder/notif.html'
        // C:\Users\chokk\OneDrive\Desktop\axios\public\notificatiofolder\notif.html
        let fullurl = newpage+'?username='+encodeURIComponent(urlusername)
        window.location.href =fullurl 
    })











    const bidInput = document.getElementById("bid-amount");
    
    //left
    let right_img = document.getElementById("left-img");
    //middle
    let middle_product_name = document.getElementById("middle_product_name");
    const middle_product_description = document.getElementById("middle_product_description");
    //table-starting-price , table-present-price table-bidder
    const table_staring_price = document.getElementById("table-starting-price")
    const table_present_price = document.getElementById("table-present-price")
    const table_bidder = document.getElementById("table-bidder")
    //right
    const right_span_daysleft = document.getElementById("right-span-days");
    let right_auction_price = document.getElementById('right-auction-price');
    let right_bidding_price = document.getElementById('right-bidding-price');
    const right_bidding_updateprice = document.getElementById('right-bidding-update');
    let bidbutton = document.getElementById('bid')

    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const urlusername = urlParams.get('username');
    const url_product_id = urlParams.get('id')
    const getcoins = await axios.post('http://localhost:5501/api/v2/getcoins',{urlusername: urlusername});
  
  
      //console.log("checking email", getcoins.data.data)
      points.textContent = getcoins.data.data


   
    let productdetail = await axios.get('http://localhost:5501/api/v2/getproductdetail', {
        params: {
            productid: url_product_id
        }
    });
    function showTime(){

        let deadlineDate = new Date(productdetail.data.data.bid_end_date);
        let currentDate = new Date();
        const timeDifference = deadlineDate.getTime() - currentDate.getTime();
        const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hoursRemaining = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesRemaining = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const secondsRemaining = Math.floor((timeDifference % (1000 * 60)) / 1000);

        document.getElementById('MyClockDisplay').innerHTML = `${daysRemaining}d ${hoursRemaining}h ${minutesRemaining}m ${secondsRemaining}s`;
        setTimeout(showTime, 1000);

    }
    
    showTime();

    document.getElementById('incrementbutton').addEventListener('click',()=>{
        const currentAmount = parseInt(bidInput.value);
        bidInput.value = currentAmount + 5; // Increase the bid amount by 5
    })
    document.getElementById('decrementbutton').addEventListener('click',()=>{
        let price = parseInt(bidInput.value)-5
        if( price<= parseInt(right_bidding_price.textContent)){
            document.getElementById('decrementbutton').disabled=true
        }
        else{
            const currentAmount = parseInt(bidInput.value);
            bidInput.value = currentAmount - 5; // Increase the bid amount by 5
        }
    })

    
    
    


    try {
        let productdetail = await axios.get('http://localhost:5501/api/v2/getproductdetail' , {
          params: {
            productid: url_product_id
        }
        })
        middle_product_description.textContent= productdetail.data.data.description
        table_staring_price.textContent = productdetail.data.data.initial_price;
        table_present_price.textContent=productdetail.data.data.normal_price;
        //console.log(productdetail.data.data.userID)
        if(productdetail.data.data.userID=== 'something'){
            table_bidder.textContent = "-"
            //
            //console.log(productdetail.data.data.userID)
        }
        else{
            table_bidder.textContent= productdetail.data.data.userID
        }

        right_img.src  = productdetail.data.data.url; 
        middle_product_name.textContent = productdetail.data.data.name
        right_auction_price.textContent   = productdetail.data.data.initial_price;
        right_bidding_price.textContent  = productdetail.data.data.normal_price;
        bidInput.value= productdetail.data.data.normal_price + 10
        let  points = document.getElementById('points')
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const urlusername = urlParams.get('username');
        
        if (productdetail.data.data.userID === urlusername) {
            bidbutton.disabled = true;
        } 
        else if(parseInt(getcoins.data.data)<parseInt(productdetail.data.data.normal_price)){
            bidbutton.disabled = true;
            const p1 = document.createElement('p')
            const p2 = document.createElement('p')
            p1.className='msg'
            p2.className='msg'
            p1.innerText="You dont have enough coins to place the Bid . "
            p2.innerText="Please Make 'Payment', to add Coins"
            document.getElementById('right-card').appendChild(p1).appendChild(p2)
        }
        else {
            bidbutton.disabled = false;
            bidbutton.addEventListener('click',async(e)=>{
                e.preventDefault()
                const currentAmount = parseInt(bidInput.value);
                try {
                    const response = await axios.post('http://localhost:5501/api/v3/adduserProducts',{urlusername, url_product_id,currentAmount})
                    if(response.data.data === 'notfound'){
                        console.log("product is added")
                    }
                    if(response.data.data === 'found'){
                        console.log('updated');
                    }
                    bidbutton.disabled = true;
            
                } catch (error) {
                    console.log("eroor in sending the data")
                    console.log(error)
                }
            })
            
        }
        

    } catch (error) {
        console.log(error)
    }  
})


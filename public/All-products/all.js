document.addEventListener("DOMContentLoaded", async ()=>{
  let points = document.getElementById('points')
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const urlusername = urlParams.get('username');
  const getcoins = await axios.post('http://localhost:5501/api/v2/getcoins',{urlusername: urlusername});
  points.textContent = getcoins.data.data

  const notifNum = document.getElementById("notif-num")
  const notification = await axios.post('http://localhost:5501/api/v3/notificationProducts',{
    urlusername:urlusername
  })

  //console.log("count",notification.data.datacount)
  if (notification.data.msg === 'yes') {
    notifNum.textContent = notification.data.datacount;
  } else {
    notifNum.textContent = 0;
  }

    const productContainer = document.getElementById('product-container')
    
    // Array of product data (name, image URL, new price, old price)
    try {
      const leftproducts = await axios.get('http://localhost:5501/api/v2/dashboard');
      const products = leftproducts.data.data

      products.forEach(function(product) {
        var card = document.createElement("div");
        card.className = "card";
        var cardId = product._id;
        card.setAttribute("id", cardId);
    
        var img = document.createElement("img");
        img.src = product.url; 
        img.alt = product.name;
        img.style.width = "100%"; 
        img.style.height = "80%";
        img.style.objectFit="cover";
    
        var details = document.createElement("div");
        details.className = "details";
    
        var name = document.createElement("span");
        name.className = "name";
        name.textContent = product.name;
    
        var price = document.createElement("div");
        price.className = "price";
    
        var newPrice = document.createElement("span");
        newPrice.className = "new-price";
        newPrice.textContent = product.initial_price;
    
        var oldPrice = document.createElement("span");
        oldPrice.className = "old-price";
        oldPrice.textContent = product.normal_price;
    
        // Append elements to card
        details.appendChild(name);
        price.appendChild(newPrice);
        price.appendChild(oldPrice);
        details.appendChild(price);
        card.appendChild(img);
        card.appendChild(details);
        productContainer.appendChild(card);
    
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
        document.getElementById('notification').addEventListener('click',()=>{
          const newpage = '../notificationfolder/notif.html'
          let fullurl = newpage+'?username='+encodeURIComponent(urlusername)
          window.location.href =fullurl
        })
        
        

        card.addEventListener('click',()=>{
            const newpage = '../cards/card.html'
            let fullurl = newpage+'?username='+encodeURIComponent(urlusername)+'&id='+encodeURIComponent(cardId)
            window.location.href =fullurl
          })
      });
  
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const urlusername = urlParams.get('username');
  
      

      
  
  
      //console.log("checking email", getcoins.data.data)
      
  
    } catch (error) {
      console.log("error in All products");
      console.log(error)
    }
  });
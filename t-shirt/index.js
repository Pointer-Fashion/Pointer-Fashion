function onload() {
   var box = document.querySelector(".sample-dresses-child");
   const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]; 
      }
  };

   var dataprocess = async () => {
       var data = await fetch("https://raw.githubusercontent.com/Pointer-Fashion/json_file_store/refs/heads/main/json%20%20create/boys%20t-shirt.json");
       
       try {
           var datasplit = await data.json();

           shuffleArray(datasplit);
           datasplit.forEach(items => {
               box.innerHTML += `
                   <div class="dress">
                       <div class="dress-img">
                           <img src="${items.image}" alt="Dress Image">
                       </div>        
                       <div class="dress-details">
                           <table>
                               <tr>
                                   <td>Type : ${items.type}</td>
                               </tr>
                               <tr>
                                   <td>Size :
                                       <select>
                                           <option value="xl">XL</option>
                                           <option value="l">L</option>
                                           <option value="m">M</option>
                                           <option value="s">S</option>
                                       </select>
                                   </td>
                               </tr>
                               <tr>
                                   <td>Price : ${items.price}</td>
                               </tr>
                               <tr>
                                   <td><button>BUY</button></td>
                               </tr>
                           </table>
                       </div>                
                   </div>
               `;
           });

       } catch (err) {
           console.log(err);
       }
   };
   dataprocess();
}

onload();

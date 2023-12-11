


document.addEventListener('alpine:init', () =>{
    Alpine.data('menu', () => ({
        items: [
            { id: 1, name: 'Indomie Goreng Aceh', images: '1.jpeg', price: 4000},
            { id: 2, name: 'Indomie Goreng Ori', images: '2.jpeg', price: 4500},
            { id: 3, name: 'Indomie Goreng Rendang', images: '3.jpeg', price: 4000},
        ],
    }));
    

    Alpine.store('cart', {
        items: JSON.parse(localStorage.getItem("pesanan"))?JSON.parse(localStorage.getItem("pesanan")):[],
        total: JSON.parse(localStorage.getItem("total"))?JSON.parse(localStorage.getItem("total")):0,
        quantity: JSON.parse(localStorage.getItem("quantity"))?JSON.parse(localStorage.getItem("quantity")):0,
        add(newItem) {
            //cek apakah itemnya ada di cart atau kosong
            const cartItem = this.items.find((item) => item.id === newItem.id);
            $('#chekoutBtn').removeClass('disabled')
            $('#chekoutBtn').attr('href', 'pembayaran.html')


            //jika ga ada
            if(!cartItem) {
                this.items.push({...newItem, quantity: 1, total: newItem.price})
                this.quantity++;
                this.total += newItem.price;
               
                
            } else {

                //jika ada cek apakah itemnya sama atau beda dengan di cart
                this.items = this.items.map((item) => {
                    // jika beda
                    if(item.id !== newItem.id){
                        return item
                    } else {
                        //jika sama
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        // localStorage.setItem("pesanan", JSON.stringify(this.items))
                        // localStorage.setItem("total", JSON.stringify(this.total))
                        // localStorage.setItem("quantity", JSON.stringify(this.quantity))
                       

                        return item
                    }
                })
            }
            localStorage.setItem("pesanan", JSON.stringify(this.items))
            localStorage.setItem("total", JSON.stringify(this.total))
            localStorage.setItem("quantity", JSON.stringify(this.quantity))
           
        },

        remove(id) {
            const cartItem = this.items.find((item) => item.id === id);
            // alert(cartItem.quantity)
            // jika lebih dari 1
            if(cartItem.quantity > 1) {
        
                // cek 1 1

                this.items = this.items.map((item) => {
                    // jika bukan barang yang diklik

                    if(item.id !== id) {
                        return item
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        // localStorage.setItem("pesanan", JSON.stringify(this.items))
                        // localStorage.setItem("total", JSON.stringify(this.total))
                        // localStorage.setItem("quantity", JSON.stringify(this.quantity))
                        return item;
                        
                    }
                })
            } else if ( cartItem.quantity === 1){
                //jika ada 1
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
                $('#chekoutBtn').addClass('disabled')
                $('#chekoutBtn').attr('href', '#')
                $(`#${id}`).remove()
                // localStorage.setItem("pesanan", JSON.stringify(this.items))
                // localStorage.setItem("total", JSON.stringify(this.total))
                // localStorage.setItem("quantity", JSON.stringify(this.quantity))

            } 
            // else {
            //     if (!cartItem){
            //         $('#chekoutBtn').addClass('disabled')
            //         $('#chekoutBtn').attr('href', '#')
            
            //     } else {
            //         $('#chekoutBtn').removeClass('disabled')
            //         $('#chekoutBtn').attr('href', 'pembayaran.html')
                    
            //     }
            // }
            localStorage.setItem("pesanan", JSON.stringify(this.items))
            localStorage.setItem("total", JSON.stringify(this.total))
            localStorage.setItem("quantity", JSON.stringify(this.quantity))
        },
        
        // updateTotal(totals) {
        //     const totalItem = JSON.parse(localStorage.getItem("pesanan"))?JSON.parse(localStorage.getItem("pesanan")):[];
        //     totalItem = this.item.find((total) => total.total === totals.total);

        //     if(cartItem.total === 0){
        //         return totalItem
        //     }
        // },

        // chekout(cek) {
        //     const cartItem = this.items.find((item) => item.id === cek.id);
        //     if (!cartItem){
        //         $('#chekoutBtn').addClass('disabled')
        //         $('#chekoutBtn').attr('href', '#')

        //     } else {
        //         $('#chekoutBtn').removeClass('disabled')
        //         $('#chekoutBtn').attr('href', 'pembayaran.html')
                
        //     }
                
        // },
        
       
    });
})
;

// function cek() {
//     let items = JSON.parse(localStorage.getItem("pesanan"))?JSON.parse(localStorage.getItem("pesanan")):[]
//     $("td.profuct-quantity").find("span")
   
// };




// const chekoutButton = document.querySelector('.chekoutButton');
// chekoutButton.disabled = true;

// //chekout 
// const chek = document.querySelector('#');

// chek.addEventListener('keyup', function() {
//     const total = JSON.parse(localStorage.getItem("total"))?JSON.parse(localStorage.getItem("total")):0
//     if ( total !== 0) {
//         chekoutButton.classList.remove('disabled')
//     } else {
//         return false
//     };
//     chekoutButton.disabled = false;
//     chekoutButton.classList.remove('disabled');

// })

// koversi rupiah
const rupiah = (number) => {
    if (number <= 0) {
        number = 0
    }
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};







// function show_menu(){
//     let menu = new Array()
//     menu = JSON.parse(localStorage.getItem("pesanan"))
//     if (typeof menu !== 'undefined'){
//         // jQuery(`.data`).remove()
//         for (let i= 0; i < menu.length; i++){
//             jQuery('#cart3').append(
//                 ` 
//                 <tr id="`+i+`">
//                     <td class="product-thumbnail"><img  src="images/`+menu[i].images+`" :alt="item.name" ></td>
//                     <td class="product-name">`+menu[i].name+`</td>
//                     <td class="product-price"><span class="amount" >`+rupiah(menu[i].price)+`</span></td>
//                     <td class="product-quantity">
//                             <button id="remove" @click="$store.cart.remove(item.id)">&minus;</button>
//                             <span>`+menu[i].quantity+`</span>
//                             <button id="add" @click="$store.cart.add(item)">&plus;</button>
//                     </td>
//                     <td class="product-subtotal"><span class="amount" >`+rupiah(menu[i].total)+`</span></td>
//                 </tr>
//                 `
//             )
//         }

//     }
// }
// show_menu()

// $.getJSON('warung.json', function(data){
//     let menu = data.menu;
//     $.each(menu, function(i, data){
//         $('#menu').append(
//             `<div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
//                 <div class="product__item product__item-d"> 
//                     <div class="product__thumb fix"> 
//                         <div class="product-image w-img"> 
//                             <a href=""><img class="img-fluid" src="images/` + data.gambar + `" height="100%"  alt="product"></a>
//                         </div> 
//                     </div> 
//                     <div class="product__content-3">
//                             <h6><a href="">` + data.nama + `</a></h6>
//                         <div>
//                             <ul>
//                                 <li>` + data.deskripsi + `</li>
//                             </ul>
//                         </div>
//                         <div class="price mb-10">
//                             <span>` + data.harga + `</span>
//                         </div>
//                     </div>
//                     <div class="product__add-cart-s text-center">
//                         <button type="button" onclick="add_menu()" class="cart-btn d-flex mb-10 align-items-center justify-content-center w-100">Add to Cart</button>
//                     </div>
//                 </div>
//              </div>`)
//     });
// });

// let menu = new Array();
// menu = $.getJSON('warung.json', function(d){
//     localStorage.setItem("menu", JSON.stringify(d))
// })

// let menu = $getJSON('#menu').menu((data) => {
//     localStorage.setItem('menu', JSON.stringify(data))
// })
//  this.getJSON().subscribe(data => { let a = JSON.parse(localStorage.getItem('contacts')); 
//  localStorage.setItem('contacts', JSON.stringify(data)); 
//  localStorage.setItem('contactObject', JSON.stringify(this.contacts));
//   a.push(this.contacts) localStorage.setItem('contacts', JSON.stringify(a)); });


// function add_menu(){
//     let cart = JSON.parse(localStorage.getItem("menu", d))
//     alert('tambah data');
//         for (let i = 0; i < menu.length; i++){
//             jQuery('#cart').append(
//             `<tr id="`+i+`" class="objek">
//                 <td class="product-thumbnail"><img src="images/`+menu[d].gambar+`" alt=""></td>
//                 <td class="product-name">`+menu[d].nama+`</td>
//                 <td class="product-price"><span class="amount">` + menu[d].harga + `</span></td>
//                 <td class="product-quantity">
//                         <div class="cart-plus-minus"><input type="text" value="1"><div class="dec qtybutton">-</div><div class="inc qtybutton">+</div></div>
//                 </td>
//                 <td class="product-subtotal"><span class="amount">$130.00</span></td>
//                 <td class="product-remove"><a href="#"><i class="fa fa-times"></i></a></td>
//             </tr>`
//             )

//         }
    
// }
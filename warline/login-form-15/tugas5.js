
function register(){
    // ambil data dari form
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    
    let userarr = new Array();
    userarr = JSON.parse(localStorage.getItem("username"))?JSON.parse(localStorage.getItem("username")):[]
    if(userarr.some((v)=>{
        return v.username==username 
    })) {
        alert("data sudah ada")     
    } else{
        if (username != "" && password != ""){
            userarr.push({
        "username" : username,
        "password" : password
    })
    alert("berhasil daftar");
    localStorage.setItem("username", JSON.stringify(userarr));
    add_data()
        } else {
                alert("masukan data dengan benar")
    } 
    }
    
}

function add_data(){
    show_data()

    
}
// function show_data(){
//     alert('data akan di tampilkan')
//     let data = document.getElementById("add_data")
//     let tambah_data = JSON.parse(localStorage.getItem("username"))
//     for (let i = 0; i < tambah_data.length; i++) {
//         data.innerHTML += "<td><td>" + tambah_data[i].username + "<td><td>" + tambah_data[i].password + ;
//     }
    
// }


function show_data(){
	alert('data akan di tampilkan')
    let tambah_data = JSON.parse(localStorage.getItem("username"));
    if (typeof tambah_data !== 'undefined'){
        jQuery(`.data`).remove()
        for (let i= 0; i < tambah_data.length; i++){
            jQuery('#add_data').append(
                `<tr id="`+i+`" class="data">
                    <td></td>
                    <td>`+tambah_data[i].username+`</td>
                    <td>`+tambah_data[i].password+`</td>
                    <td><button onclick="hapus_data(`+i+`,'`+tambah_data[i].username+`')">Hapus Data</button></td>
                </tr>`)
        }
    }
}

function hapus_data(id, username){
	$(`#${id}`).remove()
    let userarr = JSON.parse(localStorage.getItem("username"))
    _.remove(userarr, {username: username});
    localStorage.setItem("username", JSON.stringify(userarr));
}


show_data()

// for (var i = 0; i < retrievedScores.length; i++) {
//     hst.innerHTML += "<tr><td>" + retrievedScores[i].name + "</td><td>" + retrievedScores[i].score + "</td></tr>";
// }

// function getData() {
//     return JSON.parse(localStorage.getItem('username') || "[]");
// }
// function show() {
//     const tr = document.querySelector('#add_data tr:last-child');
//     const tbody = tr.parentNode;
//     const data = getData();
//     for (let i = 1; i < data.length; i++) {
//         tbody.appendChild(tr.cloneNode(true));
//     }
//     data.forEach((row, i) => 
//         Object.keys(row).forEach(prop => 
//             tbody.rows[i+1].querySelector('.' + prop).textContent = row[prop]
//         );
//     );
// };        

function login(){
    // ambil data dari form
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    
    let userarr = new Array();
    userarr = JSON.parse(localStorage.getItem("username"))?JSON.parse(localStorage.getItem("username")):[]
    if(userarr.some((v)=>{
        return v.username == username && v.password == password
    })){
        alert("Login sukses")
        let curent_user = userarr.filter((v)=>{
            return v.username == username && v.password == password
        })[0]

        localStorage.setItem("userlogin", JSON.stringify(curent_user));
       //localStorage.setItem("password", curent_user, password);
       //window.location.replace("profile.html")
       
       
    }else{
        ( username == "")
        alert("masukan data")
    //     }else{
    //         let userlog = new Array()
    //         userlog = JSON.parse(localStorage.getItem("userlogin"))?JSON.parse(localStorage.getItem("userlogin")):[]
    //         if(userlog.some((v)=> {
    //             return v.userlogin == userlogin 
    //         })) {alert("anda sudah login")
    //     } 
    // }
    }
}

function logout() {
    
    //_remove("username")
    // localStorage.removeItem("users")
    localStorage.removeItem("userlogin")
    //localStorage.removeItem("password")

  }
  
  function hapus(){
    let username = document.getElementById("username").value;
   // let password = document.getElementById("password").value;
    let userarr = JSON.parse(localStorage.getItem("username"))
    _.remove(userarr, {username: username});
    localStorage.setItem("username", JSON.stringify(userarr));
    logout();
    location.reload()
   // _.forEach(userarr, function(user) 

}


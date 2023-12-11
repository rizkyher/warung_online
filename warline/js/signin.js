function register(){
    // ambil data dari form
    let username = document.getElementById("username").value;
    let password = document.getElementById("password-field").value;
    
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
    // window.location.replace("shop2.html")
        } else {
                alert("masukan data dengan benar")
    } 
    }
    
}
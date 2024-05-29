//untuk memunculkan data di archive
function show_data(){
    // alert('data akan di tampilkan')
    let tambah_data = JSON.parse(localStorage.getItem("orderan"))
    // tambah_data.forEach(d => d.pesanan);
    if (typeof tambah_data !== 'undefined'){
        jQuery(`.data`).remove()
        for (let i= 0; i < tambah_data.length; i++){
            jQuery('#cart4').append(
                `<tr id="`+i+`" class="data">
                    <td></td>
                    <td>`+tambah_data[i].nama+`</td>
                    <td>`+tambah_data[i].kontak+`</td>
                    <td>`+tambah_data[i].alamat+`</td>
                    <td>`+tambah_data[i].tanggal+`</td>
                    <td>`+tambah_data[i].pesanan+`</td>
                </tr>`)
        }
    }
}



show_data()
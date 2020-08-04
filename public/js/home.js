window.onload = () => {

    let mensaje = document.getElementById('mensaje');
    console.log(mensaje);
    mensaje = mensaje != undefined ? mensaje.getAttribute("value") : '';
    console.log(mensaje);

    if(mensaje && mensaje.length!=0){
        alertify.alert('', mensaje);

      
       // alert(mensaje);
    }

    
    let botons = document.querySelectorAll('input.submit');


    let currentPage = document.getElementById('currentPage');


    currentPage = currentPage === undefined ? "" : parseInt(currentPage.getAttribute("value")) ;

    botons[currentPage].style.background='rgb(231 233 92)';
    

   


}
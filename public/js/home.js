window.addEventListener("load", function() {

    let mensaje = document.getElementById('mensaje');
    mensaje = mensaje != undefined ? mensaje.getAttribute("value") : '';
  
    if(mensaje && mensaje.length!=0){
        alertify.alert().setting({
            'transition':'zoom'
           });
        alertify.alert('', mensaje);

      
       // alert(mensaje);
    }

    
   /* let botons = document.querySelectorAll('input.submit');


    let currentPage = document.getElementById('currentPage');


    currentPage = currentPage === undefined ? "" : parseInt(currentPage.getAttribute("value")) ;

    botons[currentPage].style.background='rgb(231 233 92)';*/
    

   


})
window.addEventListener("load", function(){

    let formEliminar = document.querySelectorAll('.form-eliminar');

    for(form of formEliminar){

        let buttonEliminar = form.querySelector(".buttonEliminar");
    
        buttonEliminar.addEventListener("click" , function(event){
        const formulario= this.parentElement;
        
        alertify.confirm().setting({
             'transition':'zoom'
            });
        alertify.confirm('Suprimir este producto?',function(){formulario.submit()});
        
        });

    }
   

})
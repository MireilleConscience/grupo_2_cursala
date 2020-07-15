window.onload = () => {


//capturo al formulario
let formularioCarga = document.querySelector('form.form-carga');
console.log(formularioCarga);

let campoName =  formularioCarga.querySelector('#name');
let mostrarErrorName = campoName.parentElement.querySelector('div.form-control');

let campoCategoria=  formularioCarga.querySelector('#category');
let mostrarErrorCategoria = campoCategoria.parentElement.querySelector('div.form-control');

//capturo a los campos length, erreur de length
let campoLength = formularioCarga.querySelector('#length');
let mostrarErrorLength = campoLength.parentElement.querySelector('div.form-control');
//capturo a los campos price, erreur de price
let campoPrice = formularioCarga.querySelector('#price');
let mostrarErrorPrice = campoPrice.parentElement.querySelector('div.form-control');

//capturo a los campos descripcion, erreur de descrpcion
let campoDescription = formularioCarga.querySelector('#description');
let mostrarErrorDescription = campoDescription.parentElement.querySelector('div.form-control');


//asigno el evento onsubmit
formularioCarga.onsubmit = (ev) => {
    //aqui si empiezo a validar
    campoName.classList.remove('is-invalid');
    mostrarErrorName.classList.remove('is-invalid');
    campoLength.classList.remove('is-invalid');
    mostrarErrorLength.classList.remove('is-invalid');
    campoPrice.classList.remove('is-invalid');
    mostrarErrorPrice.classList.remove('is-invalid');
    campoDescription.classList.remove('is-invalid');
    mostrarErrorDescription.classList.remove('is-invalid');
    campoCategoria.classList.remove('is-invalid');
    mostrarErrorCategoria.classList.remove('is-invalid');

    let regexNumerico = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
   
/****NAME**************/
    if (campoName.value.length < 5) {
        ev.preventDefault();
        //le agrego la clase is-invalid al input
        campoName.classList.add('is-invalid');
        mostrarErrorName.classList.add('is-invalid');
        mostrarErrorName.innerText = 'Campo obligatorio, al menos 5 caracteres';
    }

 /****Length**************/

   if (campoCategoria.value == '-- seleccionar una categoria --') {
      ev.preventDefault();
      //le agrego la clase is-invalid al input
      campoCategoria.classList.add('is-invalid');
       mostrarErrorCategoria.classList.add('is-invalid');
       mostrarErrorCategoria.innerText = 'Debe seleccionar una categoria';
    }

     /****Length**************/
     if ( isNaN(campoLength.value) || campoLength.value <0 || campoLength.value=='') {
      ev.preventDefault();
      //le agrego la clase is-invalid al input
      campoLength.classList.add('is-invalid');
      mostrarErrorLength.classList.add('is-invalid');
      mostrarErrorLength.innerText = 'Este campo es un numero positivo';
  }

   /****Price**************/
   if (isNaN(campoPrice.value)  || campoPrice.value <0 || campoPrice.value=='') {
    ev.preventDefault();
    //le agrego la clase is-invalid al input
    campoPrice.classList.add('is-invalid');
    mostrarErrorPrice.classList.add('is-invalid');
    mostrarErrorPrice.innerText = 'Este campo es un numerico';
}
       
    /****Descripcion**************/
    if (campoDescription.value.length < 20) {
      ev.preventDefault();
      //le agrego la clase is-invalid al input
      campoDescription.classList.add('is-invalid');
      mostrarErrorDescription.classList.add('is-invalid');
      mostrarErrorDescription.innerText = 'Campo obligatorio, al menos 20 caracteres';
  }
    
  
}


/**************************** FILE AVATAR         ************************/

const file    = document.querySelector('#image')

file.onchange = function () {
    let campoImage= formularioCarga.querySelector('#image');
    let mostrarErrorImage = campoImage.parentElement.querySelector('div.form-control');

    const preview = document.querySelector('#photo-preload img');
    const previewDiv = document.querySelector('#photo-preload');
    const file    = this.files[0];
    const reader  = new FileReader();
  
    reader.onloadend = function () {
      preview.src = reader.result;
      previewDiv.style.display = 'block';
    }
  
    if (file) {
      let tab = file.name.split('.');
      const acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
               
      if(acceptedExtensions.includes(tab[1])){
        reader.readAsDataURL(file);
        campoImage.classList.remove('is-invalid');
        mostrarErrorImage.classList.remove('is-invalid');
      }else{
        campoImage.classList.add('is-invalid');
        mostrarErrorImage.classList.add('is-invalid');
        mostrarErrorImage.innerText = 'Imagen no obligatoria, solo con uno de los siguientes formatos: JPG, JPEG, PNG, GIF';
        preview.src = "";
        previewDiv.style.display = 'none';
        //  habria que poder reinicialisar el campo file si la extension no esta bien 
        //????
      //  this.files[0]= null;
        // document.querySelector('#avatar').innerHTML.value="";
      //
        
    }

    } else {
      preview.src = "";
    }
    
}


}
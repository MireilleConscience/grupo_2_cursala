window.onload = () => {

    let boton = document.querySelector('input.submit');
    console.log(boton);

    /*boton.onclick = function (event) {
       event.preventDefault();
        alert('me clikeaste')
    }*/



//capturo al formulario
let formularioRegistro = document.querySelector('form.form-registro');
console.log(formularioRegistro);

let campofirstName =  formularioRegistro.querySelector('#firstName');
let mostrarErrorfirstName = campofirstName.parentElement.querySelector('div.form-control');
//capturo a los campos email, erreur de email
let campoEmail = formularioRegistro.querySelector('#email');
let mostrarErrorEmail = campoEmail.parentElement.querySelector('div.form-control');
//capturo a los campos password, erreur de password
let campoPass = formularioRegistro.querySelector('#password');
let campoCPass = formularioRegistro.querySelector('#c_password');
let mostrarErrorPass = campoPass.parentElement.querySelector('div.form-control');




//asigno el evento onsubmit
formularioRegistro.onsubmit = (ev) => {
    //aqui si empiezo a validar
    campofirstName.classList.remove('is-invalid');
    mostrarErrorfirstName.classList.remove('is-invalid');
    campoEmail.classList.remove('is-invalid');
    mostrarErrorEmail.classList.remove('is-invalid');
    campoPass.classList.remove('is-invalid');
    campoCPass.classList.remove('is-invalid');
    mostrarErrorPass.classList.remove('is-invalid');

    let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let regexPass =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,}$/;
   
/****FIRST_NAME**************/
    if (campofirstName.value.length < 2) {
        ev.preventDefault();
        //le agrego la clase is-invalid al input
        campofirstName.classList.add('is-invalid');
        mostrarErrorfirstName.classList.add('is-invalid');
        mostrarErrorfirstName.innerText = 'Campo obligatorio, al menos 2 caracteres';
    }
       
    /****EMAIL**************/
        
    if (!regexEmail.test(campoEmail.value)) {
    //evito que se envie el formulario
        ev.preventDefault();
        campoEmail.classList.add('is-invalid');
        mostrarErrorEmail.classList.add('is-invalid');
        mostrarErrorEmail.innerText = 'Email Invalido ';
        
    } 
    if (!regexPass.test(campoPass.value)){
        ev.preventDefault();
        campoPass.classList.add('is-invalid');
         mostrarErrorPass.classList.add('is-invalid');
         mostrarErrorPass.innerText = 'Contraseña con al menos 8 caracteres, mayusculas, un numero y un caracter especial';
    } else{
        if(campoPass.value != campoCPass.value){
            console.log("contrasena no iguales");
            ev.preventDefault();
            campoPass.classList.add('is-invalid');
            campoCPass.classList.add('is-invalid');
            mostrarErrorPass.classList.add('is-invalid');
            mostrarErrorPass.innerText = 'Las contraseñas no coinciden';
        }
    }
    
    

}

/********************  HACER VISIBLE LA CONTRASEÑA ***********************/ 

let togglePassword = formularioRegistro.querySelector('#togglePassword');
togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = campoPass.getAttribute('type') === 'password' ? 'text' : 'password';
    campoPass.setAttribute('type', type);
    campoCPass.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});
/**************************** FILE AVATAR         ************************/

const file    = document.querySelector('#avatar')

file.onchange = function () {
    let campoAvatar= formularioRegistro.querySelector('#avatar');
    let mostrarErrorAvatar = campoAvatar.parentElement.querySelector('div.form-control');

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
        campoAvatar.classList.remove('is-invalid');
        mostrarErrorAvatar.classList.remove('is-invalid');
      }else{
        campoAvatar.classList.add('is-invalid');
        mostrarErrorAvatar.classList.add('is-invalid');
        mostrarErrorAvatar.innerText = 'Imagen no obligatoria, solo con uno de los siguientes formatos: JPG, JPEG, PNG, GIF';
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
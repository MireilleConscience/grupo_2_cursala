window.onload = () => {

    /*let boton = document.querySelector('input.submit');
    console.log(boton);

    boton.onclick = function (event) {
       event.preventDefault();
        alert('me clikeaste')
    }*/



//capturo al formulario
let formularioLogin = document.querySelector('form.form-login');
console.log(formularioLogin);
//capturo a los campos email, erreur de email
let campoEmail = formularioLogin.querySelector('#email');
let mostrarErrorEmail = campoEmail.parentElement.querySelector('div.form-control');
//capturo a los campos password, erreur de password
let campoPass = formularioLogin.querySelector('#password');
let mostrarErrorPass = campoPass.parentElement.querySelector('div.form-control');



//asigno el evento onsubmit
formularioLogin.onsubmit = (ev) => {
    //aqui si empiezo a validar
    campoEmail.classList.remove('is-invalid');
    mostrarErrorEmail.classList.remove('is-invalid');
    campoPass.classList.remove('is-invalid');
    mostrarErrorPass.classList.remove('is-invalid');


    let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i


    if (!regexEmail.test(campoEmail.value)) {
        //evito que se envio el formulario
        ev.preventDefault();
        //le agrego la clase is-invalid al input
        campoEmail.classList.add('is-invalid');
        mostrarErrorEmail.classList.add('is-invalid');
        mostrarErrorEmail.innerText = 'Email Invalido';
    }


    if (campoPass.value == '') {
        //evito que se envio el formulario
        ev.preventDefault();
        //le agrego la clase is-invalid al input
        campoPass.classList.add('is-invalid');
        mostrarErrorPass.classList.add('is-invalid');
        mostrarErrorPass.innerText = 'Ingrese la Contraseña';
    }

}


let togglePassword = formularioLogin.querySelector('#togglePassword');
togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = campoPass.getAttribute('type') === 'password' ? 'text' : 'password';
    campoPass.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});



}
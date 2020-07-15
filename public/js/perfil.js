window.onload = () => {

    let boton = document.querySelector('input.submit');
    console.log(boton);

    /*boton.onclick = function (event) {
       event.preventDefault();
        alert('me clikeaste')
    }*/



//capturo al formulario
let formularioPerfil = document.querySelector('form.form-perfil');
console.log(formularioPerfil);

let campofirstName =  formularioPerfil.querySelector('#firstName');
let mostrarErrorfirstName = campofirstName.parentElement.querySelector('div.form-control');

//asigno el evento onsubmit
formularioPerfil.onsubmit = (ev) => {
    //aqui si empiezo a validar
    campofirstName.classList.remove('is-invalid');
    mostrarErrorfirstName.classList.remove('is-invalid');
   

     let regexPass =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,}$/;
   
/****FIRST_NAME**************/
    if (campofirstName.value.length < 2) {
        ev.preventDefault();
        //le agrego la clase is-invalid al input
        campofirstName.classList.add('is-invalid');
        mostrarErrorfirstName.classList.add('is-invalid');
        mostrarErrorfirstName.innerText = 'Campo obligatorio, al menos 2 caracteres';
    }
       
}
    


/**************************** FILE AVATAR         ************************/

const file    = document.querySelector('#avatar')

file.onchange = function () {
    let campoAvatar= formularioPerfil.querySelector('#avatar');
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
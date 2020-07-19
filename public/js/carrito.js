window.onload = () => {


const formulario    = document.querySelectorAll('form.update-cantidad');


for (let formu of formulario){
  console.log(formu);
  const selectCantidad = formu.querySelector('select.cantidad');
  selectCantidad.onchange = function () {
  formu.submit();
     
 }

}



}
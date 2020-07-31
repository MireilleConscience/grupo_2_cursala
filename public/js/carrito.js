
window.onload = () => {

/************************    MODIFICAR CANTIDAD EN EL CARRITO ******************************** */

const formulario    = document.querySelectorAll('form.update-cantidad');


for (let formu of formulario){
    const selectCantidad = formu.querySelector('select.cantidad');
    selectCantidad.onchange = function () {
      formu.submit();
    }
  }

/************************    SUPRIMIR PRODUCTO EN EL CARRITO ******************************** */
/*const botonesEliminar = document.querySelectorAll('a.eliminar');


for (let boton of botonesEliminar){

      boton.onclick = function(event){

        const productoId = this.getAttribute('data-productoId');
        console.log(productoId);
        let containerProducto = document.getElementById("producto"+productoId);
        console.log(containerProducto);

        fetch('http://localhost:3000/api/users/delete', {
              method : 'DELETE',
              body : JSON.stringify({
                productoId : productoId,
              }),
              headers : {
                  'Content-type' : 'application/json'
              }
        })
          .then(function (response) {
                return response.json();
            })
          .then(function (respuestaEnJson) {
                //aqui la API me responda exitosamente
                console.log(respuestaEnJson)

                if (respuestaEnJson.meta.status == 401) {
                    alert(respuestaEnJson.meta.response);
                    return false;
                }

                alert(respuestaEnJson.response);


                containerProducto.style='display:none';

          })
            .catch(function (error) {
                console.error(error);
          });
    } 

  }*/

          
}

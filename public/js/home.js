window.onload = () => {

    let boton = document.querySelectorAll('input.submit');

    let pageToPrint = document.getElementById('pa').value;
   
    let page = parseInt(pageToPrint);
   

    boton[page-1].style.background='rgb(231 233 92)';
   


}
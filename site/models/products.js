const fs = require('fs');
const path = require('path');

const fileData = path.join(__dirname, '../data/products.json');

let productosData = {
    findAll : function () {
        //primero es verificar si el archivo existe
        if (!fs.existsSync(fileData)) {
            fs.writeFileSync(fileData, '');
        }
        //leo el archivo
        let jsonFile = fs.readFileSync(fileData, 'utf8');

        //convertir a array de js ese json, validando que tenga o no datos
        let productos = jsonFile.length === 0 ? [] : JSON.parse(jsonFile);
        return productos;
    },

    FilterPorCategoria: function (idCat) {
        let array = this.findAll();
        let producto= array.filter(prod => prod.category == idCat);
        return producto;	
    },

    findByPK : function (id) {
        let array = this.findAll();
        let producto= array.find(prod => prod.id == id);
        return producto;	
    },

    create : function (producto) {
        let array = this.findAll();
        //le asigno el ultimo id
        producto.id = this.lastID();
        //meto el producto
        array.push(producto);
        //convertir a json ese array con producto nuevo
        jsonData = JSON.stringify(array, null, " ");
        //escribo
        fs.writeFileSync(fileData, jsonData);
    },

    update : function (producto) {
        let array = this.findAll();
        for(let prod of array){
            if(prod.id==producto.id){
                prod.name= producto.name;
                prod.price=producto.price;
                prod.duration=producto.duration;
                prod.category= producto.category;
                prod.description=producto.description;
                prod.image=producto.image;

            }
        }
       
        //convertir a json ese array con producto nuevo
        jsonData = JSON.stringify(array, null, " ");
     
        //escribo
        fs.writeFileSync(fileData, jsonData);
    },

    lastID : function (){
        let array = this.findAll();
        let lastID = 0;
        for (producto of array) {
            if (lastID < producto.id) {
                lastID = producto.id;
            }
        }
        return lastID + 1;
    },
    delete : function (id) {
        let array = this.findAll();
        let newArray=[];
        for (producto of array){
            if(producto.id!= id){
                newArray.push(producto);
            }
        }
        
        //convertir a json ese array con producto nuevo
        jsonData = JSON.stringify( newArray, null, " ");
        //escribo
        fs.writeFileSync(fileData, jsonData);
    }
}

module.exports = productosData;
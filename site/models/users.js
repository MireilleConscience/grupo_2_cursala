const fs = require('fs');
const path = require('path');

const fileData = path.join(__dirname, '../data/users.json');
const bcryptjs = require('bcryptjs');

let usersData = {
    findAll : function () {
        //primero es verificar si el archivo existe
        if (!fs.existsSync(fileData)) {
            fs.writeFileSync(fileData, '');
        }
        //leo el archivo
        let jsonFile = fs.readFileSync(fileData, 'utf8');

        //convertir a array de js ese json, validando que tenga o no datos
        let users = jsonFile.length === 0 ? [] : JSON.parse(jsonFile);
        return users;
    },


    findByEmail : function (us) {
        let array = this.findAll();
        console.log(us);
        let user= array.find(user => bcryptjs.compareSync(us.password, user.password) && us.mail == user.mail);
        console.log(user);
       
        return user;	
    },

    create : function (user) {
        console.log("creacion user"); 
        let array = this.findAll();
        //le asigno el ultimo id
        user.id = this.lastID();
        //meto el producto
        array.push(user);
        //convertir a json ese array con producto nuevo
        jsonData = JSON.stringify(array, null, " ");
        //escribo
        fs.writeFileSync(fileData, jsonData);
    },

    lastID : function (){
        let array = this.findAll();
        let lastID = 0;
        for (user of array) {
            if (lastID < user.id) {
                lastID = user.id;
            }
        }
        return lastID + 1;
    }
}

module.exports = usersData;
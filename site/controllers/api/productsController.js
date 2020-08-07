
const db = require('../../database/models');

const {Op} = require('sequelize');
const { push } = require('../../middlewares/validation/login');

const controller = {

    /********************  lista de los productos *****************/

    list:function (req,res){
       

        let pedidoCategoria = db.Category.findAll({
            include: [{association: "cursos",
                        required:false
             }]
        })
        
       
        let pedidoProducto =db.Curso.findAndCountAll({
        order : [
            ['categoryId' , 'ASC']
        ],
           
            include : ['categorias']
        })


        Promise.all([pedidoProducto,pedidoCategoria])
            .then(function([productos,categorias]){
                let products = [];
                for(prod of productos.rows){
                    let producto ={
                        id:prod.id,
                        name:prod.name,
                        description:prod.description,
                        categories: prod.categorias,
                        url_detail: "api/products/" + prod.id,
                    }
                    products.push(producto);
                }

                let category = [];
                
               for (cat of categorias){
                    let categoria={
                        id:cat.id,
                        name:cat.name,
                        count:cat.cursos.length,
                       // cursos: cat.cursos,
                    }
                   
                    category.push(categoria);
                }

                    let respuesta={
                        meta:{
                            status:200,
                            count:productos.count,
                        },
                       data:{
                           countByCategory: category,
                            products: products,
                       }
                    }
                  
                    res.json(respuesta);
               
            })
            .catch(function(error){
                    console.log(error);
            });

    },

     /*************************** Detalle de un Producto **** */

	listOne:function (req,res) {
       
       db.Curso.findOne({
            where:{
                id: req.params.id
            },
            include: [{association: "categorias"}] 
            })
            .then(function(producto){
            let respuesta={
                meta:{
                    status:200,
                },
                product: producto,
            }
                
            res.json(producto);
            })
            .catch(function(error){
                console.log(error);
        });
      
    }

}
module.exports = controller; 
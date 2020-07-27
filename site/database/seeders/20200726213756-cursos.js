'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('cursos', [
      {
        name: 'Todo sobre la remolacha', 
          description:' Lorem ipsum dolor sit amet, consectetur adipiscing elit', 
          image:'1.png', 
          length: 20, 
          price: 40, 
          categoryId: 2
      },
      {name: 'Todo sobre el repollo ', description:' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',image:'6.png', length: 15, categoryId: 2, price: 30},

          {name: 'Tapas faciles', description:' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',image:'11.png', length: 20, categoryId: 1, price: 40},
          {name: 'Tapas en casa', description:' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',image:'12.png', length: 15, categoryId: 1, price: 30},
          {name: 'Tapas', description:' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',image:'13.png', length: 20, categoryId: 1, price: 40},
          {name: 'Tapas para principiantes', description:' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',image:'14.png', length: 15, categoryId: 1, price: 30},
          {name: 'Tapas nivel 1', description:' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',image:'15.png', length: 20, categoryId: 1, price: 40},
          {name: 'Tapas', description:' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',image:'16.png', length: 15, categoryId: 1, price: 30},
          {name: 'Tapas Easy', description:' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',image:'17.png', length: 20, categoryId: 1, price: 40},
          {name: 'Tapas ', description:' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',image:'18.png', length: 15, categoryId: 1, price: 30},
          {name: 'Tapas ', description:' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',image:'19.png', length: 15, categoryId: 1, price: 30},

          {name: 'Gourmet 1', description:' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',image:'21.png', length: 20, categoryId: 3, price: 40},
          {name: 'Gourmet 2', description:' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',image:'22.png', length: 15, categoryId: 3, price: 30},
          {name: 'Gourmet 3', description:' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',image:'23.png', length: 20, categoryId: 3, price: 40},
          {name: 'Gourmet 4', description:' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',image:'24.png', length: 15, categoryId: 3, price: 30},
          {name: 'Gourmet 5', description:' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',image:'25.png', length: 20, categoryId: 3, price: 40},
          {name: 'Gourmet 6', description:' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',image:'26.png', length: 15, categoryId: 3, price: 30},
          {name: 'Gourmet 7', description:' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',image:'27.png', length: 20, categoryId: 3, price: 40},
          {name: 'Gourmet 8', description:' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',image:'28.png', length: 15, categoryId: 3, price: 30},
          {name: 'Gourmet 9', description:' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',image:'29.png', length: 15, categoryId: 3, price: 30}

    ]);
  },



  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cursos', null, {});
  }
};



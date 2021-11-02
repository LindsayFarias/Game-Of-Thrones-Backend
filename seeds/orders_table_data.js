const orders = require('../Data/orders');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('orders').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('orders').insert(
        orders.map((element) => {
          return {name: element.name};
        })
      );
    });
};

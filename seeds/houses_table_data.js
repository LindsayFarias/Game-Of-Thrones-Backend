const houses = require('../Data/houses');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('houses').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('houses').insert(
        houses.map((element) => {
          return {name: element.name,
                  image: element.coatOfArms,
                  location: element.location};
        })
      );
    });
};

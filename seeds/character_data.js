const characters = require('../Data/characters');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('characters').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('characters').insert(
        characters.map((element) => {
          let royalty;
          royalty = element.royal ? true : false;
          return {name: element.characterName,
                  image: element.characterImageFull,
                  royalty: royalty,
                  attack_value: Math.floor(Math.random() * (101 - 1) + 1)};
        })
      );
    });
};

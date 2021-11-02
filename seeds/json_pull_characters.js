const characters = require('../characters');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('characters').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('characters').insert(
        characters.map((element) => {
          return {name: element.characterName,
                  image: element.characterImageFull,
                  royalty: element.royalty};
        })
      );
    });
};

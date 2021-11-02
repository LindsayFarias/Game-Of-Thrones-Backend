const characters = require('../Data/characters');

exports.seed = function(knex) {
  
  return knex('marriage_table').truncate()
    .then(function() {
      let promiseArray = [];
      characters.map((el) => {
        if (el.marriedEngaged) {
          let spouse1 = el.characterName;
          el.marriedEngaged.forEach(function(spouse2) {
            promiseArray.push(retrieveFromDB(spouse1, spouse2, knex));
          })
        }
      })
      return promiseArray;
    }).then((data)=>{return Promise.all(data)})
  };

const retrieveFromDB = async function(spouse1, spouse2, knex) {
  return knex('marriage_table').insert({spouse_1: spouse1, spouse_2: spouse2});
}

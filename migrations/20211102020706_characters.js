
exports.up = function(knex) {
  return knex.schema.createTable('characters', table => {
      table.increments('id');
      table.string('name').notNullable();
      table.string('image');
      table.boolean('royalty');
      table.integer('attack_value');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('characters')
};

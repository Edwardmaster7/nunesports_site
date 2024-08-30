exports.up = (knex) => {
    return knex.schema.createTable('Users', (table) => {
        table.increments('id').primary().unique().notNullable()
        table.string('name').notNullable()
        table.string('email').notNullable()
        table.string('password').notNullable()
        table.string('role').defaultTo('user')
        table.string('avatar').defaultTo(null)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at')
    }).then(() => {
        return knex.raw(`
          CREATE TRIGGER update_users_timestamp
          BEFORE UPDATE ON Users
          FOR EACH ROW
          BEGIN
            UPDATE Users SET updated_at = datetime('now') WHERE id = NEW.id;
          END;
        `)
      }).then(() => {
            return knex('Users').insert([
                { name: 'Admin', email: 'admin@test.com', password: '@dm1n251', role: 'admin' },
                { name: 'User', email: 'user@test.com', password: 'password', role: 'user' }
            ])
        })
        
}

exports.down = (knex) => {
    return knex.schema.dropTable('Users')
}

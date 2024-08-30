exports.up = (knex) => {
    return knex.schema.createTable('Products', (table) => {
        table.increments('code').primary().unique().notNullable()
        table.string('name').notNullable()
        table.string('description', 160);
        table.decimal('price', 8, 2).notNullable()
        table.string('img_src').defaultTo(null)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at')
    }).then(() => {
            return knex.raw(`CREATE TRIGGER update_products_timestamp
                            BEFORE UPDATE ON Products
                            FOR EACH ROW
                            BEGIN
                                UPDATE Products SET updated_at = datetime('now') WHERE code = NEW.code;
                            END;
                            `)
    })
        
}

exports.down = (knex) => {
    return knex.schema.dropTable('Products')
}

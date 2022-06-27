import { Knex } from "knex";
import { tableName } from "../helps";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName.USERS, function (table) {
    table.increments("id", { primaryKey: true })
    table.enum("type", ["admin", "common"]);
    table.string("email", 255).notNullable()
    table.string("password", 255).notNullable()
    table.timestamps(true, true)
  })

  await knex.schema.createTable(tableName.COMPANIES, function (table) {
    table.increments("id", { primaryKey: true })
    table.string("name", 255).notNullable()
    table.timestamps(true, true)
  })

  await knex.schema.createTable(tableName.PLACES, function (table) {
    table.increments("id", { primaryKey: true })
    table.string("name", 255).notNullable()
    table.integer("total_amount").notNullable
    table.timestamps(true, true)
  })

  await knex.schema.createTable(tableName.EVENTS, function(table) {
    table.increments("id", {primaryKey: true})
    table.string("name", 255).notNullable()
    table.string("description", 255).nullable()
    table.string("date", 255).notNullable()
    table.integer("tickets_sold").nullable()
    table.integer("place_id").notNullable()
    table.integer("company_id").notNullable()
    table.timestamps(true, true)
    table
      .foreign(
        "place_id", `${tableName.EVENTS}_${tableName.PLACES}`
      )
      .references("id").inTable(tableName.PLACES)
    table
    .foreign(
      "company_id", `${tableName.EVENTS}_${tableName.COMPANIES}`
    )
    .references("id").inTable(tableName.COMPANIES)
  })

  await knex.schema.createTable(tableName.TICKETS, function(table) {
    table.increments("id", {primaryKey: true})
    table.timestamps(true, true)
    table.integer("event_id").notNullable()
    table
    .foreign(
      "event_id", `${tableName.TICKETS}_${tableName.EVENTS}`
    )
    .references("id").inTable(tableName.EVENTS)
  })

  await knex.schema.createTable(tableName.PURCHASES, function(table) {
    table.increments("id", {primaryKey: true})
    table.dateTime("purchase_made_in").notNullable()
    table.timestamps(true, true)
    table.integer("user_id").notNullable()
    table.integer("ticket_id").notNullable()
    table
    .foreign(
      "user_id", `${tableName.PURCHASES}_${tableName.USERS}`
    )
    .references("id").inTable(tableName.USERS)
    table
    .foreign(
      "ticket_id", `${tableName.PURCHASES}_${tableName.TICKETS}`
    )
    .references("id").inTable(tableName.TICKETS)
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName.PURCHASES);
  await knex.schema.dropTable(tableName.TICKETS);
  await knex.schema.dropTable(tableName.EVENTS);
  await knex.schema.dropTable(tableName.PLACES);
  await knex.schema.dropTable(tableName.COMPANIES);
  await knex.schema.dropTable(tableName.USERS);
}


import { Knex } from "knex";
import { tableName } from "../helps";

export async function seed(knex: Knex): Promise<void> {
    try {
        const data = await knex(tableName.EVENTS).select("*").first();
        if (data) {
          console.log("Skipping seed table EVENTS");
          return;
        }
    
    
        await knex(tableName.EVENTS).insert([
          {
            name: "Palestra sobre NodeJS",
            description: "Evento para iniciantes em NodeJS",
            date: "15 de julho de 2022",
            tickets_sold: 3,
            place_id: 1,
            company_id: 1
          },
          {
            name: "Palestra sobre Typescript",
            description: "Evento para iniciantes em Typescript",
            date: "30 de setembro de 2022",
            tickets_sold: 50,
            place_id: 2,
            company_id: 2
          },
        ]);
      } catch (error) {
        console.log("Error on seed 04_EVENTS -> ", error);
      }
};

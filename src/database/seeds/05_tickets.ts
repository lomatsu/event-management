import { Knex } from "knex";
import { tableName } from "../helps";

export async function seed(knex: Knex): Promise<void> {
    try {
        const data = await knex(tableName.TICKETS).select("*").first();
        if (data) {
          console.log("Skipping seed table TICKETS");
          return;
        }
    
    
        await knex(tableName.TICKETS).insert([
          {
            event_id: 1,
          },
          {
            event_id: 2
          },
        ]);
      } catch (error) {
        console.log("Error on seed 05_TICKETS -> ", error);
      }
};

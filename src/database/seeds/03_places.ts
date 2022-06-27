import { Knex } from "knex";
import { tableName } from "../helps";

export async function seed(knex: Knex): Promise<void> {
    try {
        const data = await knex(tableName.PLACES).select("*").first();
        if (data) {
          console.log("Skipping seed table PLACES");
          return;
        }
    
    
        await knex(tableName.PLACES).insert([
          {
            name: "Exposição de Itaipava",
            total_amount: 5
          },
          {
            name: "Teatro Municipal do Rio de Janeiro",
            total_amount: 600
          },
        ]);
      } catch (error) {
        console.log("Error on seed 03_PLACES -> ", error);
      }
};

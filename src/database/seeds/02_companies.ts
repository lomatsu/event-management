import { Knex } from "knex";
import { tableName } from "../helps";

export async function seed(knex: Knex): Promise<void> {
    try {
        const data = await knex(tableName.COMPANIES).select("*").first();
        if (data) {
          console.log("Skipping seed table COMPANIES");
          return;
        }
    
    
        await knex(tableName.COMPANIES).insert([
          {
            name: "Omatsu Technology",
          },
          {
            name: "MB Labs",
          },
        ]);
      } catch (error) {
        console.log("Error on seed 02_COMPANIES -> ", error);
      }
};

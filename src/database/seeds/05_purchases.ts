import { Knex } from "knex";
import { tableName } from "../helps";

export async function seed(knex: Knex): Promise<void> {
  try {
    const data = await knex(tableName.PURCHASES).select("*").first();
    if (data) {
      console.log("Skipping seed table PURCHASES");
      return;
    }



    await knex(tableName.PURCHASES).insert([
      {
        purchase_made_in: new Date(),
        user_id: 2,
        event_id: 1
      },
      {
        purchase_made_in: new Date(),
        user_id: 2,
        event_id: 2
      },
    ]);
  } catch (error) {
    console.log("Error on seed 05_PURCHASES -> ", error);
  }
};

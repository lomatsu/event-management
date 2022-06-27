import { Knex } from "knex";
import { tableName } from "../helps";
import { encrypt } from '../../common/crypto'

export async function seed(knex: Knex): Promise<void> {
  try {
    const data = await knex(tableName.USERS).select("*").first();
    if (data) {
      console.log("Skipping seed table users");
      return;
    }

    const adminPasswordHash = await encrypt(process.env.ADMIN_PASSWORD);
    const commonUserPasswordHash = await encrypt(process.env.COMMON_USER_PASSWORD);

    await knex(tableName.USERS).insert([
      {
        email: "admin@gmail.com",
        password: adminPasswordHash,
        type: "admin",
      },
      {
        email: "user@gmail.com",
        password: commonUserPasswordHash,
        type: "common",
      },
    ]);
  } catch (error) {
    console.log("Error on seed 01_users -> ", error);
  }
};

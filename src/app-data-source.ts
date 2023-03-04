import { DataSource } from "typeorm";
import { Characters } from "./character/characters.entity";

export const AppDataSource = new DataSource({
  type:'mysql',
  host: process.env.dbHost,
  port: 3306,
  username: process.env.dbUser,
  password: process.env.dbpass,
  database: process.env. dbSource,
  synchronize: false,
  entities: [Characters]
});

AppDataSource.initialize()
  .then(() => {
    console.log('=======> connection established')
  })
  .catch( err=> {
    console.log(err);
  })
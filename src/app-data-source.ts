import { Channel } from "diagnostics_channel";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Characters } from "./character/characters.entity";
import { Charsaves } from "./saves/saves.entity";
import { Charstats } from "./stat/stat.entity";
import { Charskills } from "./skill/skills.entity";
import { Skills } from "./skill/defaultSkills.entity";

dotenv.config();  
export const AppDataSource = new DataSource({
  type:'mysql',
  host: process.env.dbHost,
  port: 3306,
  username: process.env.dbUser,
  password: process.env.dbpass,
  database: process.env.dbSource,
  synchronize: false,
  entities: [
    Characters, 
    Charstats, 
    Charsaves,
    Charskills,
    Skills
  ]
  
});

AppDataSource.initialize()
  .then((arg) => {
    console.log('=======> connection established', __dirname)
  })
  .catch( err=> {
    console.log(err);
  })
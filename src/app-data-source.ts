import { Channel } from "diagnostics_channel";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Characters } from "./character/characters.entity";
import { Charsaves } from "./saves/saves.entity";
import { Charstats } from "./stat/stat.entity";
import { Charskills } from "./skill/skills.entity";
import { Skills } from "./skill/defaultSkills.entity";
import { Chartohits } from "./to-hit/to-hit.entity";
import { Tohits } from "./to-hit/hits.entity";
import { Charequip } from "./equipment/char-equip.entity";
import { Charspells } from "./spells/spells.entity";
import { Expendables } from "./expendable/expendable.entity";
import { Feats } from "./feat/feats.entity";
import { Charfeats } from "./feat/char-feat.entity";
import { Charlevels } from "./levels/levels.entity";
import { Acs } from "./armor/armor.entity";
import { Charac } from "./armor/char-armor.entity";
import { Charnotes } from "./notes/char-notes.entity";
import { Noteitems } from "./notes/notes.entity";
import { CharClasses} from "./char-classes/char-classes.entity";
import { Users } from './user/user.entity'

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
    Skills,
    Chartohits,
    Tohits,
    Charequip,
    Charspells,
    Expendables,
    Feats,
    Charfeats,
    Charlevels,
    Acs,
    Charac,
    Charnotes,
    Noteitems,
    CharClasses,
    Users
  ]
  
});

AppDataSource.initialize()
  .then((arg) => {
    console.log('=======> connection established', __dirname)
    console.log('=======> dbHost', process.env.dbHost)
    console.log('=======> source', process.env.dbSource)
    console.log('=======> userName', process.env.dbUser)
    console.log('=======> password', process.env.dbpass)
  })
  .catch( err=> {
    console.log(err);
  })
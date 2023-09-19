import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Report } from './report/report.entity';
import { ReportModule } from './report/report.module';
import { Users } from './user/user.entity';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CharacterModule } from './character/character.module';
import { Characters } from './character/characters.entity';
import { StatModule } from './stat/stat.module';
import { SavesModule } from './saves/saves.module';
import { SkillModule } from './skill/skill.module';
import { ToHitModule } from './to-hit/to-hit.module';
import { EquipmentModule } from './equipment/equipment.module';
import { SpellsModule } from './spells/spells.module';
import { ExpendableModule } from './expendable/expendable.module';
import { FeatModule } from './feat/feat.module';
import { LevelsModule } from './levels/levels.module';
import { ArmorModule } from './armor/armor.module';
import { NotesModule } from './notes/notes.module';
import { CharClassesModule } from './char-classes/char-classes.module';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    UserModule, 
    ReportModule,
    CharacterModule,
    StatModule,
    SavesModule,
    SkillModule,
    ToHitModule,
    EquipmentModule,
    SpellsModule,
    ExpendableModule,
    FeatModule,
    LevelsModule,
    ArmorModule,
    NotesModule,
    CharClassesModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          type: 'sqlite',
          database: 'db.sqlite',
          //database: config.get<string>('DB_NAME'),
          entities: [],
          synchronize: false,
          autoLoadEntities: false,
        }
      },
    }),
    ],
    controllers: [AppController],
    providers: [
      AppService,
      // this is a global pipe
      {
        provide: APP_PIPE,
        useValue: new ValidationPipe({ whitelist: true}),
      },
    ],
  })
  // this is where the session is applied globally
  // THIS BECOMES  A GLOBAL MIDDLEWARE
  export class AppModule {
    constructor(private config: ConfigService){}

    configure(consumer: MiddlewareConsumer){
      consumer.apply(
        cookieSession({ keys: [this.config.get<string>('COOKIE_KEY')] }) 
        ) 
        .forRoutes('*');
      }
    }
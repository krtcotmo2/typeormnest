import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Characters } from 'src/character/characters.entity';
import { Charskills } from './skills.entity';
import { Skills } from './defaultSkills.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Characters, Charskills, Skills]),
  ],
  providers: [SkillService],
  controllers: [SkillController]
})
export class SkillModule {}

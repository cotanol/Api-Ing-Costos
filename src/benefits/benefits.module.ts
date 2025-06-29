import { Module } from '@nestjs/common';
import { BenefitsService } from './benefits.service';
import { BenefitsController } from './benefits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Benefit } from './entities/benefit.entity';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [TypeOrmModule.forFeature([Benefit]), ProjectsModule],
  controllers: [BenefitsController],
  providers: [BenefitsService],
  exports: [BenefitsService, TypeOrmModule],
})
export class BenefitsModule {}

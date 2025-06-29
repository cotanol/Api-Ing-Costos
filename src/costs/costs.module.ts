import { Module } from '@nestjs/common';
import { CostsService } from './costs.service';
import { CostsController } from './costs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cost } from './entities/cost.entity';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cost]), ProjectsModule],
  controllers: [CostsController],
  providers: [CostsService],
  exports: [CostsService, TypeOrmModule],
})
export class CostsModule {}

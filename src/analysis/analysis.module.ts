import { Module, forwardRef } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { AnalysisController } from './analysis.controller';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [forwardRef(() => ProjectsModule)],
  controllers: [AnalysisController],
  providers: [AnalysisService],
})
export class AnalysisModule {}

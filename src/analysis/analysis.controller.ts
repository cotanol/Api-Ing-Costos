import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { AnalysisService } from './analysis.service';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Get(':projectId')
  calculate(@Param('projectId', ParseUUIDPipe) projectId: string) {
    return this.analysisService.calculate(projectId);
  }
}
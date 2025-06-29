import { IsString, IsArray, IsNumber, IsEnum, IsUUID } from 'class-validator';
import { CostType } from '../entities/cost.entity';

export class CreateCostDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(CostType)
  type: CostType;

  @IsArray()
  @IsNumber({}, { each: true })
  annualValues: number[];

  @IsUUID()
  projectId: string;
}

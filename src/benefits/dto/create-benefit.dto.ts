import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsArray,
  IsNumber,
  ArrayMinSize,
} from 'class-validator';
import { BenefitType } from '../entities/benefit.entity';

export class CreateBenefitDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsEnum(BenefitType)
  @IsNotEmpty()
  type: BenefitType;

  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1) // Debe tener al menos un valor para el primer año
  annualValues: number[];

  @IsString()
  @IsNotEmpty()
  projectId: string;
}

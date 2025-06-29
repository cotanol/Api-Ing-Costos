import { Project } from '../../projects/entities/project.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

// Enum para la categorización del beneficio, clave para el análisis
export enum BenefitType {
  TANGIBLE = 'TANGIBLE',
  INTANGIBLE = 'INTANGIBLE',
}

@Entity()
export class Benefit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // Ej: "Reducción de Costos Operativos", "Nuevos Ingresos por Servicio X"

  @Column('text')
  description: string; // Detalle de cómo se genera el beneficio.

  @Column({
    type: 'enum',
    enum: BenefitType,
    default: BenefitType.TANGIBLE,
  })
  type: BenefitType;

  // Almacena los valores monetarios anualizados para N años
  @Column('decimal', {
    array: true,
    comment: 'Valores anualizados del beneficio para el horizonte del proyecto',
  })
  annualValues: number[];

  // Relación que une este beneficio a un proyecto específico
  @ManyToOne(() => Project, (project) => project.benefits, {
    onDelete: 'CASCADE',
  })
  project: Project;
}

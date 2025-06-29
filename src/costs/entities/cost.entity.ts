import { Project } from 'src/projects/entities/project.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

// Se define un tipo para el comportamiento del costo, como se menciona en el marco teórico
export enum CostType {
  FIXED = 'FIJO',
  VARIABLE = 'VARIABLE',
}

@Entity()
export class Cost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: CostType,
  })
  type: CostType;

  // Almacena los valores anualizados como un array de números
  @Column('decimal', { array: true })
  annualValues: number[];

  @ManyToOne(() => Project, (project) => project.costs)
  project: Project;
}

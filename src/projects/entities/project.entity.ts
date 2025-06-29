import { Benefit } from 'src/benefits/entities/benefit.entity';
import { Cost } from 'src/costs/entities/cost.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'projects',
})
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // Nombre de la tecnología a evaluar

  @Column('text')
  description: string; // Descripción y alternativa actual

  @Column({ type: 'int' })
  analysisHorizon: number; // Horizonte de análisis en años (N Años)

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  discountRate: number; // Tasa de descuento para el cálculo del VAN

  @OneToMany(() => Cost, (cost) => cost.project)
  costs: Cost[]; // Relación con los costos

  @OneToMany(() => Benefit, (benefit) => benefit.project)
  benefits: Benefit[]; // Relación con los beneficios
}

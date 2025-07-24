import { Proyecto } from '../../proyectos/entities/proyecto.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

// Enum para la categorización del beneficio, clave para el análisis
export enum TipoBeneficio {
  TANGIBLE = 'TANGIBLE',
  INTANGIBLE = 'INTANGIBLE',
}

@Entity({
  name: 'beneficios',
})
export class Beneficio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string; // Ej: "Reducción de Costos Operativos", "Nuevos Ingresos por Servicio X"

  @Column('text')
  descripcion: string; // Detalle de cómo se genera el beneficio.

  @Column({
    type: 'enum',
    enum: TipoBeneficio,
    default: TipoBeneficio.TANGIBLE,
  })
  tipo: TipoBeneficio;

  // Almacena los valores monetarios anualizados para N años
  @Column('decimal', {
    array: true,
    precision: 12,
    scale: 2,
    nullable: false,
  })
  valoresAnuales: number[];

  // Relación que une este beneficio a un proyecto específico
  @ManyToOne(() => Proyecto, (proyecto) => proyecto.beneficios, {
    onDelete: 'CASCADE',
  })
  proyecto: Proyecto;
}

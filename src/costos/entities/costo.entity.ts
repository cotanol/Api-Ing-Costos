import { Proyecto } from '../../proyectos/entities/proyecto.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

// Se define un tipo para el comportamiento del costo, como se menciona en el marco teórico
export enum TipoCosto {
  FIJO = 'FIJO',
  VARIABLE = 'VARIABLE',
}
// La entidad Costo representa un costo asociado a un proyecto, con sus propiedades y relaciones
@Entity()
export class Costo {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
// Identificador único del costo, generado automáticamente como un UUID
  @Column()
  nombre: string;

// Nombre del costo, que puede ser un costo fijo o variable
  @Column('text')
  descripcion: string;

// Descripción del costo, que proporciona más detalles sobre su naturaleza y propósito
  @Column({
    type: 'enum',
    enum: TipoCosto,
  })
  tipo: TipoCosto;

  // Almacena los valores anualizados como un array de números
  @Column('decimal', { array: true })
  valoresAnuales: number[];

// Valores anualizados del costo, representados como un array de números
  @ManyToOne(() => Proyecto, (proyecto) => proyecto.costos)
  proyecto: Proyecto;
}

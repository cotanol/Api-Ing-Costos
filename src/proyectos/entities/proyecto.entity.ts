import { User } from 'src/auth/entities/user.entity';
import { Beneficio } from '../../beneficios/entities/beneficio.entity';
import { Costo } from '../../costos/entities/costo.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'proyectos',
})
export class Proyecto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string; // Nombre de la tecnología a evaluar

  @Column('text')
  descripcion: string; // Descripción y alternativa actual

  @Column({ type: 'int' })
  horizonteAnalisis: number; // Horizonte de análisis en años (N Años)

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  tasaDescuento: number; // Tasa de descuento para el cálculo del VAN, o costo de oportunidad del capital

  @OneToMany(() => Costo, (costo) => costo.proyecto)
  costos: Costo[]; // Relación con los costos

  @OneToMany(() => Beneficio, (beneficio) => beneficio.proyecto)
  beneficios: Beneficio[]; // Relación con los beneficios

  @ManyToOne(() => User, (user) => user.proyectos, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: true, // Carga el usuario asociado al proyecto
  })
  user: User;
}

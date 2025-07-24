import { User } from 'src/auth/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FlujoFinanciero } from 'src/flujos-financieros/entities/flujo-financiero.entity';

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

  @OneToMany(() => FlujoFinanciero, (flujo) => flujo.proyecto)
  flujos: FlujoFinanciero[]; // Relación con los flujos financieros

  @ManyToOne(() => User, (user) => user.proyectos, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: true, // Carga el usuario asociado al proyecto
  })
  user: User;
}

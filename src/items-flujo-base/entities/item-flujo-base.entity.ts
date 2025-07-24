import { CategoriaFlujo } from '../../categorias-flujo/entities/categoria-flujo.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FlujoFinanciero } from '../../flujos-financieros/entities/flujo-financiero.entity';

// Definimos los enums directamente aquí para claridad

export enum Frecuencia {
  MENSUAL = 'MENSUAL',
  ANUAL = 'ANUAL',
  UNICO = 'UNICO',
}

export enum TipoFlujo {
  INGRESO = 'INGRESO',
  EGRESO = 'EGRESO',
}

export enum Comportamiento {
  FIJO = 'FIJO',
  VARIABLE = 'VARIABLE',
}

export enum Tipo {
  DIRECTO = 'DIRECTO',
  INDIRECTO = 'INDIRECTO',
}

export enum Naturaleza {
  TANGIBLE = 'TANGIBLE',
  INTANGIBLE = 'INTANGIBLE',
}

@Entity({ name: 'items_flujo_base' })
export class ItemFlujoBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: false })
  montoSugerido: number;

  @Column({
    type: 'enum',
    enum: Tipo,
    nullable: false,
  })
  tipo: Tipo;

  @Column({
    type: 'enum',
    enum: Frecuencia,
    nullable: false,
  })
  frecuencia: Frecuencia;

  @Column({
    type: 'enum',
    enum: Naturaleza,
    nullable: false,
  })
  naturaleza: Naturaleza;

  @Column({
    type: 'enum',
    enum: TipoFlujo,
    nullable: false,
  })
  tipoFlujo: TipoFlujo;

  @Column({
    type: 'enum',
    enum: Comportamiento,
    nullable: false,
  })
  comportamiento: Comportamiento;

  // Relación con CategoriaCosto
  @ManyToOne(() => CategoriaFlujo, (categoria) => categoria.itemsFlujoBase, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  categoria: CategoriaFlujo;

  @OneToMany(() => FlujoFinanciero, (flujo) => flujo.itemFlujoBase)
  flujo: FlujoFinanciero; // Relación con los flujos financieros asociados a este item
}

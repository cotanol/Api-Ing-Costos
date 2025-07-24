import { CategoriaCosto } from '../../categorias-costo/entities/categoria-costo.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// Definimos los enums directamente aquí para claridad
export enum TipoCosto {
  FIJO = 'FIJO',
  VARIABLE = 'VARIABLE',
}

export enum FrecuenciaCosto {
  MENSUAL = 'MENSUAL',
  ANUAL = 'ANUAL',
  UNICO = 'UNICO',
}

@Entity({ name: 'items_costo_base' })
export class ItemCostoBase {
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
    enum: TipoCosto,
    nullable: false,
  })
  tipo: TipoCosto;

  @Column({
    type: 'enum',
    enum: FrecuenciaCosto,
    nullable: false,
  })
  frecuencia: FrecuenciaCosto;

  // Relación con CategoriaCosto
  @ManyToOne(() => CategoriaCosto, (categoria) => categoria.itemsCostoBase, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  categoria: CategoriaCosto;
}

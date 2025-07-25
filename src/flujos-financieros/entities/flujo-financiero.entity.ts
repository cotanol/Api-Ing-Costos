import { CategoriaFlujo } from 'src/categorias-flujo/entities/categoria-flujo.entity';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ItemFlujoBase } from 'src/items-flujo-base/entities/item-flujo-base.entity';

// Se define un tipo para el comportamiento del costo, como se menciona en el marco teórico
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

@Entity({
  name: 'flujos_financieros',
})
export class FlujoFinanciero {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column('text')
  descripcion: string;

  @Column({
    type: 'enum',
    enum: TipoFlujo,
  })
  tipoFlujo: TipoFlujo;

  @Column({
    type: 'enum',
    enum: Tipo,
  })
  tipo: Tipo;

  @Column({
    type: 'enum',
    enum: Comportamiento,
  })
  comportamiento: Comportamiento;

  @Column({
    type: 'enum',
    enum: Naturaleza,
  })
  naturaleza: Naturaleza;

  // Almacena los valores anualizados como un array de números
  @Column('decimal', { precision: 12, scale: 2, nullable: false, array: true })
  valoresAnuales: number[];

  // Valores anualizados del costo, representados como un array de números
  @ManyToOne(() => Proyecto, (proyecto) => proyecto.flujos)
  proyecto: Proyecto;

  @ManyToOne(() => CategoriaFlujo, (categoria) => categoria.flujosFinancieros)
  categoria: CategoriaFlujo;

  @ManyToOne(() => ItemFlujoBase, (item) => item.flujosFinancieros, {
    nullable: false,
  })
  itemFlujoBase: ItemFlujoBase;
}

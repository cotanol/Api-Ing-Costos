// Suponiendo que usas TypeORM, que es común en NestJS.
// Si usas otra cosa (como Prisma), la sintaxis cambiará ligeramente.

import { FlujoFinanciero } from 'src/flujos-financieros/entities/flujo-financiero.entity';
import { ItemFlujoBase } from 'src/items-flujo-base/entities/item-flujo-base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categorias_flujo' })
export class CategoriaFlujo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @OneToMany(() => ItemFlujoBase, (item) => item.categoria)
  itemsFlujoBase: ItemFlujoBase[];

  @OneToMany(() => FlujoFinanciero, (flujo) => flujo.categoria)
  flujos: FlujoFinanciero[]; // Relación con los flujos financieros
}

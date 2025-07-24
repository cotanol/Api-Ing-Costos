// Suponiendo que usas TypeORM, que es común en NestJS.
// Si usas otra cosa (como Prisma), la sintaxis cambiará ligeramente.
import { ItemCostoBase } from 'src/items-costo-base/entities/item-costo-base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categorias_costos' })
export class CategoriaCosto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @OneToMany(() => ItemCostoBase, (item) => item.categoria)
  itemsCostoBase: ItemCostoBase[];
}

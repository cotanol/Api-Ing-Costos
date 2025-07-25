import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Proyecto } from '../proyectos/entities/proyecto.entity';
import { CategoriaFlujo } from '../categorias-flujo/entities/categoria-flujo.entity';
import { ItemFlujoBase } from '../items-flujo-base/entities/item-flujo-base.entity';
import { FlujoFinanciero } from '../flujos-financieros/entities/flujo-financiero.entity';
import { initialData } from './data/seed-data';

import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
    @InjectRepository(CategoriaFlujo)
    private readonly categoriaFlujoRepository: Repository<CategoriaFlujo>,
    @InjectRepository(ItemFlujoBase)
    private readonly itemFlujoBaseRepository: Repository<ItemFlujoBase>,
    @InjectRepository(FlujoFinanciero)
    private readonly flujoFinancieroRepository: Repository<FlujoFinanciero>,
  ) {}

  async runSeed() {
    await this.deleteTables();
    await this.insertUsers();
    await this.insertCategoriasFlujo();
    await this.insertItemsFlujoBase();
    await this.insertProyectos();
    await this.insertFlujosFinancieros();
    return `SEED EXECUTED`;
  }

  private async deleteTables() {
    await this.dataSource.query(
      'TRUNCATE TABLE "users", "proyectos", "categorias_flujo", "items_flujo_base", "flujos_financieros" RESTART IDENTITY CASCADE',
    );
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];
    for (const user of seedUsers) {
      const { password, ...userData } = user;
      const hashedPassword = await bcrypt.hash(password, 10);
      users.push(
        this.userRepository.create({
          ...userData,
          password: hashedPassword,
        }),
      );
    }

    await this.userRepository.save(users);

    return users[0];
  }

  private async insertCategoriasFlujo() {
    const seedCategorias = initialData.categoriasFlujo;

    const categorias: CategoriaFlujo[] = [];
    seedCategorias.forEach((categoria) => {
      categorias.push(this.categoriaFlujoRepository.create(categoria));
    });

    await this.categoriaFlujoRepository.save(categorias);
  }

  private async insertItemsFlujoBase() {
    const seedItems = initialData.itemsFlujoBase;

    const items: ItemFlujoBase[] = [];
    seedItems.forEach((item) => {
      const { categoria, ...rest } = item;
      items.push(
        this.itemFlujoBaseRepository.create({
          ...rest,
          categoria: { id: categoria },
        }),
      );
    });

    await this.itemFlujoBaseRepository.save(items);
  }

  private async insertProyectos() {
    const seedProyectos = initialData.proyectos;

    const proyectos: Proyecto[] = [];
    seedProyectos.forEach((proyecto) => {
      const { user, ...rest } = proyecto;
      proyectos.push(
        this.proyectoRepository.create({
          ...rest,
          user: { id: user },
        }),
      );
    });

    await this.proyectoRepository.save(proyectos);
  }

  private async insertFlujosFinancieros() {
    const seedFlujos = initialData.flujosFinancieros;

    const flujos: FlujoFinanciero[] = [];
    seedFlujos.forEach((flujo) => {
      const { proyecto, categoria, itemFlujoBase, ...rest } = flujo;
      flujos.push(
        this.flujoFinancieroRepository.create({
          ...rest,
          proyecto: { id: proyecto },
          categoria: { id: categoria },
          itemFlujoBase: { id: itemFlujoBase },
        }),
      );
    });

    await this.flujoFinancieroRepository.save(flujos);
  }
}

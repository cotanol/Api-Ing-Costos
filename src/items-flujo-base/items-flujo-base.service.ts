import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemFlujoBase } from './entities/item-flujo-base.entity';
import { CategoriaFlujo } from 'src/categorias-flujo/entities/categoria-flujo.entity';
import { CrearItemFlujoBaseDto } from './dtos/crear-item-flujo-base.dto';

@Injectable()
export class ItemsFlujoBaseService {
  constructor(
    @InjectRepository(ItemFlujoBase)
    private readonly itemRepository: Repository<ItemFlujoBase>,
    @InjectRepository(CategoriaFlujo)
    private readonly categoriaRepository: Repository<CategoriaFlujo>,
  ) {}

  async create(dto: CrearItemFlujoBaseDto): Promise<ItemFlujoBase> {
    const categoria = await this.categoriaRepository.findOneBy({
      id: dto.categoriaId,
    });
    if (!categoria) {
      throw new NotFoundException(
        `La categoría con ID "${dto.categoriaId}" no fue encontrada.`,
      );
    }
    const nuevoItem = this.itemRepository.create({ ...dto, categoria });
    return this.itemRepository.save(nuevoItem);
  }

  async findAll(categoriaId?: string): Promise<ItemFlujoBase[]> {
    if (categoriaId) {
      return this.itemRepository.find({
        where: { categoria: { id: categoriaId } },
      });
    }
    return this.itemRepository.find({
      relations: {
        categoria: true,
      },
    });
  }
}

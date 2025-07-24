import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemCostoBase } from './entities/item-costo-base.entity';
import { CrearItemCostoBaseDto } from './dtos/crear-item-costo-base.dto';
import { CategoriaCosto } from '../categorias-costo/entities/categoria-costo.entity';

@Injectable()
export class ItemsCostoBaseService {
  constructor(
    @InjectRepository(ItemCostoBase)
    private readonly itemRepository: Repository<ItemCostoBase>,
    @InjectRepository(CategoriaCosto)
    private readonly categoriaRepository: Repository<CategoriaCosto>,
  ) {}

  async create(dto: CrearItemCostoBaseDto): Promise<ItemCostoBase> {
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

  async findAll(categoriaId?: string): Promise<ItemCostoBase[]> {
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

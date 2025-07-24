import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriaCosto } from './entities/categoria-costo.entity';
import { CrearCategoriaCostoDto } from './dtos/crear-categoria-costo.dto';

@Injectable()
export class CategoriasCostoService {
  constructor(
    @InjectRepository(CategoriaCosto)
    private readonly categoriaCostoRepository: Repository<CategoriaCosto>,
  ) {}

  async create(
    crearCategoriaDto: CrearCategoriaCostoDto,
  ): Promise<CategoriaCosto> {
    const nuevaCategoria =
      this.categoriaCostoRepository.create(crearCategoriaDto);
    return this.categoriaCostoRepository.save(nuevaCategoria);
  }

  async findAll(): Promise<CategoriaCosto[]> {
    return this.categoriaCostoRepository.find({
      relations: {
        itemsCostoBase: true,
      },
    });
  }

  // Aquí irían los demás métodos (obtenerUno, actualizar, eliminar)...
}

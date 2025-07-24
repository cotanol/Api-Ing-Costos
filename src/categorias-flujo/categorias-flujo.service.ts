import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriaFlujo } from './entities/categoria-flujo.entity';
import { CrearCategoriaFlujoDto } from './dtos/crear-categoria-flujo.dto';

@Injectable()
export class CategoriasFlujoService {
  constructor(
    @InjectRepository(CategoriaFlujo)
    private readonly categoriaFlujoRepository: Repository<CategoriaFlujo>,
  ) {}

  async create(
    crearCategoriaDto: CrearCategoriaFlujoDto,
  ): Promise<CategoriaFlujo> {
    const nuevaCategoria =
      this.categoriaFlujoRepository.create(crearCategoriaDto);
    return this.categoriaFlujoRepository.save(nuevaCategoria);
  }

  async findAll(): Promise<CategoriaFlujo[]> {
    return this.categoriaFlujoRepository.find({
      relations: {
        itemsFlujoBase: true,
      },
    });
  }

  // Aquí irían los demás métodos (obtenerUno, actualizar, eliminar)...
}

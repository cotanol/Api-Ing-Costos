import { Injectable, NotFoundException } from '@nestjs/common';
import { CrearProyectoDto } from './dtos/crear-proyecto.dto';
import { ActualizarProyectoDto } from './dtos/actualizar-proyecto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { EntityManager, Repository } from 'typeorm';
import { Costo } from '../costos/entities/costo.entity';
import { Beneficio } from '../beneficios/entities/beneficio.entity';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
    private readonly entityManager: EntityManager,
  ) {}
// Crea un nuevo proyecto y lo guarda en la base de datos.
  create(crearProyectoDto: CrearProyectoDto): Promise<Proyecto> {
    const proyecto = this.proyectoRepository.create(crearProyectoDto);
    return this.proyectoRepository.save(proyecto);
  }

  findAll(): Promise<Proyecto[]> {
    // Devuelve todos los proyectos, incluyendo sus costos y beneficios
    return this.proyectoRepository.find();
  }
// Busca un proyecto por su ID. Si no se encuentra, lanza una excepción NotFoundException.
  async findOne(id: string): Promise<Proyecto> {
    const proyecto = await this.proyectoRepository.findOne({
      where: { id },
      relations: {
        costos: true,
        beneficios: true,
      },
    });
    if (!proyecto) {
      throw new NotFoundException(`Proyecto con ID "${id}" no encontrado`);
    }
    return proyecto;
  }
// Actualiza un proyecto existente por su ID. Si el proyecto no existe, lanza una excepción NotFoundException.
  async update(id: string, actualizarProyectoDto: ActualizarProyectoDto): Promise<Proyecto> {
    const proyecto = await this.proyectoRepository.preload({
      id,
      ...actualizarProyectoDto,
    });
    if (!proyecto) {
      throw new NotFoundException(`Proyecto con ID "${id}" no encontrado`);
    }
    return this.proyectoRepository.save(proyecto);
  }
// Elimina un proyecto por su ID. Si el proyecto no existe, lanza una excepción NotFoundException.
  async remove(id: string): Promise<void> {
    await this.entityManager.transaction(async (transactionalEntityManager) => {
      // Primer verifica que el proyecto existe
      const proyecto = await transactionalEntityManager.findOne(Proyecto, { where: { id } });
      if (!proyecto) {
        throw new NotFoundException(`Proyecto con ID "${id}" no encontrado`);
      }

      // Elimina los costos y beneficios asociados al proyecto
      await transactionalEntityManager.delete(Costo, { proyecto: { id } });
      await transactionalEntityManager.delete(Beneficio, { proyecto: { id } });

      // Finalmente elimina el proyecto
      await transactionalEntityManager.remove(proyecto);
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CrearProyectoDto } from './dtos/crear-proyecto.dto';
import { ActualizarProyectoDto } from './dtos/actualizar-proyecto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { EntityManager, Repository } from 'typeorm';
import { FlujoFinanciero } from '../flujos-financieros/entities/flujo-financiero.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
    private readonly entityManager: EntityManager,
  ) {}
  // Crea un nuevo proyecto y lo guarda en la base de datos.
  create(crearProyectoDto: CrearProyectoDto, user: User): Promise<Proyecto> {
    const proyecto = this.proyectoRepository.create(crearProyectoDto);
    proyecto.user = user;
    return this.proyectoRepository.save(proyecto);
  }

  findAll(): Promise<Proyecto[]> {
    // Devuelve todos los proyectos, incluyendo sus costos y beneficios
    return this.proyectoRepository.find({
      relations: {
        flujos: true,
      },
    });
  }

  findByUser(user: User): Promise<Proyecto[]> {
    // Busca todos los proyectos asociados a un usuario específico
    return this.proyectoRepository.find({
      where: { user: { id: user.id } },
      relations: {
        flujos: true,
      },
    });
  }

  // Busca un proyecto por su ID. Si no se encuentra, lanza una excepción NotFoundException.
  async findOne(id: string): Promise<Proyecto> {
    const proyecto = await this.proyectoRepository.findOne({
      where: { id },
      relations: {
        flujos: true,
      },
    });
    if (!proyecto) {
      throw new NotFoundException(`Proyecto con ID "${id}" no encontrado`);
    }
    return proyecto;
  }
  // Actualiza un proyecto existente por su ID. Si el proyecto no existe, lanza una excepción NotFoundException.
  async update(
    id: string,
    actualizarProyectoDto: ActualizarProyectoDto,
  ): Promise<Proyecto> {
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
      const proyecto = await transactionalEntityManager.findOne(Proyecto, {
        where: { id },
      });
      if (!proyecto) {
        throw new NotFoundException(`Proyecto con ID "${id}" no encontrado`);
      }

      // Elimina los flujos financieros asociados al proyecto
      await transactionalEntityManager.delete(FlujoFinanciero, {
        proyecto: { id },
      });

      // Finalmente elimina el proyecto
      await transactionalEntityManager.remove(proyecto);
    });
  }
}

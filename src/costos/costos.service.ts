import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CrearCostoDto } from './dtos/crear-costo.dto';
import { ActualizarCostoDto } from './dtos/actualizar-costo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Costo } from './entities/costo.entity';
import { Repository } from 'typeorm';
import { ProyectosService } from '../proyectos/proyectos.service';

@Injectable() // Este servicio maneja la lógica de negocio relacionada con los costos, incluyendo su creación,
export class CostosService {
  constructor(
    // Inyecta el repositorio de Costo y el servicio de Proyectos
    @InjectRepository(Costo)
    private readonly costoRepository: Repository<Costo>,
    private readonly proyectosService: ProyectosService,
  ) {}
  // Crea un nuevo costo asociado a un proyecto y lo guarda en la base de datos.
  async create(crearCostoDto: CrearCostoDto): Promise<Costo> {
    const proyecto = await this.proyectosService.findOne(
      crearCostoDto.proyectoId,
    );
    if (proyecto.horizonteAnalisis !== crearCostoDto.valoresAnuales.length) {
      throw new BadRequestException(
        `El horizonte de análisis del proyecto (${proyecto.horizonteAnalisis} años) no coincide con la cantidad de valores anuales proporcionados (${crearCostoDto.valoresAnuales.length} años)`,
      );
    }
    const costo = this.costoRepository.create({
      ...crearCostoDto,
      proyecto,
    });
    return this.costoRepository.save(costo);
  }
  // Devuelve todos los costos almacenados en la base de datos.
  findAll(): Promise<Costo[]> {
    return this.costoRepository.find();
  }
  // Busca un costo por su ID. Si no se encuentra, lanza una excepción NotFoundException.
  async findOne(id: string): Promise<Costo> {
    const costo = await this.costoRepository.findOne({ where: { id } });
    if (!costo) {
      throw new NotFoundException(`Costo con ID "${id}" no encontrado`);
    }
    return costo;
  }
  // Actualiza un costo existente por su ID. Si el costo no existe, lanza una excepción NotFoundException.
  async update(
    id: string,
    actualizarCostoDto: ActualizarCostoDto,
  ): Promise<Costo> {
    const costo = await this.costoRepository.preload({
      id,
      ...actualizarCostoDto,
    });
    if (!costo) {
      throw new NotFoundException(`Costo con ID "${id}" no encontrado`); // Verifica si el costo existe
    }

    if (actualizarCostoDto.valoresAnuales) {
      if (actualizarCostoDto.proyectoId) {
        const proyecto = await this.proyectosService.findOne(
          actualizarCostoDto.proyectoId,
        );
        if (
          proyecto.horizonteAnalisis !==
          actualizarCostoDto.valoresAnuales.length
        ) {
          throw new BadRequestException(
            `El horizonte de análisis del proyecto (${proyecto.horizonteAnalisis} años) no coincide con la cantidad de valores anuales proporcionados (${actualizarCostoDto.valoresAnuales.length} años)`,
          );
        }
        costo.proyecto = proyecto; // Asocia el proyecto al costo actualizado
      } else {
        throw new BadRequestException(
          'Si se actualizan los valores anuales, se debe proporcionar el ID del proyecto.',
        );
      }
    }

    return this.costoRepository.save(costo);
  }
  // Elimina un costo por su ID. Si el costo no existe, lanza una excepción NotFoundException.
  async remove(id: string): Promise<void> {
    const costo = await this.findOne(id);
    await this.costoRepository.remove(costo); // Elimina el costo encontrado
  }
}

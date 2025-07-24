import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { ProyectosService } from '../proyectos/proyectos.service';
import { FlujoFinanciero } from './entities/flujo-financiero.entity';
import { ActualizarFlujoFinancieroDto } from './dtos/actualizar-flujo-financiero.dto';
import { CrearFlujoFinancieroDto } from './dtos/crear-flujo-financiero.dto';

@Injectable() // Este servicio maneja la lógica de negocio relacionada con los costos, incluyendo su creación,
export class FlujosFinancierosService {
  constructor(
    // Inyecta el repositorio de Costo y el servicio de Proyectos
    @InjectRepository(FlujoFinanciero)
    private readonly flujoFinancieroRepository: Repository<FlujoFinanciero>,
    private readonly proyectosService: ProyectosService,
  ) {}
  // Crea un nuevo costo asociado a un proyecto y lo guarda en la base de datos.
  async create(
    crearFlujoDto: CrearFlujoFinancieroDto,
  ): Promise<FlujoFinanciero> {
    const proyecto = await this.proyectosService.findOne(
      crearFlujoDto.proyectoId,
    );
    if (proyecto.horizonteAnalisis !== crearFlujoDto.valoresAnuales.length) {
      throw new BadRequestException(
        `El horizonte de análisis del proyecto (${proyecto.horizonteAnalisis} años) no coincide con la cantidad de valores anuales proporcionados (${crearFlujoDto.valoresAnuales.length} años)`,
      );
    }
    const flujoFinanciero = this.flujoFinancieroRepository.create({
      ...crearFlujoDto,
      proyecto,
    });
    return this.flujoFinancieroRepository.save(flujoFinanciero);
  }
  // Devuelve todos los costos almacenados en la base de datos.
  findAll(): Promise<FlujoFinanciero[]> {
    return this.flujoFinancieroRepository.find({
      relations: { proyecto: true }, // Incluye la relación con el proyecto
    });
  }
  // Busca un costo por su ID. Si no se encuentra, lanza una excepción NotFoundException.
  async findOne(id: string): Promise<FlujoFinanciero> {
    const flujoFinanciero = await this.flujoFinancieroRepository.findOne({
      where: { id },
      relations: { proyecto: true },
    });
    if (!flujoFinanciero) {
      throw new NotFoundException(
        `Flujo financiero con ID "${id}" no encontrado`,
      );
    }
    return flujoFinanciero;
  }
  // Actualiza un costo existente por su ID. Si el costo no existe, lanza una excepción NotFoundException.
  async update(
    id: string,
    actualizarCostoDto: ActualizarFlujoFinancieroDto,
  ): Promise<FlujoFinanciero> {
    const flujoFinanciero = await this.flujoFinancieroRepository.preload({
      id,
      ...actualizarCostoDto,
    });
    if (!flujoFinanciero) {
      throw new NotFoundException(
        `Flujo financiero con ID "${id}" no encontrado`,
      ); // Verifica si el flujo financiero existe
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
        flujoFinanciero.proyecto = proyecto; // Asocia el proyecto al flujo financiero actualizado
      } else {
        throw new BadRequestException(
          'Si se actualizan los valores anuales, se debe proporcionar el ID del proyecto.',
        );
      }
    }

    return this.flujoFinancieroRepository.save(flujoFinanciero);
  }
  // Elimina un costo por su ID. Si el costo no existe, lanza una excepción NotFoundException.
  async remove(id: string): Promise<void> {
    const flujoFinanciero = await this.findOne(id);
    await this.flujoFinancieroRepository.remove(flujoFinanciero); // Elimina el flujo financiero encontrado
  }
}

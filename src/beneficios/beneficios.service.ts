import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CrearBeneficioDto } from './dtos/crear-beneficio.dto';
import { ActualizarBeneficioDto } from './dtos/actualizar-beneficio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Beneficio } from './entities/beneficio.entity';
import { Repository } from 'typeorm';
import { ProyectosService } from '../proyectos/proyectos.service';
// Este servicio maneja la lógica de negocio relacionada con los beneficios, incluyendo su creación,
@Injectable()
export class BeneficiosService {
  constructor(
    @InjectRepository(Beneficio) // Inyecta el repositorio de Beneficio
    private readonly beneficioRepository: Repository<Beneficio>,
    private readonly proyectosService: ProyectosService,
  ) {}
  // Crea un nuevo beneficio asociado a un proyecto y lo guarda en la base de datos.
  async create(crearBeneficioDto: CrearBeneficioDto): Promise<Beneficio> {
    // Verifica que el proyecto existe
    const proyecto = await this.proyectosService.findOne(
      crearBeneficioDto.proyectoId,
    );

    if (
      proyecto.horizonteAnalisis !== crearBeneficioDto.valoresAnuales.length
    ) {
      throw new BadRequestException(
        `El horizonte de análisis del proyecto (${proyecto.horizonteAnalisis} años) no coincide con la cantidad de valores anuales proporcionados (${crearBeneficioDto.valoresAnuales.length} años)`,
      );
    }

    const beneficio = this.beneficioRepository.create({
      ...crearBeneficioDto,
      proyecto,
    });
    return this.beneficioRepository.save(beneficio);
  }
  // Devuelve todos los beneficios almacenados en la base de datos.
  findAll(): Promise<Beneficio[]> {
    return this.beneficioRepository.find({ relations: { proyecto: true } });
  }
  // Busca un beneficio por su ID. Si no se encuentra, lanza una excepción NotFoundException.
  async findOne(id: string): Promise<Beneficio> {
    const beneficio = await this.beneficioRepository.findOne({
      where: { id },
      relations: { proyecto: true },
    });
    if (!beneficio) {
      throw new NotFoundException(`Beneficio con ID "${id}" no encontrado`);
    }
    return beneficio;
  }
  // Actualiza un beneficio existente por su ID. Si el beneficio no existe, lanza una excepción NotFoundException.
  async update(
    id: string,
    actualizarBeneficioDto: ActualizarBeneficioDto,
  ): Promise<Beneficio> {
    const beneficio = await this.beneficioRepository.preload({
      id,
      ...actualizarBeneficioDto,
    });
    if (!beneficio) {
      throw new NotFoundException(`Beneficio con ID "${id}" no encontrado`);
    }

    if (actualizarBeneficioDto.valoresAnuales) {
      if (actualizarBeneficioDto.proyectoId) {
        // Verifica que el proyecto existe
        const proyecto = await this.proyectosService.findOne(
          actualizarBeneficioDto.proyectoId,
        );

        if (
          proyecto.horizonteAnalisis !==
          actualizarBeneficioDto.valoresAnuales.length
        ) {
          throw new BadRequestException(
            `El horizonte de análisis del proyecto (${proyecto.horizonteAnalisis} años) no coincide con la cantidad de valores anuales proporcionados (${actualizarBeneficioDto.valoresAnuales.length} años)`,
          );
        }

        beneficio.proyecto = proyecto;
      } else {
        throw new BadRequestException(
          'Si se actualizan los valores anuales, también debe proporcionarse el ID del proyecto',
        );
      }
    }

    return this.beneficioRepository.save(beneficio);
  }
  // Elimina un beneficio por su ID. Si el beneficio no existe, lanza una excepción NotFoundException.
  async remove(id: string): Promise<void> {
    const beneficio = await this.findOne(id);
    await this.beneficioRepository.remove(beneficio);
  }
}

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
import { ItemFlujoBase } from 'src/items-flujo-base/entities/item-flujo-base.entity';
import { CategoriaFlujo } from 'src/categorias-flujo/entities/categoria-flujo.entity';

@Injectable() // Este servicio maneja la lógica de negocio relacionada con los costos, incluyendo su creación,
export class FlujosFinancierosService {
  constructor(
    // Inyecta el repositorio de Costo y el servicio de Proyectos
    @InjectRepository(FlujoFinanciero)
    private readonly flujoFinancieroRepository: Repository<FlujoFinanciero>,

    @InjectRepository(CategoriaFlujo)
    private readonly categoriaFlujoRepository: Repository<CategoriaFlujo>,

    @InjectRepository(ItemFlujoBase)
    private readonly itemFlujoBaseRepository: Repository<ItemFlujoBase>,
    private readonly proyectosService: ProyectosService,
  ) {}
  // Crea un nuevo costo asociado a un proyecto y lo guarda en la base de datos.
  async create(
    crearFlujoDto: CrearFlujoFinancieroDto,
  ): Promise<FlujoFinanciero> {
    const { proyectoId, categoriaId, itemFlujoBaseId, valoresAnuales } =
      crearFlujoDto;

    // --- VALIDACIÓN DE RELACIONES (LA PARTE QUE FALTABA) ---

    // 1. Validar que el Proyecto existe
    const proyecto = await this.proyectosService.findOne(proyectoId);

    // 2. Validar que la Categoría existe
    const categoria = await this.categoriaFlujoRepository.findOneBy({
      id: categoriaId,
    });
    if (!categoria) {
      throw new NotFoundException(
        `Categoría con ID "${categoriaId}" no encontrada.`,
      );
    }

    // 3. Validar que el ItemFlujoBase existe
    const itemFlujoBase = await this.itemFlujoBaseRepository.findOneBy({
      id: itemFlujoBaseId,
    });
    if (!itemFlujoBase) {
      throw new NotFoundException(
        `Ítem de flujo base con ID "${itemFlujoBaseId}" no encontrado.`,
      );
    }

    // --- FIN DE LA VALIDACIÓN ---

    // Validar consistencia del horizonte de análisis
    if (proyecto.horizonteAnalisis !== valoresAnuales.length) {
      throw new BadRequestException(
        `El horizonte de análisis del proyecto (${proyecto.horizonteAnalisis} años) no coincide con la cantidad de valores anuales proporcionados (${valoresAnuales.length} años)`,
      );
    }

    // Crear la instancia del flujo financiero, ahora incluyendo las relaciones
    const nuevoFlujo = this.flujoFinancieroRepository.create({
      ...crearFlujoDto,
      proyecto, // Asocia la entidad completa del proyecto
      categoria, // Asocia la entidad completa de la categoría
      itemFlujoBase, // Asocia la entidad completa del ítem base
    });

    // Guardar en la base de datos
    return this.flujoFinancieroRepository.save(nuevoFlujo);
  }
  // Devuelve todos los costos almacenados en la base de datos.
  findAll(): Promise<FlujoFinanciero[]> {
    return this.flujoFinancieroRepository.find({
      relations: { proyecto: true, categoria: true, itemFlujoBase: true }, // Incluye la relación con el proyecto
    });
  }
  // Busca un costo por su ID. Si no se encuentra, lanza una excepción NotFoundException.
  async findOne(id: string): Promise<FlujoFinanciero> {
    const flujoFinanciero = await this.flujoFinancieroRepository.findOne({
      where: { id },
      relations: { proyecto: true, categoria: true, itemFlujoBase: true },
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

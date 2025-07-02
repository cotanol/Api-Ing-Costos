import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { CrearProyectoDto } from './dtos/crear-proyecto.dto';
import { ActualizarProyectoDto } from './dtos/actualizar-proyecto.dto';

// Controlador para manejar las operaciones relacionadas con los proyectos.
@Controller('proyectos')
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}
  // Define las rutas y métodos HTTP para manejar las operaciones CRUD de los proyectos.
  @Post()
  create(@Body() crearProyectoDto: CrearProyectoDto) {
    return this.proyectosService.create(crearProyectoDto);
  }
  // Obtiene todos los proyectos. En la vista de lista, no es necesario cargar todas las relaciones,
  @Get()
  findAll() {
    return this.proyectosService.findAll();
  }
  // Obtiene un proyecto específico por su ID, incluyendo sus costos y beneficios asociados.
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.proyectosService.findOne(id);
  }
  // Actualiza un proyecto existente por su ID. Si el proyecto no existe, lanza una excepción.
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() actualizarProyectoDto: ActualizarProyectoDto,
  ) {
    return this.proyectosService.update(id, actualizarProyectoDto);
  }
  // Elimina un proyecto por su ID. Si el proyecto no existe, lanza una excepción.
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.proyectosService.remove(id);
  }
}

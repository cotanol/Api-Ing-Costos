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
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.interface';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

// Controlador para manejar las operaciones relacionadas con los proyectos.
@Controller('proyectos')
@Auth()
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}
  // Define las rutas y métodos HTTP para manejar las operaciones CRUD de los proyectos.
  @Post()
  create(@Body() crearProyectoDto: CrearProyectoDto, @GetUser() user: User) {
    return this.proyectosService.create(crearProyectoDto, user);
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

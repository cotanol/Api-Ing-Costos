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
import { FlujosFinancierosService } from './flujos-financieros.service';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { CrearFlujoFinancieroDto } from './dtos/crear-flujo-financiero.dto';
import { ActualizarFlujoFinancieroDto } from './dtos/actualizar-flujo-financiero.dto';
// Controlador para manejar las operaciones relacionadas con los costos.

@Auth()
@Controller('flujos-financieros')
export class FlujosFinancierosController {
  constructor(
    private readonly flujosFinancierosService: FlujosFinancierosService,
  ) {}

  // Define las rutas y métodos HTTP para manejar las operaciones CRUD de los costos.
  @Post()
  create(@Body() crearFlujoDto: CrearFlujoFinancieroDto) {
    return this.flujosFinancierosService.create(crearFlujoDto);
  }

  // Obtiene todos los costos. En la vista de lista, no es necesario cargar todas las relaciones,
  @Get()
  findAll() {
    return this.flujosFinancierosService.findAll();
  }

  // Obtiene un costo específico por su ID, incluyendo sus proyectos asociados.
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.flujosFinancierosService.findOne(id);
  }

  // Actualiza un costo existente por su ID. Si el costo no existe, lanza una excepción.
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() actualizarFlujoDto: ActualizarFlujoFinancieroDto,
  ) {
    return this.flujosFinancierosService.update(id, actualizarFlujoDto);
  }

  // Elimina un costo por su ID. Si el costo no existe, lanza una excepción.
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.flujosFinancierosService.remove(id);
  }
}

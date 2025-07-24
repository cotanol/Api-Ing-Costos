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
import { CostosService } from './costos.service';
import { CrearCostoDto } from './dtos/crear-costo.dto';
import { ActualizarCostoDto } from './dtos/actualizar-costo.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
// Controlador para manejar las operaciones relacionadas con los costos.

@Auth()
@Controller('costos')
export class CostosController {
  constructor(private readonly costosService: CostosService) {}

  // Define las rutas y métodos HTTP para manejar las operaciones CRUD de los costos.
  @Post()
  create(@Body() crearCostoDto: CrearCostoDto) {
    return this.costosService.create(crearCostoDto);
  }

  // Obtiene todos los costos. En la vista de lista, no es necesario cargar todas las relaciones,
  @Get()
  findAll() {
    return this.costosService.findAll();
  }

  // Obtiene un costo específico por su ID, incluyendo sus proyectos asociados.
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.costosService.findOne(id);
  }

  // Actualiza un costo existente por su ID. Si el costo no existe, lanza una excepción.
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() actualizarCostoDto: ActualizarCostoDto,
  ) {
    return this.costosService.update(id, actualizarCostoDto);
  }

  // Elimina un costo por su ID. Si el costo no existe, lanza una excepción.
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.costosService.remove(id);
  }
}

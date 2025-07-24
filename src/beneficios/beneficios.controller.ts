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
import { BeneficiosService } from './beneficios.service';
import { CrearBeneficioDto } from './dtos/crear-beneficio.dto';
import { ActualizarBeneficioDto } from './dtos/actualizar-beneficio.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
// Controlador para manejar las operaciones relacionadas con los beneficios.
@Controller('beneficios')
@Auth()
export class BeneficiosController {
  constructor(private readonly beneficiosService: BeneficiosService) {}
  // Define las rutas y métodos HTTP para manejar las operaciones CRUD de los beneficios.
  @Post()
  create(@Body() crearBeneficioDto: CrearBeneficioDto) {
    return this.beneficiosService.create(crearBeneficioDto);
  }
  // Obtiene todos los beneficios. En la vista de lista, no es necesario cargar todas las relaciones,
  @Get()
  findAll() {
    return this.beneficiosService.findAll();
  }
  // Obtiene un beneficio específico por su ID, incluyendo sus proyectos asociados.
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.beneficiosService.findOne(id);
  }
  // Actualiza un beneficio existente por su ID. Si el beneficio no existe, lanza una excepción.
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() actualizarBeneficioDto: ActualizarBeneficioDto,
  ) {
    return this.beneficiosService.update(id, actualizarBeneficioDto);
  }
  // Elimina un beneficio por su ID. Si el beneficio no existe, lanza una excepción.
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.beneficiosService.remove(id);
  }
}

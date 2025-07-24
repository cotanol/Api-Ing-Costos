import { Body, Controller, Get, Post } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.interface';
import { CategoriasFlujoService } from './categorias-flujo.service';
import { CrearCategoriaFlujoDto } from './dtos/crear-categoria-flujo.dto';

@Controller('categorias-flujo')
export class CategoriasFlujoController {
  constructor(
    private readonly categoriasFlujoService: CategoriasFlujoService,
  ) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() crearCategoriaDto: CrearCategoriaFlujoDto) {
    return this.categoriasFlujoService.create(crearCategoriaDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.categoriasFlujoService.findAll();
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriasCostoService } from './categorias-costo.service';
import { CrearCategoriaCostoDto } from './dtos/crear-categoria-costo.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.interface';

@Controller('categorias-costo')
export class CategoriasCostoController {
  constructor(
    private readonly categoriasCostoService: CategoriasCostoService,
  ) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() crearCategoriaDto: CrearCategoriaCostoDto) {
    return this.categoriasCostoService.create(crearCategoriaDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.categoriasCostoService.findAll();
  }
}

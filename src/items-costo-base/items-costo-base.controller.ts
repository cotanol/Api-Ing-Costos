import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ItemsCostoBaseService } from './items-costo-base.service';
import { CrearItemCostoBaseDto } from './dtos/crear-item-costo-base.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.interface';

@Controller('items-costo-base')
export class ItemsCostoBaseController {
  constructor(private readonly itemsService: ItemsCostoBaseService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() dto: CrearItemCostoBaseDto) {
    return this.itemsService.create(dto);
  }

  @Get()
  @Auth()
  findAll(@Query('categoriaId') categoriaId?: string) {
    return this.itemsService.findAll(categoriaId);
  }
}

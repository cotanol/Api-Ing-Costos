import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.interface';
import { ItemsFlujoBaseService } from './items-flujo-base.service';
import { CrearItemFlujoBaseDto } from './dtos/crear-item-flujo-base.dto';

@Controller('items-flujo-base')
export class ItemsFlujoBaseController {
  constructor(private readonly itemsService: ItemsFlujoBaseService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() dto: CrearItemFlujoBaseDto) {
    return this.itemsService.create(dto);
  }

  @Get()
  @Auth()
  findAll(@Query('categoriaId') categoriaId?: string) {
    return this.itemsService.findAll(categoriaId);
  }
}

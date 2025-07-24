import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemFlujoBase } from './entities/item-flujo-base.entity';

import { AuthModule } from 'src/auth/auth.module';
import { CategoriaFlujo } from 'src/categorias-flujo/entities/categoria-flujo.entity';
import { ItemsFlujoBaseController } from './items-flujo-base.controller';
import { ItemsFlujoBaseService } from './items-flujo-base.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([ItemFlujoBase, CategoriaFlujo]),
  ],
  controllers: [ItemsFlujoBaseController],
  providers: [ItemsFlujoBaseService],
})
export class ItemsFlujoBaseModule {}

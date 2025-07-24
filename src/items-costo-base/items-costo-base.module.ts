import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemCostoBase } from './entities/item-costo-base.entity';
import { ItemsCostoBaseController } from './items-costo-base.controller';
import { ItemsCostoBaseService } from './items-costo-base.service';
import { CategoriaCosto } from '../categorias-costo/entities/categoria-costo.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([ItemCostoBase, CategoriaCosto]),
  ],
  controllers: [ItemsCostoBaseController],
  providers: [ItemsCostoBaseService],
})
export class ItemsCostoBaseModule {}

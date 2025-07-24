import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaCosto } from './entities/categoria-costo.entity';
import { CategoriasCostoController } from './categorias-costo.controller';
import { CategoriasCostoService } from './categorias-costo.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaCosto]), AuthModule],
  controllers: [CategoriasCostoController],
  providers: [CategoriasCostoService],
})
export class CategoriasCostoModule {}

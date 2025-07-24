import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { CategoriaFlujo } from './entities/categoria-flujo.entity';
import { CategoriasFlujoController } from './categorias-flujo.controller';
import { CategoriasFlujoService } from './categorias-flujo.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaFlujo]), AuthModule],
  controllers: [CategoriasFlujoController],
  providers: [CategoriasFlujoService],
})
export class CategoriasFlujoModule {}

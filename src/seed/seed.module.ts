import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ProyectosModule } from 'src/proyectos/proyectos.module';
import { FlujosFinancierosModule } from 'src/flujos-financieros/flujos-financieros.module';
import { CategoriasFlujoModule } from 'src/categorias-flujo/categorias-flujo.module';
import { ItemsFlujoBaseModule } from 'src/items-flujo-base/items-flujo-base.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    AuthModule,
    ProyectosModule,
    FlujosFinancierosModule,
    CategoriasFlujoModule,
    ItemsFlujoBaseModule,
  ],
})
export class SeedModule {}

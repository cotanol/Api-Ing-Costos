import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCostDto } from './dto/create-cost.dto';
import { UpdateCostDto } from './dto/update-cost.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cost } from './entities/cost.entity';
import { Repository } from 'typeorm';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class CostsService {
  constructor(
    @InjectRepository(Cost)
    private readonly costRepository: Repository<Cost>,
    private readonly projectsService: ProjectsService,
  ) {}

  async create(createCostDto: CreateCostDto): Promise<Cost> {
    const project = await this.projectsService.findOne(createCostDto.projectId);
    const cost = this.costRepository.create({
      ...createCostDto,
      project,
    });
    return this.costRepository.save(cost);
  }

  findAll(): Promise<Cost[]> {
    return this.costRepository.find();
  }

  async findOne(id: string): Promise<Cost> {
    const cost = await this.costRepository.findOne({ where: { id } });
    if (!cost) {
      throw new NotFoundException(`Cost with ID "${id}" not found`);
    }
    return cost;
  }

  async update(id: string, updateCostDto: UpdateCostDto): Promise<Cost> {
    const cost = await this.costRepository.preload({
      id,
      ...updateCostDto,
    });
    if (!cost) {
      throw new NotFoundException(`Cost with ID "${id}" not found`);
    }
    return this.costRepository.save(cost);
  }

  async remove(id: string): Promise<void> {
    const cost = await this.findOne(id);
    await this.costRepository.remove(cost);
  }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBenefitDto } from './dto/create-benefit.dto';
import { UpdateBenefitDto } from './dto/update-benefit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Benefit } from './entities/benefit.entity';
import { Repository } from 'typeorm';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class BenefitsService {
  constructor(
    @InjectRepository(Benefit)
    private readonly benefitRepository: Repository<Benefit>,
    private readonly projectsService: ProjectsService,
  ) {}

  async create(createBenefitDto: CreateBenefitDto): Promise<Benefit> {
    const project = await this.projectsService.findOne(
      createBenefitDto.projectId,
    );
    const benefit = this.benefitRepository.create({
      ...createBenefitDto,
      project,
    });
    return this.benefitRepository.save(benefit);
  }

  findAll(): Promise<Benefit[]> {
    return this.benefitRepository.find();
  }

  async findOne(id: string): Promise<Benefit> {
    const benefit = await this.benefitRepository.findOne({ where: { id } });
    if (!benefit) {
      throw new NotFoundException(`Benefit with ID "${id}" not found`);
    }
    return benefit;
  }

  async update(
    id: string,
    updateBenefitDto: UpdateBenefitDto,
  ): Promise<Benefit> {
    const benefit = await this.benefitRepository.preload({
      id,
      ...updateBenefitDto,
    });
    if (!benefit) {
      throw new NotFoundException(`Benefit with ID "${id}" not found`);
    }
    return this.benefitRepository.save(benefit);
  }

  async remove(id: string): Promise<void> {
    const benefit = await this.findOne(id);
    await this.benefitRepository.remove(benefit);
  }
}
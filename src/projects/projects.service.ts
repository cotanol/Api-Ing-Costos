import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { EntityManager, Repository } from 'typeorm';
import { Cost } from 'src/costs/entities/cost.entity';
import { Benefit } from 'src/benefits/entities/benefit.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly entityManager: EntityManager,
  ) {}

  create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectRepository.create(createProjectDto);
    return this.projectRepository.save(project);
  }

  findAll(): Promise<Project[]> {
    // For the list view, we don't need to load all relations, making it faster.
    return this.projectRepository.find();
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: {
        costs: true,
        benefits: true,
      },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.projectRepository.preload({
      id,
      ...updateProjectDto,
    });
    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }
    return this.projectRepository.save(project);
  }

  async remove(id: string): Promise<void> {
    await this.entityManager.transaction(async (transactionalEntityManager) => {
      // First, ensure the project exists
      const project = await transactionalEntityManager.findOne(Project, { where: { id } });
      if (!project) {
        throw new NotFoundException(`Project with ID "${id}" not found`);
      }

      // Delete associated costs and benefits
      await transactionalEntityManager.delete(Cost, { project: { id } });
      await transactionalEntityManager.delete(Benefit, { project: { id } });

      // Finally, delete the project itself
      await transactionalEntityManager.remove(project);
    });
  }
}
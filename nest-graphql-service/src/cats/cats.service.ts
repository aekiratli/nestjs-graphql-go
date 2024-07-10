// src/cats/cats.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';
import { CatInput } from './inputs/cat.input';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}

  async create(catInput: CatInput): Promise<Cat> {
    const newCat = this.catsRepository.create(catInput);
    return this.catsRepository.save(newCat);
  }

  async findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }
  async findOne(id: number): Promise<Cat> {
    const cat = await this.catsRepository.findOne({
      where: { id },
    });
  
    if (!cat) {
      throw new Error(`No cat found with the id: ${id}`);
    }
  
    return cat;
  }
  async update(id: number, catInput: CatInput): Promise<Cat> {
    const catToUpdate = await this.catsRepository.findOne({
      where: { id },
    });
    if (!catToUpdate) {
      throw new Error(`The cat with id: ${id} does not exist`);
    }
    const updatedCat = this.catsRepository.merge(catToUpdate, catInput);
    return this.catsRepository.save(updatedCat);
  }

  async remove(id: number): Promise<void> {
    const catToRemove = await this.catsRepository.findOne({
      where: { id },
    });
    if (!catToRemove) {
      throw new Error(`The cat with id: ${id} does not exist`);
    }
    await this.catsRepository.remove(catToRemove);
  }
}

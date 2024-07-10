// src/cats/cats.resolver.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CatsResolver } from './cats.resolver';
import { CatsService } from './cats.service';
import { Cat } from './cat.entity';
import { CatInput } from './inputs/cat.input';

describe('CatsResolver', () => {
  let resolver: CatsResolver;
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsResolver,
        {
          provide: CatsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(new Cat()),
            create: jest.fn().mockResolvedValue(new Cat()),
            update: jest.fn().mockResolvedValue(new Cat()),
            remove: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    resolver = module.get<CatsResolver>(CatsResolver);
    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return all cats', async () => {
    const result = await resolver.cats();
    expect(result).toEqual([]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a cat by id', async () => {
    const result = await resolver.cat(1);
    expect(result).toBeInstanceOf(Cat);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should create a cat', async () => {
    const catInput: CatInput = { name: 'Test', age: 1, breed: 'Test' };
    const result = await resolver.createCat(catInput);
    expect(result).toBeInstanceOf(Cat);
    expect(service.create).toHaveBeenCalledWith(catInput);
  });

  it('should update a cat', async () => {
    const catInput: CatInput = { name: 'Test', age: 1, breed: 'Test' };
    const result = await resolver.updateCat(1, catInput);
    expect(result).toBeInstanceOf(Cat);
    expect(service.update).toHaveBeenCalledWith(1, catInput);
  });

  it('should delete a cat', async () => {
    const result = await resolver.deleteCat(1);
    expect(result).toBe(true);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
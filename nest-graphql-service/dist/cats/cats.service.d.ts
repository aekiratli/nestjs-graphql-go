import { Repository } from 'typeorm';
import { Cat } from './cat.entity';
import { CatInput } from './inputs/cat.input';
export declare class CatsService {
    private catsRepository;
    constructor(catsRepository: Repository<Cat>);
    create(catInput: CatInput): Promise<Cat>;
    findAll(): Promise<Cat[]>;
    findOne(id: number): Promise<Cat>;
    update(id: number, catInput: CatInput): Promise<Cat>;
    remove(id: number): Promise<void>;
}

import { CatsService } from './cats.service';
import { Cat } from './cat.entity';
import { CatInput } from './inputs/cat.input';
export declare class CatsResolver {
    private readonly catsService;
    constructor(catsService: CatsService);
    cats(): Promise<Cat[]>;
    cat(id: number): Promise<Cat>;
    createCat(catInput: CatInput): Promise<Cat>;
    updateCat(id: number, catInput: CatInput): Promise<Cat>;
    deleteCat(id: number): Promise<boolean>;
}

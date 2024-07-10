"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cat_entity_1 = require("./cat.entity");
let CatsService = class CatsService {
    constructor(catsRepository) {
        this.catsRepository = catsRepository;
    }
    async create(catInput) {
        const newCat = this.catsRepository.create(catInput);
        return this.catsRepository.save(newCat);
    }
    async findAll() {
        return this.catsRepository.find();
    }
    async findOne(id) {
        const cat = await this.catsRepository.findOne({
            where: { id },
        });
        if (!cat) {
            throw new Error(`No cat found with the id: ${id}`);
        }
        return cat;
    }
    async update(id, catInput) {
        const catToUpdate = await this.catsRepository.findOne({
            where: { id },
        });
        if (!catToUpdate) {
            throw new Error(`The cat with id: ${id} does not exist`);
        }
        const updatedCat = this.catsRepository.merge(catToUpdate, catInput);
        return this.catsRepository.save(updatedCat);
    }
    async remove(id) {
        const catToRemove = await this.catsRepository.findOne({
            where: { id },
        });
        if (!catToRemove) {
            throw new Error(`The cat with id: ${id} does not exist`);
        }
        await this.catsRepository.remove(catToRemove);
    }
};
exports.CatsService = CatsService;
exports.CatsService = CatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cat_entity_1.Cat)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CatsService);
//# sourceMappingURL=cats.service.js.map
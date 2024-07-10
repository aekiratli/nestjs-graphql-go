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
exports.CatsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const cats_service_1 = require("./cats.service");
const cat_entity_1 = require("./cat.entity");
const cat_input_1 = require("./inputs/cat.input");
let CatsResolver = class CatsResolver {
    constructor(catsService) {
        this.catsService = catsService;
    }
    async cats() {
        return this.catsService.findAll();
    }
    async cat(id) {
        return this.catsService.findOne(id);
    }
    async createCat(catInput) {
        return this.catsService.create(catInput);
    }
    async updateCat(id, catInput) {
        return this.catsService.update(id, catInput);
    }
    async deleteCat(id) {
        await this.catsService.remove(id);
        return true;
    }
};
exports.CatsResolver = CatsResolver;
__decorate([
    (0, graphql_1.Query)(() => [cat_entity_1.Cat]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CatsResolver.prototype, "cats", null);
__decorate([
    (0, graphql_1.Query)(() => cat_entity_1.Cat),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CatsResolver.prototype, "cat", null);
__decorate([
    (0, graphql_1.Mutation)(() => cat_entity_1.Cat),
    __param(0, (0, graphql_1.Args)('catInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cat_input_1.CatInput]),
    __metadata("design:returntype", Promise)
], CatsResolver.prototype, "createCat", null);
__decorate([
    (0, graphql_1.Mutation)(() => cat_entity_1.Cat),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('catInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, cat_input_1.CatInput]),
    __metadata("design:returntype", Promise)
], CatsResolver.prototype, "updateCat", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CatsResolver.prototype, "deleteCat", null);
exports.CatsResolver = CatsResolver = __decorate([
    (0, graphql_1.Resolver)(() => cat_entity_1.Cat),
    __metadata("design:paramtypes", [cats_service_1.CatsService])
], CatsResolver);
//# sourceMappingURL=cats.resolver.js.map
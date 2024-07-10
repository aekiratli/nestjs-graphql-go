// src/cats/cats.resolver.ts
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { Cat } from './cat.entity';
import { CatInput } from './inputs/cat.input';

@Resolver(() => Cat)
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query(() => [Cat])
  async cats() {
    return this.catsService.findAll();
  }

  @Query(() => Cat)
  async cat(@Args('id', { type: () => Int }) id: number) {
    return this.catsService.findOne(id);
  }

  @Mutation(() => Cat)
  async createCat(@Args('catInput') catInput: CatInput) {
    return this.catsService.create(catInput);
  }

  @Mutation(() => Cat)
  async updateCat(
    @Args('id', { type: () => Int }) id: number,
    @Args('catInput') catInput: CatInput,
  ) {
    return this.catsService.update(id, catInput);
  }

  @Mutation(() => Boolean)
  async deleteCat(@Args('id', { type: () => Int }) id: number) {
    await this.catsService.remove(id);
    return true;
  }
}

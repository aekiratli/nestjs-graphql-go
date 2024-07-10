import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CatType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  age: number;

  @Field()
  breed: string;
}

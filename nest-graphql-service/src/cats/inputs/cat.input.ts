import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CatInput {
  @Field()
  name: string;

  @Field()
  age: number;

  @Field()
  breed: string;
}

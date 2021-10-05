import { modelOptions } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { ObjectType, Field } from 'type-graphql';

@modelOptions({
  schemaOptions: {
    timestamps: true,

    toJSON: {
      virtuals: true,
    },
  },
})
@ObjectType()
export class BaseEntity {
  @Field({ name: 'id' })
  readonly _id: ObjectId;

  @Field()
  readonly createdAt: Date;

  @Field()
  readonly updatedAt: Date;

  public equals(compare: any): boolean {
    return this === compare;
  }
}

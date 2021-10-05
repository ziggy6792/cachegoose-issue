import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { Standard, Definition } from 'src/enums';
import { Ref } from 'src/types';
import { ObjectType, Field } from 'type-graphql';
import { ObjectId } from 'mongodb';
import { BaseEntity } from './base.entity';
import { Clip } from './clip.entity';

const fpsMap = {
  [Standard.PAL]: 25,
  [Standard.NTSC]: 30,
};

@ObjectType()
export class Reel extends BaseEntity {
  @Field()
  @Property({ required: true })
  name: string;

  @Field()
  @Property({ required: true })
  description: string;

  @Field((type) => Standard)
  @Property({ type: String, enum: Standard })
  standard: Standard;

  @Field((type) => Definition)
  @Property({ type: String, enum: Definition })
  definition: Definition;

  @Field((type) => [ObjectId])
  @Property({ default: [], type: ObjectId })
  clips: Ref<Clip>[];

  @Field({ name: 'fps' })
  getFps(): number {
    return fpsMap[this.standard];
  }
}

export const ReelModel = getModelForClass(Reel);

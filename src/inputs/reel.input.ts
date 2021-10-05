/* eslint-disable max-classes-per-file */
import { ObjectId } from 'mongodb';
import { Clip } from 'src/entities/clip.entity';
import { Reel } from 'src/entities/reel.entity';
import { Definition, Standard } from 'src/enums';
import { Ref } from 'src/types';
import { InputType, Field } from 'type-graphql';
import { IdInput } from './types';

@InputType()
export class UpdateReelInput extends IdInput implements Partial<Reel> {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field((type) => Standard, { nullable: true })
  standard: Standard;

  @Field((type) => Definition, { nullable: true })
  definition: Definition;

  @Field((type) => [ObjectId], { nullable: true })
  clips: Ref<Clip>[];
}

@InputType()
export class ListClipsFilter implements Partial<Reel> {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field((type) => Standard, { nullable: true })
  standard: Standard;

  @Field((type) => Definition, { nullable: true })
  definition: Definition;
}

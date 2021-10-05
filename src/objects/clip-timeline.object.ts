/* eslint-disable max-classes-per-file */
import { ObjectType, Field } from 'type-graphql';
import { Timecode } from 'src/timecode';
import { TimecodeScalar } from 'src/graphql-setup/timecode.scalar';
import { Clip } from 'src/entities/clip.entity';
import { Ref } from 'src/types';

@ObjectType()
export class ClipTimelineItem {
  @Field(() => TimecodeScalar)
  startTimecode: Timecode;

  @Field(() => TimecodeScalar)
  endTimecode: Timecode;

  clip: Ref<Clip>;
}

@ObjectType()
export class ClipTimeline {
  @Field(() => TimecodeScalar)
  endTimecode: Timecode;

  @Field(() => [ClipTimelineItem])
  items: ClipTimelineItem[] = [];
}

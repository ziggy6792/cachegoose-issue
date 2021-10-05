/* eslint-disable no-useless-constructor */

import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';
import { Reel } from 'src/entities/reel.entity';
import { ReelService } from 'src/services/reel.service';
import { ClipService } from 'src/services/clip.service';
import { ObjectId } from 'mongodb';
import { ClipTimelineService } from 'src/services/clip-timeline.service';
import { ClipTimeline } from 'src/objects/clip-timeline.object';
import { UpdateReelInput } from 'src/inputs/reel.input';

@Service()
@Resolver((of) => Reel)
export class ReelResolver {
  constructor(
    private readonly reelService: ReelService,
    private readonly clipService: ClipService,
    private readonly clipTimelineService: ClipTimelineService
  ) {}

  @Query(() => [Reel])
  async listReels(@Arg('limit', { nullable: true }) limit: number): Promise<Reel[]> {
    return this.reelService.getMany(limit);
  }

  @Query(() => Reel)
  async getReel(@Arg('id', () => ObjectId, { nullable: true }) id): Promise<Reel> {
    return this.reelService.getOne(id);
  }

  @Mutation(() => Reel)
  async updateReel(@Arg('input', () => UpdateReelInput) input: UpdateReelInput): Promise<Reel> {
    return this.reelService.updateOne(input);
  }

  // @FieldResolver((of) => [Clip])
  // async clips(@Root() reel: Reel): Promise<Clip[]> {
  //   return this.clipService.getByIds(reel.clips as ObjectId[]);
  // }

  @FieldResolver((of) => ClipTimeline)
  async timelineClips(@Root() reel: Reel): Promise<ClipTimeline> {
    return this.clipTimelineService.getClipTimeline(reel);
  }
}

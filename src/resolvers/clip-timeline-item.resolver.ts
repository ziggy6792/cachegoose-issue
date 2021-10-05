/* eslint-disable no-useless-constructor */

import { FieldResolver, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';
import { ReelService } from 'src/services/reel.service';
import { ClipService } from 'src/services/clip.service';
import { Clip } from 'src/entities/clip.entity';
import { ClipTimelineService } from 'src/services/clip-timeline.service';
import { ClipTimelineItem } from 'src/objects/clip-timeline.object';

@Service()
@Resolver((of) => ClipTimelineItem)
export class ClipTimelineItemResolver {
  constructor(
    private readonly reelService: ReelService,
    private readonly clipService: ClipService,
    private readonly clipTimelineService: ClipTimelineService
  ) {}

  @FieldResolver((of) => Clip)
  async clip(@Root() clipTimelineItem: ClipTimelineItem): Promise<Clip> {
    return this.clipService.getOne(clipTimelineItem.clip);
  }
}

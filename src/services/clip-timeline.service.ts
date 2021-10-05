/* eslint-disable no-useless-constructor */
import { Service } from 'typedi';
import { ObjectId } from 'mongodb';
import { ClipTimeline, ClipTimelineItem } from 'src/objects/clip-timeline.object';
import { Timecode } from 'src/timecode';
import { Reel } from 'src/entities/reel.entity';
import { ClipService } from './clip.service';

@Service()
export class ClipTimelineService {
  constructor(protected clipService: ClipService) {}

  async getClipTimeline(reel: Reel): Promise<ClipTimeline> {
    const clips = await this.clipService.getByIds(reel.clips as ObjectId[]);

    let totalTimeCode = new Timecode();

    const framesPerSecond = reel.getFps();

    const clipTimeline = new ClipTimeline();
    reel.clips.forEach((clipId) => {
      const clip = clips.find((clip) => clip._id.toString() === clipId.toString());
      const clipTimelineItem = new ClipTimelineItem();
      clipTimelineItem.clip = clip._id;
      clipTimelineItem.startTimecode = totalTimeCode;
      totalTimeCode = totalTimeCode.add(clip.endTimecode, framesPerSecond);
      clipTimelineItem.endTimecode = totalTimeCode;
      clipTimeline.items.push(clipTimelineItem);
    });

    clipTimeline.endTimecode = totalTimeCode;
    return clipTimeline;
  }
}

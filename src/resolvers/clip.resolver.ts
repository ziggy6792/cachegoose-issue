/* eslint-disable no-useless-constructor */

import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';
import { Clip } from 'src/entities/clip.entity';
import { ClipService } from 'src/services/clip.service';
import { ListClipsFilter } from 'src/inputs/reel.input';
import { UpdateClipInput } from 'src/inputs/clip.input';

@Service()
@Resolver((of) => Clip)
export class ClipResolver {
  constructor(private readonly clipService: ClipService) {}

  @Query(() => [Clip])
  async listClips(@Arg('limit', { nullable: true }) limit: number, @Arg('filter', { nullable: true }) filter: ListClipsFilter): Promise<Clip[]> {
    return this.clipService.getMany(limit, filter);
  }

  @Mutation(() => Clip)
  async updateClip(@Arg('input', () => UpdateClipInput) input: UpdateClipInput): Promise<Clip> {
    return this.clipService.updateOne(input);
  }
}

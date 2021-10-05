import { Clip } from 'src/entities/clip.entity';
import { Service } from 'typedi';
import { ObjectId } from 'mongodb';
import { InjectRepository } from 'src/decorators/inject-repository';
import { Repository } from 'src/types';
import BaseEntityService from './base-entity.service';

@Service()
export class ClipService extends BaseEntityService<Clip> {
  constructor(@InjectRepository(Clip) protected readonly clipRepository: Repository<Clip>) {
    super(clipRepository);
  }

  async getByIds(ids: ObjectId[]): Promise<Clip[]> {
    return this.repository.find({ _id: { $in: ids } });
  }
}

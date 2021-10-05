import { getModelForClass } from '@typegoose/typegoose';
import { Mongoose } from 'mongoose';
import { clazzToRepositoryId } from 'src/decorators/inject-repository';
import { Clip } from 'src/entities/clip.entity';
import { Reel } from 'src/entities/reel.entity';
import { Constructable, ContainerInstance } from 'typedi';

interface IContextProps {
  requestId: string;
  container: ContainerInstance;
  requestCache?: RequestCache;
  mongooseInstance?: Mongoose;
}

class Context {
  // Default auth it role

  public readonly requestId: string;

  public readonly container: ContainerInstance;

  public readonly mongooseInstance: Mongoose;

  constructor({ requestId, container, mongooseInstance }: IContextProps) {
    this.requestId = requestId;
    this.container = container;
    this.mongooseInstance = mongooseInstance;

    this.setRepositories([Clip, Reel]);
  }

  setRepositories(classes: Constructable<any>[]): void {
    classes.forEach((clazz) => {
      this.container.set({ id: clazzToRepositoryId(clazz), value: getModelForClass(clazz, { existingMongoose: this.mongooseInstance }) });
    });
  }

  getService<T extends any>(clazzType: Constructable<T>): T {
    return this.container.get(clazzType);
  }
}

export default Context;

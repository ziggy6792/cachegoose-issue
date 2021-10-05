/* eslint-disable @typescript-eslint/no-explicit-any */
import { Constructable, Inject } from 'typedi';

export const clazzToRepositoryId = (clazz: Constructable<any>): string => `${clazz.name}Repository`;

export const InjectRepository = (clazz: Constructable<any>): any => Inject(clazzToRepositoryId(clazz));

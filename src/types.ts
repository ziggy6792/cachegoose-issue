import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { AnyParamConstructor, BeAnObject } from '@typegoose/typegoose/lib/types';
import { ObjectId } from 'mongodb';
import { LeanDocument, ReadonlyPartial, __UpdateQueryDef } from 'mongoose';

export type Ref<T> = T | ObjectId;

export type MongooseUpdate<T> = ReadonlyPartial<__UpdateQueryDef<LeanDocument<DocumentType<T, BeAnObject>>>>;

export type Repository<T> = ReturnModelType<AnyParamConstructor<T>>;

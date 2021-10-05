import { buildSchemaSync, ResolverData } from 'type-graphql';
import { GraphQLSchema } from 'graphql';
import { ObjectId } from 'mongodb';

import { ClipResolver } from 'src/resolvers/clip.resolver';
import { ReelResolver } from 'src/resolvers/reel.resolver';
import { ClipTimelineItemResolver } from 'src/resolvers/clip-timeline-item.resolver';
import { TypegooseMiddleware } from './typegoose-middleware';
import { ObjectIdScalar } from './object-id.scalar';
import Context from './context';

let schema: GraphQLSchema;

export const getSchema = () => {
  schema =
    schema ||
    buildSchemaSync({
      resolvers: [ClipResolver, ReelResolver, ClipTimelineItemResolver],
      // register our custom, scoped IOC container by passing a extracting from resolver data function
      container: ({ context }: ResolverData<Context>) => context.container,
      // use document converting middleware
      globalMiddlewares: [TypegooseMiddleware],
      // use ObjectId scalar mapping
      scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
      dateScalarMode: 'isoDate',
    });
  return schema;
};

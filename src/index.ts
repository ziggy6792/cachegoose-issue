import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Container, { ContainerInstance } from 'typedi';
import { GraphQLRequestContext } from 'apollo-server-plugin-base';
import express from 'express';
// import { setSamplesInContainer } from './recipe/recipe.samples';
import { v4 as uuidv4 } from 'uuid';
import { getSchema } from './graphql-setup/get-schema';
import { getMongooseInstance } from './utils/database';
import Context from './graphql-setup/context';

async function bootstrap() {
  // create mongoose connection
  // await connectMongo();

  const schema = getSchema();
  // create GraphQL server
  const server = new ApolloServer({
    schema,
    // we need to provide unique context with `requestId` for each request
    context: async (): Promise<Context> => {
      const mongooseInstance = await getMongooseInstance();
      const requestId = uuidv4(); // uuid-like
      const container = Container.of(requestId.toString()); // get scoped container
      const context = new Context({ requestId, container, mongooseInstance }); // create our context
      container.set('context', context); // place context or other data in container

      return context;
    },
    // create a plugin that will allow for disposing the scoped container created for every request
    plugins: [
      {
        requestDidStart: async (requestContext: GraphQLRequestContext<Context>) => {
          // remember to dispose the scoped container to prevent memory leaks
          Container.reset(requestContext.context.requestId.toString());
          // for developers curiosity purpose, here is the logging of current scoped container instances
          // we can make multiple parallel requests to see in console how this works
          const instancesIds = ((Container as any).instances as ContainerInstance[]).map((instance) => instance.id);
          console.log('instances left in memory:', instancesIds);
        },
      },
    ], // TODO: remove when fixed: https://github.com/apollographql/apollo-server/pull/3525
  });

  // start the server
  // const { url } = await server.start.listen(4000);
  // console.log(`Server is running, GraphQL Playground available at ${url}`);
  const app = express();
  await server.start();
  server.applyMiddleware({ app });

  const port = 4000;

  app.listen(port, () => console.log(`listening on port: ${port}`));
}

bootstrap();
//

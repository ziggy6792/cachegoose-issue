import 'reflect-metadata';
import Context from 'src/graphql-setup/context';
import Container from 'typedi';
import { v4 as uuidv4 } from 'uuid';
import { TEST_CONTEXT } from './tokens';

Container.set({
  id: TEST_CONTEXT,
  transient: true, // create a fresh copy for each `get`
  factory: () => {
    const requestId = uuidv4();
    const container = Container.of(requestId); // get scoped container
    const context = new Context({ requestId, container }); // create our context
    container.set('context', context);
    return context;
  },
});

/* eslint-disable max-len */
import { mongoose } from '@typegoose/typegoose';
import { gCall } from 'src/test-utils/g-call';
import testConn from 'src/test-utils/test-conn';

beforeAll(async () => {
  await testConn();
});

const listClipsQuery = `query listClips($filter: ListClipsFilter){
  listClips(filter: $filter){
    id
    name
    description
    startTimecode
    endTimecode
    standard
    definition
  }
}`;

// ToDo move to globalTeardown
afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});

describe('Clip Resolver', () => {
  it('should filter listClips correctly', async () => {
    const response = await gCall({
      source: listClipsQuery,
      variableValues: { filter: { definition: 'SD', standard: 'PAL' } },
    });

    const expectedResponse = {
      data: {
        listClips: [
          {
            id: '61530b2a582122227ab76672',
            name: 'Bud Light',
            description: 'A factory is working on the new Bud Light Platinum.',
            startTimecode: '00:00:00:00',
            endTimecode: '00:00:30:12',
            standard: 'PAL',
            definition: 'SD',
          },
          {
            id: '61530b2a582122227ab76674',
            name: 'Audi',
            description:
              'A group of vampires are having a party in the woods. The vampire in charge of drinks (blood types) arrives in his Audi. The bright lights of the car kills   all of the vampires, with him wondering where everyone went afterwards.',
            startTimecode: '00:00:00:00',
            endTimecode: '00:01:30:00',
            standard: 'PAL',
            definition: 'SD',
          },
          {
            id: '61530b2a582122227ab76675',
            name: 'Chrysler',
            description: 'Clint Eastwood recounts how the automotive industry survived the Great Recession.',
            startTimecode: '00:00:00:00',
            endTimecode: '00:00:10:14',
            standard: 'PAL',
            definition: 'SD',
          },
        ],
      },
    };

    expect(response).toMatchObject(expectedResponse);
  });
});

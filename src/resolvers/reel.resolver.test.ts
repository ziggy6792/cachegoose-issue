/* eslint-disable max-len */
import { mongoose } from '@typegoose/typegoose';
import { gCall } from 'src/test-utils/g-call';
import testConn from 'src/test-utils/test-conn';

beforeAll(async () => {
  await testConn();
});

const updateReelMutation = `mutation updateReel($input: UpdateReelInput!){
  updateReel(input: $input){
    id
    name
    definition
    description
    clips
  }
}`;

const getReelQuery = `query getReel{
  getReel{
    id
    definition
    standard
    timelineClips{
      endTimecode
      items{
        startTimecode
        endTimecode
        clip{
          id
          startTimecode
          endTimecode
        }
      }
    }
  }
}`;

// ToDo move to globalTeardown
afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});

describe('Reel Resolver', () => {
  it.only('should calculate clips total timecode correctly when I add PAL SD video clips', async () => {
    await gCall({
      source: updateReelMutation,
      variableValues: {
        input: {
          id: '61530b2a582122227ab76672',
          definition: 'SD',
          standard: 'PAL',
          clips: ['61530b2a582122227ab76672', '61530b2a582122227ab76674', '61530b2a582122227ab76675'],
        },
      },
    });

    const response = await gCall({
      source: getReelQuery,
    });

    const expectedResponse = {
      data: {
        getReel: {
          id: '61530b2a582122227ab76672',
          definition: 'SD',
          standard: 'PAL',
          timelineClips: {
            endTimecode: '00:02:11:01', // The total duration to test for
            items: [
              {
                startTimecode: '00:00:00:00',
                endTimecode: '00:00:30:12',
                clip: { id: '61530b2a582122227ab76672', startTimecode: '00:00:00:00', endTimecode: '00:00:30:12' },
              },
              {
                startTimecode: '00:00:30:12',
                endTimecode: '00:02:00:12',
                clip: { id: '61530b2a582122227ab76674', startTimecode: '00:00:00:00', endTimecode: '00:01:30:00' },
              },
              {
                startTimecode: '00:02:00:12',
                endTimecode: '00:02:11:01',
                clip: { id: '61530b2a582122227ab76675', startTimecode: '00:00:00:00', endTimecode: '00:00:10:14' },
              },
            ],
          },
        },
      },
    };
    expect(response).toMatchObject(expectedResponse);
  });

  it.only('should calculate clips total timecode correctly when I add NTSC SD video clips', async () => {
    await gCall({
      source: updateReelMutation,
      variableValues: {
        input: {
          id: '61530b2a582122227ab76672',
          definition: 'SD',
          standard: 'NTSC',
          clips: ['61530b2a582122227ab76673', '61530b2a582122227ab76676', '61530b2a582122227ab76677'],
        },
      },
    });

    const response = await gCall({
      source: getReelQuery,
    });

    const expectedResponse = {
      data: {
        getReel: {
          id: '61530b2a582122227ab76672',
          definition: 'SD',
          standard: 'NTSC',
          timelineClips: {
            endTimecode: '00:00:54:08',
            items: [
              {
                startTimecode: '00:00:00:00',
                endTimecode: '00:00:15:27',
                clip: { id: '61530b2a582122227ab76673', startTimecode: '00:00:00:00', endTimecode: '00:00:15:27' },
              },
              {
                startTimecode: '00:00:15:27',
                endTimecode: '00:00:34:08',
                clip: { id: '61530b2a582122227ab76676', startTimecode: '00:00:00:00', endTimecode: '00:00:18:11' },
              },
              {
                startTimecode: '00:00:34:08',
                endTimecode: '00:00:54:08',
                clip: { id: '61530b2a582122227ab76677', startTimecode: '00:00:00:00', endTimecode: '00:00:20:00' },
              },
            ],
          },
        },
      },
    };
    expect(response).toMatchObject(expectedResponse);
  });
});

import { registerEnumType } from 'type-graphql';

export enum Standard {
  PAL = 'PAL',
  NTSC = 'NTSC',
}

registerEnumType(Standard, {
  name: 'Standard', // this one is mandatory
});

export enum Definition {
  SD = 'SD',
  HD = 'HD',
}

registerEnumType(Definition, {
  name: 'Definition', // this one is mandatory
});

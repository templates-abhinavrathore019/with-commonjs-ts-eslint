import {
  parseAffectionLevel,
  parseAdaptability,
  parseChildFriendly,
  parseDogFriendly,
  parseEnergyLevel,
  parseGrooming,
  parseHealthIssues,
  parseIntelligence,
  parseSheddingLevel,
  parseSocialNeeds,
  parseStrangerFriendly,
  parseVocalisation,
} from './attr-parser';

const parseDogAttributes = (dog: any) => {
  const affectionLevel = parseAffectionLevel(dog);
  const adaptability = parseAdaptability(dog);
  const childFriendly = parseChildFriendly(dog);
  const dogFriendly = parseDogFriendly(dog);
  const energyLevel = parseEnergyLevel(dog);
  const grooming = parseGrooming(dog);
  const healthIssues = parseHealthIssues(dog);
  const intelligence = parseIntelligence(dog);
  const sheddingLevel = parseSheddingLevel(dog);
  const socialNeeds = parseSocialNeeds(dog);
  const strangerFriendly = parseStrangerFriendly(dog);
  const vocalisation = parseVocalisation(dog);

  const parsedResult = {
    affectionLevel,
    adaptability,
    childFriendly,
    dogFriendly,
    energyLevel,
    grooming,
    healthIssues,
    intelligence,
    sheddingLevel,
    socialNeeds,
    strangerFriendly,
    vocalisation,
  };

  return parsedResult;
};

export { parseDogAttributes };

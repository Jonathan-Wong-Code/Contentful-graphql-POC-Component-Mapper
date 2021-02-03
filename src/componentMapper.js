import { Fragment } from 'react';
import { CardSection } from './CardSection';
import { FiftyFifty } from './FiftyFifty';

const mapping = {
  CardSection,
  FiftyFifty,
};

export const componentMapper = (slug) => mapping[slug] || Fragment;

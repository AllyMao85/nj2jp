import React from 'react';
import PropTypes from 'prop-types';
import { WebflowJs } from './assets/utils';
import './assets/styles/style.scss';

import {
  CardImg,
  CardHdr,
  CardDate,
  CardBlurb,
} from '../';

const UserCard = (props) => {
  WebflowJs(); //eslint-disable-line

  return (
    <div className="user-stories__container user-stories__container--tablet">
      <div
        className="user-story-card__container user-story-card__container--landscape"
        data-ix="user-story-fade-in"
      >
        <CardImg link={props.CardImg.link} />
        <div className="user-story-card__content">
          <CardHdr header={props.CardHdr.header} />
          <CardDate date={props.CardDate.date} />
          <CardBlurb blurb={props.CardBlurb.blurb} />
        </div>
      </div>
    </div>
  );
};

const {
  shape,
  string,
} = PropTypes;

UserCard.propTypes = {
  CardImg: shape({
    link: string,
  }).isRequired,
  CardHdr: shape({
    link: string,
  }).isRequired,
  CardDate: shape({
    link: string,
  }).isRequired,
  CardBlurb: shape({
    link: string,
  }).isRequired,
};

export default UserCard;

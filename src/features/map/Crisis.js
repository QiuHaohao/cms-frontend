import React from 'react';

import {
  Marker,
} from "react-google-maps";

import {
  compose,
  withStateHandlers
} from 'recompose';

const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

const Crisis = compose(
    withStateHandlers(() => ({
      isOpen: false,
    }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  )(props => (
    <Marker
      position={{
        lat: props.latitude,
        lng: props.longitude
        }}
      onClick={props.onToggleOpen}
      >
      {
        props.isOpen &&
        <InfoBox
          onCloseClick={props.onToggleOpen}
          options={{ closeBoxURL: ``, enableEventPropagation: true }}>
          <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
            <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
              {props.type}
              {props.message}
            </div>
          </div>
        </InfoBox>
      }
    </Marker>
  ));

export default Crisis;
import React from 'react';

import {
  Marker,
} from "react-google-maps";

import {
  compose,
  withStateHandlers
} from 'recompose';

import InfoBoxContent from './InfoBoxContent'

const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");


const Crisis = compose(
    withStateHandlers(() => ({
      isOpen: false,
    }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  )(props => {
    return(
    <Marker
      position={{
        lat: props.Latitude,
        lng: props.Longitude
        }}
      label={props.Type.slice(0,1)}
      onClick={props.onToggleOpen}
      >
      {
        props.isOpen &&
        <InfoBox
          onCloseClick={props.onToggleOpen}
          options={{ closeBoxURL: ``, enableEventPropagation: true }}>
            <div className="infobox">
              <InfoBoxContent message={props.message_content} type={props.Type} id={props.id} preview={props.preview}/>
            </div>
        </InfoBox>
      }
    </Marker>
  )});

export default Crisis;
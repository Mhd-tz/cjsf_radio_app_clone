import React from 'react';
import {Text, Linking} from 'react-native';

export const ABOUT_HEADER1 = 'Diverse * Independent * Yours';
export const ABOUT_BODY1 =
  'CJSF 90.1 FM is Vancouver’s independent indie music, ' +
  'public affairs and social justice radio station. CJSF Radio located at ' +
  'Simon Fraser University’s Burnaby campus and broadcasts at 90.1FM or ' +
  'Greater Vancouver and via the internet to the world.  CJSF is operated by ' +
  'a small staff over 150 volunteers from the campus and the community.';

export const ABOUT_HEADER2 = 'Be the Media';

const ABOUT_BODY2_1 =
  'Want to get involved, attend one of our Orientations' +
  ' for New Volunteers. There are several every month check the website at';
const CJSF_URL = 'https://www.cjsf.ca/';
const ABOUT_BODY2_2 = 'for the next upcoming orientations.';

export const ABOUT_BODY2 = (
  <Text>
    <Text>{ABOUT_BODY2_1}</Text>
    <Text
      style={{color: 'cornflowerblue'}}
      onPress={() => {
        Linking.openURL(CJSF_URL);
      }}>
      {' '}
      www.cjsf.ca{' '}
    </Text>
    <Text>{ABOUT_BODY2_2}</Text>
  </Text>
);

export const ABOUT_HEADER3 = 'Developer Notes';

export const ABOUT_BODY3 =
  'This is a Clone App of the original CJSF_Radio app. ' +
  'The original CJSF_Radio app is developed by ' +
  'the CJSF team "All rights to CJSF_RADIO_FM" and is available for download at ' +
  'the Google PlayStore. The Clone App is developed by ' +
  'the individual developer Mahdi Taziki and the source code is available at github page.';

export const ABOUT_BODY4 =
  '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ';

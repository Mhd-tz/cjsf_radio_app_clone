import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
  },
  radioStation: {
    // marginTop: 30,
    // marginBottom: 10,
    // marginLeft: 10,
    // marginRight: 10,
    paddingTop: 40,
    // paddingBottom: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  functions: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 30,
  },
  shareButton: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  playButton: {
    backgroundColor: 'black',
    borderRadius: 50,
    width: 80,
    height: 80,
    padding: 10,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButton: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  panel: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  panelActive: {
    backgroundColor: '#3D225A',
    width: '100%',
    height: 125,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
  },
  panelInActive: {
    display: 'none',
  },
  panelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

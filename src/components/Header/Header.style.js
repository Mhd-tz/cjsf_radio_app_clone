import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    top: 0,
  },
  radioHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    // elevation: 5,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
  radioTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  aboutIcon: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  aboutContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  aboutHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
  backIconText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  backIcon: {
    position: 'absolute',
    left: 15,
  },
  aboutTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },

  /***********************Schedule*************************/
  scheduleContainer: {
    flex: 1,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'transparent',
  },

  scheduleHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
  scheduleTitle: {
    color: 'white',
    fontWeight: '500',
    fontSize: 22,
  },
});

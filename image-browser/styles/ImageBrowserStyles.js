import {StyleSheet} from 'react-native';
// import { TextStyles } from "../../../styles";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 19,
  },
  emptyContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#bbb',
    fontSize: 20,
  },
});

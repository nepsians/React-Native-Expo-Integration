import React from 'react';
import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles/ImageTileStyle';

const {width} = Dimensions.get('window');

export default class ImageTile extends React.PureComponent {
  render() {
    const {
      item,
      index,
      selected,
      selectImage,
      selectedItemCount,
      badgeColor,
    } = this.props;
    if (!item) {
      return null;
    }
    return (
      <TouchableHighlight
        style={{opacity: selected ? 0.8 : 1}}
        underlayColor="transparent"
        onPress={() => selectImage(index)}>
        <View style={{position: 'relative'}}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ImageBackground
              style={{width: width / 4, height: width / 4}}
              source={{uri: item.uri}}>
              {selected && (
                <View
                  style={{...styles.countBadge, backgroundColor: badgeColor}}>
                  <Text style={styles.countBadgeText}>{selectedItemCount}</Text>
                </View>
              )}
            </ImageBackground>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

ImageTile.propTypes = {
  item: PropTypes.shape({uri: PropTypes.string}),
  index: PropTypes.number,
  selected: PropTypes.bool,
  selectImage: PropTypes.func,
  selectedItemCount: PropTypes.number,
  badgeColor: PropTypes.string,
};

ImageTile.defaultProps = {
  item: {},
  index: 0,
  selected: false,
  selectImage: () => ({}),
  selectedItemCount: 0,
  badgeColor: '',
};

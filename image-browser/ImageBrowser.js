import React from 'react';
import {
  Text,
  View,
  FlatList,
  Dimensions,
  Button,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import * as MediaLibrary from 'expo-media-library';

import ImageTile from './ImageTile';
import styles from './styles/ImageBrowserStyles';
// import {Colors} from '../../constants';
// import {RoundedButton} from '../rounded-button';

const {width} = Dimensions.get('window');

export default class ImageBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      selected: [],
      after: null,
      hasNextPage: true,
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
      badgeColor: this.props.badgeColor ? this.props.badgeColor : 'red',
    });
    this.getPhotos();
  }

  selectImage = (index) => {
    const {selected} = this.state;
    let newSelected = Array.from(selected);

    if (newSelected.indexOf(index) === -1) {
      newSelected.push(index);
    } else {
      const deleteIndex = newSelected.indexOf(index);
      newSelected.splice(deleteIndex, 1);
    }

    if (newSelected.length > this.props.max) {
      return;
    }
    if (newSelected.length === 0) {
      newSelected = [];
    }

    this.setState({selected: newSelected});
  };

  getPhotos = () => {
    const params = {first: 300, sortBy: MediaLibrary.SortBy.creationTime};
    if (this.state.after) {
      params.after = this.state.after;
    }
    if (!this.state.hasNextPage) {
      return;
    }

    this.wait().then(() => {
      MediaLibrary.getAssetsAsync(params).then((assets) => {
        this.processPhotos(assets);
      });
    });
  };

  wait = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  };

  processPhotos = (assets) => {
    const {photos} = this.state;

    if (this.state.after === assets.endCursor) {
      return;
    }

    let displayAssets;
    if (this.props.mediaSubtype == null) {
      displayAssets = assets.assets;
    } else {
      displayAssets = assets.assets.filter((asset) => {
        return asset.mediaType.includes(this.props.mediaSubtype);
      });
    }

    this.setState({
      photos: [...photos, ...displayAssets],
      after: assets.endCursor,
      hasNextPage: assets.hasNextPage,
      loading: false,
    });
  };

  getItemLayout = (data, index) => {
    const length = width / 4;
    return {length, offset: length * index, index};
  };

  prepareCallback = () => {
    const {selected, photos} = this.state;
    const selectedPhotos = selected.map((i) => photos[i]);
    const assetsInfo = Promise.all(
      selectedPhotos.map((i) => MediaLibrary.getAssetInfoAsync(i)),
    );
    this.props.callback(assetsInfo);
  };

  renderHeader = () => {
    const selectedCount = this.state.selected.length;

    let headerText = `${selectedCount} ${
      this.props.headerSelectText ? this.props.headerSelectText : 'Selected'
    }`;
    if (selectedCount === this.props.max) {
      headerText += ' (Max)';
    }
    const headerCloseText = this.props.headerCloseText
      ? this.props.headerCloseText
      : 'Close';
    const headerDoneText = this.props.headerDoneText
      ? this.props.headerDoneText
      : 'Done';
    const headerButtonColor = this.props.headerButtonColor
      ? this.props.headerButtonColor
      : 'red';

    return (
      <View style={[styles.header]}>
        {/* <RoundedButton
          buttonText={headerCloseText}
          onButtonPress={() => this.props.callback(Promise.resolve([]))}
          customContainerStyle={{width: undefined}}
          customStyle={{
            height: 38,
            borderRadius: 8,
            padding: 0,
            paddingHorizontal: 12,
          }}
        /> */}

        <Text style={styles.headerText}>{headerText}</Text>

        {/* <RoundedButton
          buttonText={headerDoneText}
          onButtonPress={() => this.prepareCallback()}
          customContainerStyle={{width: undefined}}
          customStyle={{
            height: 38,
            borderRadius: 8,
            padding: 0,
            paddingHorizontal: 12,
          }}
        /> */}
      </View>
    );
  };

  renderImageTile = ({item, index}) => {
    const selected = this.state.selected.indexOf(index) !== -1;
    const selectedItemCount = this.state.selected.indexOf(index) + 1;

    return (
      <ImageTile
        item={item}
        selectedItemCount={selectedItemCount}
        index={index}
        camera={false}
        selected={selected}
        selectImage={this.selectImage}
        //badgeColor={Colors.brightOrange}
      />
    );
  };

  renderLoading = () => {
    return (
      <View style={styles.emptyContent}>
        <ActivityIndicator
          size="large"
          color={this.props.loadingColor ? this.props.loadingColor : '#bbb'}
        />
      </View>
    );
  };

  renderEmpty = () => {
    return (
      <View style={styles.emptyContent}>
        <Text style={styles.emptyText}>
          {this.props.emptyText ? this.props.emptyText : 'No image'}
        </Text>
      </View>
    );
  };

  renderImages = () => {
    return (
      <FlatList
        contentContainerStyle={{flexGrow: 1}}
        data={this.state.photos}
        numColumns={4}
        renderItem={this.renderImageTile}
        keyExtractor={(val) => val.id}
        onEndReached={() => {
          this.getPhotos();
        }}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={this.renderEmpty}
        initialNumToRender={24}
        getItemLayout={this.getItemLayout}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.state.loading ? this.renderLoading() : this.renderImages()}
      </View>
    );
  }
}

ImageBrowser.propTypes = {
  badgeColor: PropTypes.string,
  max: PropTypes.number,
  mediaSubtype: PropTypes.string,
  callback: PropTypes.func,
  headerSelectText: PropTypes.string,
  headerButtonColor: PropTypes.string,
  headerCloseText: PropTypes.string,
  headerDoneText: PropTypes.string,
  loadingColor: PropTypes.string,
  emptyText: PropTypes.string,
};

ImageBrowser.defaultProps = {
  badgeColor: 'red',
  max: 100,
  mediaSubtype: '',
  callback: () => [],
  headerSelectText: '',
  headerButtonColor: '',
  headerCloseText: '',
  headerDoneText: '',
  loadingColor: '',
  emptyText: '',
};

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import { ScrollView, View, Text, StyleSheet } from 'react-native';

import AudioContainer from './AudioContainer/AudioContainer';

const styles = StyleSheet.create({
  container: {
    overflow: 'scroll',
  },
  empty: {
    paddingTop: 12,
  }
});

export default class List extends PureComponent {
  static propTypes = {
    audio: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
    uiState: PropTypes.object.isRequired,
    setPage: PropTypes.func.isRequired,
    pickAudio: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.contentHeight = 0;
  }

  handleScroll = (e) => {
    const { list, setPage, uiState } = this.props;
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
    if (list.hasNextPage && !uiState.isFetchingList && (contentOffset.y === contentSize.height - layoutMeasurement.height)) {
      setPage();
    }
  };

  render() {
    const { audio, list, uiState, pickAudio } = this.props;
    return (
      <ScrollView
        ref={(node) => { this.list = node; }}
        style={styles.container}
        onScroll={this.handleScroll}
        scrollEventThrottle={400}
      >
        <View>
          {list.items.length > 0 &&
          list.items.map((item, i) =>
            <AudioContainer
              key={`${item.id}++${i}`}
              item={item}
              active={audio}
              onPickAudio={pickAudio}
            />)}
          {!uiState.isFetchingList && list.items.length < 1 &&
          <Text style={styles.empty}>Не найдено ни одной аудиозаписи</Text>}
        </View>
      </ScrollView>
    );
  }
}

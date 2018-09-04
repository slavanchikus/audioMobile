import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet } from 'react-native';

/* import Progress from './Progress/Progress';
import Controls from './Controls/Controls';
import QueueManage from './QueueManage/QueueManage';
import Volume from './Volume/Volume'; */

const styles = StyleSheet.create({
  container: {
    height: 200,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: -1,
    borderTopWidth: 2,
    borderColor: 'rgba(163, 162, 162, 0.53)'
  },
  info: {
    flex: 0.6
  },
});

export default class Player extends PureComponent {
  static propTypes = {
    audio: PropTypes.object.isRequired,
    queue: PropTypes.array.isRequired,
    isFetchingAudio: PropTypes.object.isRequired,
    togglePlaying: PropTypes.func.isRequired,
    pickAudio: PropTypes.func.isRequired
  };

  state = {
    playerQueue: this.props.queue,
    play: true,
    duration: 0,
    currentTime: 0,
    volume: 1,
    loop: false,
    random: false,
    loaded: false
  };

  componentWillReceiveProps({ audio, queue, isFetchingAudio }) {
    if (!isFetchingAudio && audio.isPlaying && !this.props.audio.isPlaying) {
      this.setState({ play: true });
    } else if (!audio.isPlaying && this.props.audio.isPlaying) {
      this.setState({ play: false });
    }

    /* if (this.props.audio && audio && this.state.loaded
      && this.props.audio.id !== audio.id) {
      this.audio.pause();
      this.setState({ loaded: false });
    } */

    if (queue !== this.props.queue) {
      if (this.state.random) {
        const newPlayerQueue = [...queue];
        this.setState({ random: true, playerQueue: newPlayerQueue.sort(() => Math.random() - 0.5) });
      } else {
        this.setState({ playerQueue: queue });
      }
    }
  }

  handleAudioLoading = () => {
    this.setState({ loaded: false });
  };

  handleAudioLoad= () => {
    this.setState({ loaded: true });
  };

 /* handleAudioEnded = () => {
    this.handleMoveAudio('next');
  }; */

  handleTimeUpdate = (data) => {
    this.setState({ currentTime: Math.floor(data.currentTime) });
  };

  handleRewindTime = (newTime) => {
    this.audio.currentTime = newTime;
  };

  /*handleLoopAudio = () => {
    this.setState({ loop: !this.state.loop });
  };

  handleRandomAudio = () => {
    if (!this.state.random) {
      const newPlayerQueue = [...this.state.playerQueue];
      this.setState({ random: true, playerQueue: newPlayerQueue.sort(() => Math.random() - 0.5) });
    } else {
      this.setState({ random: false, playerQueue: this.props.queue });
    }
  };

  handleMoveAudio = (direction) => {
    const { playerQueue } = this.state;
    const { audio } = this.props;
    const currAudio = playerQueue.findIndex(i => i.id === audio.id);
    let turnAudio;
    if (direction === 'prev') {
      turnAudio = playerQueue[currAudio - 1];
    } else {
      turnAudio = playerQueue[currAudio + 1];
    }
    if (turnAudio) this.props.pickAudio(turnAudio, null);
  };*/

  render() {
    const { duration, currentTime, volume, loop, random, loaded } = this.state;
    const { audio } = this.props;
    return (
      <View className={styles.container}>
        <View className={styles.info}>
          <Text
            className={styles.info_text}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {audio.artist}
          </Text>
          <Text
            className={styles.info_text}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {audio.title}
          </Text>
        </View>
        {/*<Progress
          loaded={loaded}
          duration={audio.duration}
          currentTime={currentTime}
          onRewindTime={this.handleRewindTime}
        />*/}
        {/* <Controls
          isPlaying={audio.isPlaying}
          onTogglePlay={this.props.togglePlaying}
          onMoveAudio={this.handleMoveAudio}
        />
        <img
          src={audio.img}
          width={60}
          height={60}
          alt="pic"
        />

        <QueueManage
          loop={loop}
          random={random}
          onLoopAudio={this.handleLoopAudio}
          onRandomAudio={this.handleRandomAudio}
        /> */}
      </View>
    );
  }
}

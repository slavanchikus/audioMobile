import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';

import * as Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: -1,
    borderBottomWidth: 2,
  },
  active: {
    width: 40,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginRight: 10,
  },
  orange: {
    width: 13.3,
    height: 13.3,
    borderRadius: 10,
    backgroundColor: '#ffa95e'
  },
  red: {
    width: 13.3,
    height: 13.3,
    borderRadius: 10,
    backgroundColor: '#f66'
  },
  img: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 0.9
  },
  artist: {
    fontSize: 15,
    fontWeight: '600'
  },
  title: {
    fontSize: 15
  },
  duration: {
    marginLeft: 'auto',
  }
});

export default class AudioContainer extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    active: PropTypes.object.isRequired,
    onPickAudio: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.backgroundColor = `rgba(${Math.floor(Math.random() * 56) + 200}, ${Math.floor(Math.random() * 56) + 200}, ${Math.floor(Math.random() * 56) + 200},0.2)`;
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.active.id === this.props.item.id)
      || (this.props.active.id !== nextProps.active.id && this.props.active.id === this.props.item.id);
  }

  handleContainerClick = () => {
    const { item, onPickAudio } = this.props;
    onPickAudio(item);
  };

  handleDuration = (duration) => {
    const secNum = parseInt(duration, 10);
    const hours = Math.floor(secNum / 3600) % 24;
    const minutes = Math.floor(secNum / 60) % 60;
    const seconds = secNum % 60;
    return [hours, minutes, seconds]
        .map(v => v < 10 ? `0${v}` : v)
        .filter((v, i) => v !== '00' || i > 0)
        .join(':');
  };

  render() {
    const { item, active } = this.props;
    const duration = this.handleDuration(item.duration);
    /* const containerClassName = cx(styles.container, {
      [styles.playing]: active.id === item.id,
    }); */
    return (
      <TouchableOpacity onPress={this.handleContainerClick}>
        <View
          style={[
            styles.container,
            { backgroundColor: this.backgroundColor },
            { borderColor: active.id === item.id ? '#f66' : 'white' }
          ]}
        >
          {active.id === item.id ?
            <View style={styles.active}>
              <Animatable.View
                animation={active.isPlaying ? 'pulse' : null}
                easing="ease-out"
                iterationCount="infinite"
                iterationDelay={100}
              >
                <View style={styles.orange} />
              </Animatable.View>
              <Animatable.View
                animation={active.isPlaying ? 'pulse' : null}
                easing="ease-out"
                iterationCount="infinite"
                iterationDelay={200}
              >
                <View style={styles.red} />
              </Animatable.View>
              <Animatable.View
                animation={active.isPlaying ? 'pulse' : null}
                easing="ease-out"
                iterationCount="infinite"
                iterationDelay={300}
              >
                <View style={styles.orange} />
              </Animatable.View>
              <Animatable.View
                animation={active.isPlaying ? 'pulse' : null}
                easing="ease-out"
                iterationCount="infinite"
                iterationDelay={100}
              >
                <View style={styles.orange} />
              </Animatable.View>
              <Animatable.View
                animation={active.isPlaying ? 'pulse' : null}
                easing="ease-out"
                iterationCount="infinite"
                iterationDelay={300}
              >
                <View style={styles.orange} />
              </Animatable.View>
              <Animatable.View
                animation={active.isPlaying ? 'pulse' : null}
                easing="ease-out"
                iterationCount="infinite"
                iterationDelay={200}
              >
                <View style={styles.red} />
              </Animatable.View>
              <Animatable.View
                animation={active.isPlaying ? 'pulse' : null}
                easing="ease-out"
                iterationCount="infinite"
                iterationDelay={100}
              >
                <View style={styles.orange} />
              </Animatable.View>
              <Animatable.View
                animation={active.isPlaying ? 'pulse' : null}
                easing="ease-out"
                iterationCount="infinite"
                iterationDelay={300}
              >
                <View style={styles.orange} />
              </Animatable.View>
              <Animatable.View
                animation={active.isPlaying ? 'pulse' : null}
                easing="ease-out"
                iterationCount="infinite"
                iterationDelay={200}
              >
                <View style={styles.red} />
              </Animatable.View>
            </View>
          :
            <View style={styles.img}>
              <Image
                style={styles.img}
                ref={(node) => { this.img = node; }}
                source={{ uri: item.img }}
              />
            </View>}
          <View style={styles.info}>
            <Text
              style={styles.artist}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.artist}
            </Text>
            <Text
              style={styles.title}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
          </View>
          <View style={styles.duration}>
            <Text>{duration}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

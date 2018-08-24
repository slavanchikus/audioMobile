import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { View, TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: 'rgba(163, 162, 162, 0.53)'
  },
  input: {
    paddingLeft: 12,
    color: '#828282',
  }
});

export default class Search extends PureComponent {
  static propTypes = {
    listValue: PropTypes.string.isRequired,
    getAudio: PropTypes.func.isRequired,
  };

  state = {
    value: '',
    isTyping: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isTyping && !this.state.isTyping) {
      const { listValue, getAudio } = this.props;
      if (listValue.trim() !== this.state.value.trim()) {
        if (this.state.value.length === 0) {
          getAudio('', 1);
        } else {
          getAudio(this.state.value, 1);
        }
      }
    }
  }

  handleChange = (value) => {
    if (!this.state.isTyping) {
      this.setState({ isTyping: true });
    }
    if (this.typingDelay !== undefined) {
      clearTimeout(this.typingDelay);
    }
    this.typingDelay = setTimeout(() => this.setState({ isTyping: false }), 1000);
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder="Поиск по аудиозаписям"
          onChangeText={this.handleChange}
          underlineColorAndroid="transparent"
        />
      </View>
    );
  }
}

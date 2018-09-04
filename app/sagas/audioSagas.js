import { fork, call, put, takeEvery } from 'redux-saga/effects';
import { getAudio, listenAudio } from '../api/audioApi';

function* fetchAudio({ value, page, userId, token }) {
  try {
    const payload = yield call(getAudio, value, page, userId, token);
    yield put({ type: 'GET_AUDIO_COMPLETE', payload });
  } catch (error) {
    yield put({ type: 'GET_AUDIO_FAILED' });
    throw error;
  }
}

function* watchAudioRequest() {
  yield takeEvery('GET_AUDIO', fetchAudio);
}


function* fetchListen({ audio, getStreamUrl }) {
  try {
    if (getStreamUrl) {
      const payload = yield call(listenAudio, audio.url);
      yield put({ type: 'PICK_AUDIO_COMPLETE', audio: { ...audio, url: payload.url }});
    } else {
      yield put({ type: 'PICK_AUDIO_COMPLETE', audio });
    }
  } catch (error) {
    yield put({ type: 'PICK_AUDIO_FAILED' });
    throw error;
  }
}

function* watchListenRequest() {
  yield takeEvery('PICK_AUDIO', fetchListen);
}


export function* audioSagas() {
  yield fork(watchAudioRequest);
  yield fork(watchListenRequest);
}

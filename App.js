import React from 'react'
import App from './app/App'
import ignoreWarnings from 'react-native-ignore-warnings';


export default class Root extends React.Component {
  render() {
    console.disableYellowBox = true;

    ignoreWarnings('Warning', [
      'componentWillUpdate has been renamed, and is not recommended for use. See https://fb.me/react-unsafe-component-lifecycles for details.',
      'componentWillReceiveProps has been renamed, and is not recommended for use. See https://fb.me/react-unsafe-component-lifecycles for details.',
      'Calling `getNode()` on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.',
      'componentWillMount has been renamed, and is not recommended for use. See https://fb.me/react-unsafe-component-lifecycles for details.',
      '[...effects] has been deprecated in favor of all([...effects]), please update your code'
    ]);

    ignoreWarnings('Unrecognized event', [
      '{"type":"client_log","level":"log","data":["[',
    ]);


    return (
      <App />
    )
  }
}

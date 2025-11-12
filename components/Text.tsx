import { Text as RNText } from 'react-native';

export const Text = ({ style, ...props }: any) => {
  return <RNText style={[{ fontFamily: 'Panton' }, style]} {...props} />;
};

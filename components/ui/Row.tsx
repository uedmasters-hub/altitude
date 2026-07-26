import { View, type ViewStyle, type ViewProps } from 'react-native';
import { spacing } from '../../constants/tokens';

interface RowProps extends ViewProps {
  gap?: keyof typeof spacing;
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
}

export function Row({
  gap = 'sm',
  align = 'center',
  justify = 'flex-start',
  style,
  children,
  ...rest
}: RowProps) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: align,
          justifyContent: justify,
          gap: spacing[gap],
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

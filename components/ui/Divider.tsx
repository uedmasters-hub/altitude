import { View, StyleSheet, type ViewStyle } from 'react-native';
import { colors, spacing } from '../../constants/tokens';

interface DividerProps {
  spacing?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

const gapMap = { sm: spacing.sm, md: spacing.md, lg: spacing.lg };

export function Divider({ spacing: gap = 'md', style }: DividerProps) {
  return (
    <View
      style={[
        styles.line,
        { marginVertical: gapMap[gap] },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
});

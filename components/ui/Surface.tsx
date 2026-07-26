import { View, StyleSheet, type ViewProps } from 'react-native';
import { colors, spacing, radii } from '../../constants/tokens';

type Elevation = 'flat' | 'raised' | 'overlay';

interface SurfaceProps extends ViewProps {
  elevation?: Elevation;
  padded?: boolean;
}

export function Surface({
  elevation = 'flat',
  padded = true,
  style,
  children,
  ...rest
}: SurfaceProps) {
  return (
    <View
      style={[
        styles.base,
        padded && styles.padded,
        styles[elevation],
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
  },
  padded: {
    padding: spacing.md,
  },

  flat: {
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  raised: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  overlay: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
});

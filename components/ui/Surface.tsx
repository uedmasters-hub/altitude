import { View, StyleSheet, type ViewProps } from 'react-native';
import { colors, spacing, radii, shadows } from '../../constants/tokens';

type Elevation = 'flat' | 'raised' | 'floating' | 'overlay';

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
        elevationStyles[elevation],
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
});

const elevationStyles = StyleSheet.create({
  flat: {
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  raised: {
    ...shadows.card,
  },
  floating: {
    ...shadows.floating,
  },
  overlay: {
    ...shadows.sheet,
  },
});

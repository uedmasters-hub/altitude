import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { colors, spacing, radii } from '../../constants/tokens';
import type { RecommendationTag } from '../../types';

const tagConfig: Record<RecommendationTag, { bg: string; fg: string; label: string }> = {
  bestValue: { bg: '#F3F0FF', fg: colors.bestValue, label: 'Best value' },
  cheapest: { bg: colors.successSoft, fg: colors.cheapest, label: 'Cheapest' },
  fastest: { bg: colors.accentSoft, fg: colors.fastest, label: 'Fastest' },
};

interface TagProps {
  tag: RecommendationTag;
}

export function Tag({ tag }: TagProps) {
  const config = tagConfig[tag];

  return (
    <View style={[styles.base, { backgroundColor: config.bg }]}>
      <Text
        variant="label"
        style={{ color: config.fg }}
      >
        {config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.sm,
  },
});

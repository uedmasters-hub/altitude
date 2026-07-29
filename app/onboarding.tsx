import { View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button } from '../components/ui';
import { colors, palette, spacing, radii } from '../constants/tokens';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ORBIT_OUTER = SCREEN_WIDTH * 0.75;
const ORBIT_INNER = SCREEN_WIDTH * 0.52;

export default function Onboarding() {
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        {/* ── Illustration ── */}
        <View style={styles.illustration}>
          {/* Outer orbit ring */}
          <View style={[styles.orbitRing, styles.outerRing]} />
          {/* Inner orbit ring */}
          <View style={[styles.orbitRing, styles.innerRing]} />

          {/* Center avatar */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatarBg}>
              <View style={styles.avatarHead} />
              <View style={styles.avatarBody} />
            </View>
          </View>

          {/* Orbital dots */}
          <View style={[styles.dot, styles.dotPink, { top: '8%', left: '48%' }]} />
          <View style={[styles.dot, styles.dotOlive, { top: '38%', left: '4%' }]} />
          <View style={[styles.dot, styles.dotPinkSmall, { top: '48%', left: '18%' }]} />
          <View style={[styles.dot, styles.dotTeal, { top: '48%', right: '16%' }]} />
          <View style={[styles.dot, styles.dotGreen, { top: '65%', left: '28%' }]} />

          {/* Passport icon */}
          <View style={styles.passportBubble}>
            <Text style={styles.passportEmoji}>🛂</Text>
          </View>
        </View>

        {/* ── Content ── */}
        <View style={styles.content}>
          <Text variant="display" align="center">
            It's all about you{'\n'}and your journey
          </Text>

          <Text
            variant="body"
            color="textSecondary"
            align="center"
            style={styles.subtitle}
          >
            The things should evolve around you.
          </Text>
        </View>

        {/* ── CTA ── */}
        <Button
          label="Get started"
          onPress={() => {}}
          rounded
          style={styles.cta}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: palette.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },

  // ── Illustration ──
  illustration: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  orbitRing: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 1.5,
  },
  outerRing: {
    width: ORBIT_OUTER,
    height: ORBIT_OUTER,
    borderColor: palette.gray300,
    opacity: 0.5,
    transform: [{ rotate: '-15deg' }],
  },
  innerRing: {
    width: ORBIT_INNER,
    height: ORBIT_INNER,
    borderColor: palette.primary200,
    opacity: 0.6,
  },

  // Avatar
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FDEBD0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarBg: {
    alignItems: 'center',
  },
  avatarHead: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5C088',
    marginTop: 8,
  },
  avatarBody: {
    width: 48,
    height: 28,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#93A8D0',
    marginTop: 4,
  },

  // Dots
  dot: {
    position: 'absolute',
    borderRadius: 9999,
  },
  dotPink: {
    width: 28,
    height: 28,
    backgroundColor: '#F472B6',
  },
  dotPinkSmall: {
    width: 14,
    height: 14,
    backgroundColor: '#F472B6',
  },
  dotOlive: {
    width: 32,
    height: 32,
    backgroundColor: '#BDB55D',
  },
  dotTeal: {
    width: 24,
    height: 24,
    backgroundColor: '#2DD4BF',
  },
  dotGreen: {
    width: 44,
    height: 44,
    backgroundColor: '#16A34A',
  },

  // Passport bubble
  passportBubble: {
    position: 'absolute',
    top: '20%',
    right: '4%',
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: palette.primary400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passportEmoji: {
    fontSize: 24,
  },

  // ── Content ──
  content: {
    paddingBottom: spacing.xl,
  },
  subtitle: {
    marginTop: spacing.sm,
  },

  // ── CTA ──
  cta: {
    marginBottom: spacing.md,
  },
});

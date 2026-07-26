import {
  View,
  TextInput,
  StyleSheet,
  type TextInputProps,
} from 'react-native';
import { Text } from './Text';
import { colors, spacing, radii, typography } from '../../constants/tokens';

interface InputProps extends TextInputProps {
  label?: string;
  icon?: React.ReactNode;
}

export function Input({ label, icon, style, ...rest }: InputProps) {
  return (
    <View style={styles.wrapper}>
      {label && (
        <Text variant="label" color="textSecondary" style={styles.label}>
          {label}
        </Text>
      )}
      <View style={styles.inputRow}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <TextInput
          style={[styles.input, icon ? styles.inputWithIcon : undefined, style]}
          placeholderTextColor={colors.textTertiary}
          selectionColor={colors.primary}
          {...rest}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.xs,
  },
  label: {
    marginLeft: spacing.xs,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.borderLight,
    borderRadius: radii.md,
    minHeight: 48,
  },
  icon: {
    paddingLeft: spacing.md,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.text,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  inputWithIcon: {
    paddingLeft: spacing.sm,
  },
});

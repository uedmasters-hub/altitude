import { useMemo, useState } from 'react';
import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Text } from '../components/ui';
import { palette, spacing, radii } from '../constants/tokens';
import { useNow } from '../data/trip';
import {
  profile,
  savedTravellers,
  preferences,
  notificationSettings,
  paymentMethods,
  spendSummary,
  topRoutes,
  documentNeedsAttention,
  type NotificationSetting,
} from '../data/account';

const HPAD = spacing.lg;

export default function Account() {
  const now = useNow();
  const router = useRouter();
  const summary = useMemo(() => spendSummary(now), [now]);
  const routes = useMemo(() => topRoutes(), []);
  const [notifs, setNotifs] = useState<NotificationSetting[]>(notificationSettings);

  const toggleNotif = (id: string) =>
    setNotifs((list) =>
      list.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n)),
    );

  const initials = profile.name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('');

  const docsNeedingAttention = savedTravellers.filter(documentNeedsAttention).length;

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={s.header}>
        <Text variant="h1">Account</Text>
        <Pressable
          style={s.iconBtn}
          onPress={() => router.back()}
          hitSlop={6}
        >
          <Feather name="x" size={20} color={palette.gray900} />
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Profile ── */}
        <Pressable style={s.profile} onPress={() => {}}>
          <View style={s.avatar}>
            <Text variant="h2" style={{ color: palette.white }}>
              {initials}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="h2">{profile.name}</Text>
            <Text variant="caption" color="textTertiary">
              {profile.email} · member since {profile.memberSince}
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color={palette.gray400} />
        </Pressable>

        {/* ── Travel summary ── */}
        <View style={s.summary}>
          <View style={s.summaryTop}>
            <View>
              <Text variant="caption" color="textTertiary">
                Spent this year
              </Text>
              <Text style={s.summaryAmount}>
                {summary.currency}
                {summary.thisYear.toLocaleString()}
              </Text>
            </View>
            <Pressable style={s.summaryLink} onPress={() => {}}>
              <Text variant="caption" style={{ color: palette.primary600, fontWeight: '600' }}>
                Spend history
              </Text>
            </Pressable>
          </View>

          <View style={s.statRow}>
            <Stat value={String(summary.flightsFlown)} label="Flights flown" />
            <View style={s.statDivider} />
            <Stat value={String(summary.upcomingCount)} label="Upcoming" />
            <View style={s.statDivider} />
            <Stat
              value={`${summary.currency}${(summary.totalPaid / 1000).toFixed(1)}k`}
              label="All time"
            />
          </View>

          {routes.length > 0 && (
            <View style={s.routes}>
              <Text variant="caption" color="textTertiary" style={{ marginBottom: 6 }}>
                MOST TRAVELLED
              </Text>
              {routes.map((r) => (
                <View key={r.route} style={s.routeRow}>
                  <Text variant="bodySmall" style={{ flex: 1 }}>
                    {r.route}
                  </Text>
                  <Text variant="caption" color="textTertiary">
                    {r.count} {r.count > 1 ? 'trips' : 'trip'}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* ── Carbon footprint — honest placeholder ── */}
        <View style={s.carbon}>
          <View style={s.carbonIcon}>
            <Feather name="wind" size={18} color={palette.successDark} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={s.carbonTitleRow}>
              <Text variant="bodyMedium">Carbon footprint</Text>
              <View style={s.soonTag}>
                <Text variant="caption" style={{ color: palette.gray600, fontWeight: '600' }}>
                  Coming soon
                </Text>
              </View>
            </View>
            <Text variant="caption" color="textTertiary">
              Per-flight emissions and offsetting, once we have verified data for
              every route and aircraft.
            </Text>
          </View>
        </View>

        {/* ── Travellers ── */}
        <SectionLabel text="Saved travellers" />
        <View style={s.card}>
          {savedTravellers.map((t, i) => {
            const attention = documentNeedsAttention(t);
            return (
              <Pressable
                key={t.id}
                style={[s.row, i === savedTravellers.length - 1 && s.rowLast]}
                onPress={() => {}}
              >
                <View style={s.travMark}>
                  <Text variant="bodySmall" style={{ color: palette.gray700, fontWeight: '700' }}>
                    {t.name.charAt(0)}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text variant="bodyMedium">{t.name}</Text>
                  <Text variant="caption" color="textTertiary">
                    {t.relationship}
                    {t.type !== 'adult' ? ` · ${t.type}` : ''}
                  </Text>
                </View>
                {attention ? (
                  <View style={s.attentionTag}>
                    <Feather name="alert-circle" size={12} color={palette.warningDark} />
                    <Text variant="caption" style={{ color: palette.warningDark, fontWeight: '600' }}>
                      Passport
                    </Text>
                  </View>
                ) : (
                  <Feather name="chevron-right" size={18} color={palette.gray400} />
                )}
              </Pressable>
            );
          })}
          <Pressable style={s.addRow} onPress={() => {}}>
            <Feather name="plus" size={17} color={palette.primary600} />
            <Text variant="bodySmall" style={{ color: palette.primary600, fontWeight: '600' }}>
              Add a traveller
            </Text>
          </Pressable>
        </View>
        {docsNeedingAttention > 0 && (
          <Text variant="caption" color="textTertiary" style={s.hint}>
            {docsNeedingAttention} traveller
            {docsNeedingAttention > 1 ? 's need' : ' needs'} passport details before an
            international booking.
          </Text>
        )}

        {/* ── Preferences ── */}
        <SectionLabel text="Travel preferences" />
        <View style={s.card}>
          <PrefRow icon="grid" label="Seat" value={preferences.seat} />
          <PrefRow icon="coffee" label="Meal" value={preferences.meal} />
          <PrefRow icon="map-pin" label="Home airport" value={preferences.homeAirport} />
          <PrefRow icon="dollar-sign" label="Currency" value={preferences.currency} last />
        </View>

        {/* ── Notifications ── */}
        <SectionLabel text="Notifications" />
        <View style={s.card}>
          {notifs.map((n, i) => (
            <View key={n.id} style={[s.notifRow, i === notifs.length - 1 && s.rowLast]}>
              <View style={{ flex: 1 }}>
                <View style={s.notifTitleRow}>
                  <Text variant="bodySmall">{n.title}</Text>
                  <View style={s.channelTag}>
                    <Feather
                      name={n.channel === 'push' ? 'smartphone' : 'mail'}
                      size={10}
                      color={palette.gray500}
                    />
                    <Text variant="caption" color="textTertiary">
                      {n.channel}
                    </Text>
                  </View>
                </View>
                <Text variant="caption" color="textTertiary">
                  {n.detail}
                </Text>
              </View>
              <Toggle on={n.enabled} onPress={() => toggleNotif(n.id)} />
            </View>
          ))}
        </View>

        {/* ── Payment methods ── */}
        <SectionLabel text="Payment methods" />
        <View style={s.card}>
          {paymentMethods.map((pm, i) => (
            <Pressable
              key={pm.id}
              style={[s.row, i === paymentMethods.length - 1 && s.rowLast]}
              onPress={() => {}}
            >
              <View style={s.pmIcon}>
                <Feather
                  name={pm.kind === 'upi' ? 'smartphone' : 'credit-card'}
                  size={17}
                  color={palette.gray700}
                />
              </View>
              <View style={{ flex: 1 }}>
                <View style={s.pmTitleRow}>
                  <Text variant="bodyMedium">{pm.label}</Text>
                  {pm.primary && (
                    <View style={s.primaryTag}>
                      <Text variant="caption" style={{ color: palette.primary700, fontWeight: '600' }}>
                        Primary
                      </Text>
                    </View>
                  )}
                </View>
                <Text variant="caption" color="textTertiary">
                  {pm.detail}
                </Text>
              </View>
              <Feather name="chevron-right" size={18} color={palette.gray400} />
            </Pressable>
          ))}
          <Pressable style={s.addRow} onPress={() => {}}>
            <Feather name="plus" size={17} color={palette.primary600} />
            <Text variant="bodySmall" style={{ color: palette.primary600, fontWeight: '600' }}>
              Add a payment method
            </Text>
          </Pressable>
        </View>

        {/* ── Support & legal ── */}
        <SectionLabel text="Support" />
        <View style={s.card}>
          <LinkRow icon="help-circle" label="Help centre" />
          <LinkRow icon="file-text" label="Terms and privacy" />
          <LinkRow icon="log-out" label="Sign out" danger last />
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Pieces ──────────────────────────────────────────────

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View style={s.stat}>
      <Text style={s.statValue}>{value}</Text>
      <Text variant="caption" color="textTertiary" align="center">
        {label}
      </Text>
    </View>
  );
}

function PrefRow({
  icon,
  label,
  value,
  last,
}: {
  icon: string;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <Pressable style={[s.row, last && s.rowLast]} onPress={() => {}}>
      <View style={s.prefIcon}>
        <Feather name={icon as never} size={16} color={palette.gray600} />
      </View>
      <Text variant="bodySmall" style={{ flex: 1 }}>
        {label}
      </Text>
      <Text variant="bodySmall" color="textSecondary">
        {value}
      </Text>
      <Feather name="chevron-right" size={18} color={palette.gray400} style={{ marginLeft: 6 }} />
    </Pressable>
  );
}

function LinkRow({
  icon,
  label,
  danger,
  last,
}: {
  icon: string;
  label: string;
  danger?: boolean;
  last?: boolean;
}) {
  return (
    <Pressable style={[s.row, last && s.rowLast]} onPress={() => {}}>
      <View style={s.prefIcon}>
        <Feather
          name={icon as never}
          size={16}
          color={danger ? palette.error : palette.gray600}
        />
      </View>
      <Text
        variant="bodySmall"
        style={{ flex: 1, color: danger ? palette.error : palette.gray900 }}
      >
        {label}
      </Text>
      {!danger && <Feather name="chevron-right" size={18} color={palette.gray400} />}
    </Pressable>
  );
}

function Toggle({ on, onPress }: { on: boolean; onPress: () => void }) {
  return (
    <Pressable
      style={[s.toggle, on && s.toggleOn]}
      onPress={onPress}
      hitSlop={6}
    >
      <View style={[s.knob, on && s.knobOn]} />
    </Pressable>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <Text variant="label" color="textTertiary" style={s.sectionLabel}>
      {text.toUpperCase()}
    </Text>
  );
}

// ─── Styles ──────────────────────────────────────────────

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.gray50 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: HPAD,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.gray200,
    alignItems: 'center',
    justifyContent: 'center',
  },

  scroll: { paddingHorizontal: HPAD },

  // Profile
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: palette.white,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: palette.gray200,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: palette.primary500,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Summary
  summary: {
    backgroundColor: palette.white,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: palette.gray200,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  summaryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  summaryAmount: { fontSize: 28, fontWeight: '700', color: palette.gray900, lineHeight: 34 },
  summaryLink: {
    backgroundColor: palette.primary50,
    paddingHorizontal: spacing.md,
    paddingVertical: 7,
    borderRadius: radii.full,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: palette.gray200,
  },
  stat: { flex: 1, alignItems: 'center', gap: 2 },
  statValue: { fontSize: 20, fontWeight: '700', color: palette.gray900 },
  statDivider: { width: StyleSheet.hairlineWidth, height: 32, backgroundColor: palette.gray200 },

  routes: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: palette.gray200,
  },
  routeRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 5 },

  // Carbon
  carbon: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    backgroundColor: palette.successLight,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  carbonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carbonTitleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: 2 },
  soonTag: {
    backgroundColor: palette.white,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radii.xs,
  },

  // Sections
  sectionLabel: { letterSpacing: 1, marginTop: spacing.md, marginBottom: spacing.sm },
  card: {
    backgroundColor: palette.white,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: palette.gray200,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    minHeight: 60,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: palette.gray100,
  },
  rowLast: { borderBottomWidth: 0 },

  travMark: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: palette.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attentionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: palette.warningLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radii.full,
  },
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    minHeight: 52,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: palette.gray100,
  },
  hint: { marginTop: spacing.sm, paddingHorizontal: spacing.xs },

  prefIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: palette.gray50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  notifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    minHeight: 64,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: palette.gray100,
  },
  notifTitleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: 2 },
  channelTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: palette.gray50,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radii.xs,
  },

  pmIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: palette.gray50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pmTitleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  primaryTag: {
    backgroundColor: palette.primary50,
    paddingHorizontal: spacing.sm,
    paddingVertical: 1,
    borderRadius: radii.xs,
  },

  toggle: {
    width: 46,
    height: 28,
    borderRadius: 14,
    backgroundColor: palette.gray300,
    padding: 3,
    justifyContent: 'center',
  },
  toggleOn: { backgroundColor: palette.primary500 },
  knob: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: palette.white,
  },
  knobOn: { alignSelf: 'flex-end' },
});

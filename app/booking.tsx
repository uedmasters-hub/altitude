import { useState, useMemo, useCallback, useRef } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Pressable,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Text } from '../components/ui';
import { palette, spacing, radii, typography, shadows } from '../constants/tokens';
import { PassengerSheet } from '../components/PassengerSheet';
import { ExtrasSheet, type ExtraKind } from '../components/ExtrasSheet';
import { SeatSheet } from '../components/SeatSheet';
import {
  emptyPassenger,
  passengerName,
  isComplete,
  validateContact,
  buildQuote,
  firstBlocker,
  seatPrice,
  meals,
  baggage,
  payMethods,
  PASSENGER_LABEL,
  type Passenger,
  type Contact,
  type PayMethod,
} from '../data/booking';

const HPAD = spacing.lg;
const BASE_FARE = 4250;

const INTERNATIONAL = false; // Set true when the route crosses a border
const DEPART_ISO = new Date(Date.now() + 19.5 * 3600_000).toISOString();

const FLIGHT = {
  route: 'DEL → BLR',
  date: 'Sat, 15 Aug',
  airline: 'Air India',
  code: 'AI',
  color: '#CD2C2C',
  flightNumber: 'AI 806',
  depart: '06:15',
  arrive: '08:50',
  duration: '2h 35m',
  fare: 'Economy',
  refundable: true,
};

let seq = 0;
const nextId = () => `p${++seq}`;

export default function Booking() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [contact, setContact] = useState<Contact>({ email: '', phone: '' });
  const [contactTouched, setContactTouched] = useState(false);
  const [method, setMethod] = useState<PayMethod | null>(null);

  const [summaryOpen, setSummaryOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const [editing, setEditing] = useState<Passenger | null>(null);
  const [editIndex, setEditIndex] = useState(0);
  const [extras, setExtras] = useState<ExtraKind | null>(null);
  const [seatsOpen, setSeatsOpen] = useState(false);
  const [paid, setPaid] = useState(false);

  const scrollRef = useRef<ScrollView>(null);

  const animate = () =>
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  const quote = useMemo(
    () => buildQuote(passengers, BASE_FARE),
    [passengers],
  );
  const contactErrors = useMemo(() => validateContact(contact), [contact]);
  const blocker = useMemo(
    () => firstBlocker(passengers, contact, method),
    [passengers, contact, method],
  );

  // ── Passenger actions ──
  const addPassenger = useCallback(() => {
    const p = emptyPassenger(passengers.length === 0 ? 'adult' : 'adult', nextId());
    setEditIndex(passengers.length);
    setEditing(p);
  }, [passengers.length]);

  const savePassenger = useCallback((p: Passenger) => {
    animate();
    setPassengers((list) => {
      const i = list.findIndex((x) => x.id === p.id);
      return i === -1 ? [...list, p] : list.map((x) => (x.id === p.id ? p : x));
    });
    setEditing(null);
  }, []);

  const removePassenger = useCallback((id: string) => {
    animate();
    setPassengers((list) => list.filter((p) => p.id !== id));
    setEditing(null);
  }, []);

  // ── Extras summaries ──
  const seatSummary = useMemo(() => {
    const chosen = passengers.filter((p) => p.seat);
    if (chosen.length === 0) return null;
    const cost = passengers.reduce((n, p) => n + seatPrice(p.seat), 0);
    return `${chosen.map((p) => p.seat).join(', ')} · ₹${cost.toLocaleString()}`;
  }, [passengers]);

  const mealSummary = useMemo(() => {
    const chosen = passengers.filter((p) => p.mealId && p.mealId !== 'none');
    if (chosen.length === 0) return null;
    const cost = chosen.reduce(
      (n, p) => n + (meals.find((m) => m.id === p.mealId)?.price ?? 0),
      0,
    );
    return `${chosen.length} meal${chosen.length > 1 ? 's' : ''} · ₹${cost.toLocaleString()}`;
  }, [passengers]);

  const baggageSummary = useMemo(() => {
    const chosen = passengers.filter((p) => p.baggageId && p.baggageId !== 'included');
    if (chosen.length === 0) return null;
    const cost = chosen.reduce(
      (n, p) => n + (baggage.find((b) => b.id === p.baggageId)?.price ?? 0),
      0,
    );
    return `${chosen.length} added · ₹${cost.toLocaleString()}`;
  }, [passengers]);

  const assistSummary = useMemo(() => {
    const n = passengers.reduce((sum, p) => sum + p.assistance.length, 0);
    return n === 0 ? null : `${n} request${n > 1 ? 's' : ''}`;
  }, [passengers]);

  // ── Pay ──
  const handlePay = useCallback(() => {
    setAttempted(true);
    if (blocker) {
      setContactTouched(true);
      if (blocker.kind === 'contact' || blocker.kind === 'payment') {
        scrollRef.current?.scrollToEnd({ animated: true });
      } else {
        scrollRef.current?.scrollTo({ y: 0, animated: true });
      }
      return;
    }
    animate();
    setPaid(true);
  }, [blocker]);

  if (paid) {
    return (
      <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
        <View style={s.done}>
          <View style={s.doneIcon}>
            <Feather name="check" size={30} color={palette.white} />
          </View>
          <Text variant="h1" align="center">
            Booking confirmed
          </Text>
          <Text variant="bodySmall" color="textSecondary" align="center">
            We have sent the ticket to {contact.email}
          </Text>
          <View style={s.doneCard}>
            <Text variant="caption" color="textTertiary">
              {FLIGHT.flightNumber} · {FLIGHT.date}
            </Text>
            <Text variant="h2" style={{ marginTop: 2 }}>
              {FLIGHT.route}
            </Text>
            <Text variant="bodySmall" color="textSecondary" style={{ marginTop: 6 }}>
              {passengers.length} passenger{passengers.length > 1 ? 's' : ''} · ₹
              {quote.total.toLocaleString()}
            </Text>
          </View>

          <Pressable
            style={s.doneCta}
            onPress={() => router.replace('/itinerary')}
          >
            <Text variant="bodyMedium" style={{ color: palette.white, fontWeight: '600' }}>
              View your trip
            </Text>
            <Feather name="arrow-right" size={17} color={palette.white} />
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      {/* Header */}
      <View style={s.header}>
        <Pressable style={s.back} onPress={() => {}}>
          <Feather name="chevron-left" size={21} color={palette.gray900} />
        </Pressable>
        <Text variant="h2" style={{ flex: 1 }}>
          Review and pay
        </Text>
      </View>

      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Flight, kept quiet ── */}
        <Pressable
          style={s.flight}
          onPress={() => {
            animate();
            setSummaryOpen((v) => !v);
          }}
        >
          <View style={[s.airline, { backgroundColor: FLIGHT.color }]}>
            <Text variant="caption" style={{ color: palette.white, fontWeight: '700' }}>
              {FLIGHT.code}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="bodyMedium">{FLIGHT.route}</Text>
            <Text variant="caption" color="textTertiary">
              {FLIGHT.date} · {FLIGHT.depart} · {FLIGHT.fare}
            </Text>
          </View>
          <Feather
            name={summaryOpen ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={palette.gray400}
          />
        </Pressable>

        {summaryOpen && (
          <View style={s.flightDetail}>
            <DetailLine label="Flight" value={`${FLIGHT.airline} · ${FLIGHT.flightNumber}`} />
            <DetailLine label="Departs" value={`${FLIGHT.depart} · Delhi (T3)`} />
            <DetailLine label="Arrives" value={`${FLIGHT.arrive} · Bengaluru (T1)`} />
            <DetailLine label="Duration" value={`${FLIGHT.duration} · Direct`} />
            <DetailLine
              label="Fare"
              value={FLIGHT.refundable ? 'Economy · Refundable' : 'Economy'}
            />
          </View>
        )}

        {/* ── Passengers: the focus of this page ── */}
        <SectionLabel>PASSENGERS</SectionLabel>

        {passengers.length === 0 ? (
          <Pressable
            style={[s.empty, attempted && s.emptyBlocked]}
            onPress={addPassenger}
          >
            <View style={s.emptyIcon}>
              <Feather name="user-plus" size={20} color={palette.primary600} />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="bodyMedium">Add the first passenger</Text>
              <Text variant="caption" color="textTertiary">
                Name must match the ID used at the airport
              </Text>
            </View>
            <Feather name="chevron-right" size={18} color={palette.gray400} />
          </Pressable>
        ) : (
          <>
            {passengers.map((p, i) => {
              const complete = isComplete(p);
              return (
                <Pressable
                  key={p.id}
                  style={[s.passenger, !complete && attempted && s.passengerBlocked]}
                  onPress={() => {
                    setEditIndex(i);
                    setEditing(p);
                  }}
                >
                  <View style={[s.pIndex, complete && s.pIndexOk]}>
                    {complete ? (
                      <Feather name="check" size={14} color={palette.white} />
                    ) : (
                      <Text
                        variant="caption"
                        style={{ color: palette.gray600, fontWeight: '700' }}
                      >
                        {i + 1}
                      </Text>
                    )}
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text variant="bodyMedium" numberOfLines={1}>
                      {complete
                        ? `${p.title} ${passengerName(p)}`
                        : passengerName(p)}
                    </Text>
                    <Text variant="caption" color="textTertiary" numberOfLines={1}>
                      {complete
                        ? [
                            PASSENGER_LABEL[p.type],
                            p.seat && `Seat ${p.seat}`,
                            p.mealId &&
                              p.mealId !== 'none' &&
                              meals.find((m) => m.id === p.mealId)?.name,
                            p.assistance.length > 0 && 'Assistance requested',
                          ]
                            .filter(Boolean)
                            .join(' · ')
                        : 'Tap to complete details'}
                    </Text>
                  </View>

                  {!complete && (
                    <View style={s.warn}>
                      <Feather name="alert-circle" size={13} color={palette.warningDark} />
                    </View>
                  )}
                  <Feather name="chevron-right" size={18} color={palette.gray400} />
                </Pressable>
              );
            })}

            <Pressable style={s.addRow} onPress={addPassenger}>
              <Feather name="plus" size={17} color={palette.primary600} />
              <Text variant="bodySmall" style={{ color: palette.primary600, fontWeight: '600' }}>
                Add another passenger
              </Text>
            </Pressable>
          </>
        )}

        {/* ── Extras: quiet rows ── */}
        <SectionLabel>EXTRAS</SectionLabel>

        <View style={s.extras}>
          <ExtraRow
            icon="grid"
            label="Seats"
            value={seatSummary}
            fallback="Assigned free at check-in"
            onPress={() => setSeatsOpen(true)}
          />
          <ExtraRow
            icon="coffee"
            label="Meals"
            value={mealSummary}
            fallback="Buy on board"
            onPress={() => setExtras('meal')}
          />
          <ExtraRow
            icon="briefcase"
            label="Extra baggage"
            value={baggageSummary}
            fallback="15 kg included"
            onPress={() => setExtras('baggage')}
          />
          <ExtraRow
            icon="heart"
            label="Special assistance"
            value={assistSummary}
            fallback="Wheelchair, medical and more"
            onPress={() => setExtras('assistance')}
            last
          />
        </View>

        {/* ── Contact ── */}
        <SectionLabel>CONTACT</SectionLabel>
        <Text variant="caption" color="textTertiary" style={s.sectionNote}>
          Ticket and airline updates go here
        </Text>

        <View style={s.field}>
          <TextInput
            style={[
              s.input,
              contactTouched && contactErrors.email && s.inputError,
            ]}
            value={contact.email}
            onChangeText={(v) => setContact((c) => ({ ...c, email: v }))}
            onBlur={() => setContactTouched(true)}
            placeholder="Email address"
            placeholderTextColor={palette.gray400}
            selectionColor={palette.primary500}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {contactTouched && contactErrors.email && (
            <ErrorLine text={contactErrors.email} />
          )}
        </View>

        <View style={s.field}>
          <View style={s.phoneRow}>
            <View style={s.dial}>
              <Text variant="bodySmall">+91</Text>
            </View>
            <TextInput
              style={[
                s.input,
                s.phoneInput,
                contactTouched && contactErrors.phone && s.inputError,
              ]}
              value={contact.phone}
              onChangeText={(v) =>
                setContact((c) => ({ ...c, phone: v.replace(/\D/g, '').slice(0, 10) }))
              }
              onBlur={() => setContactTouched(true)}
              placeholder="Mobile number"
              placeholderTextColor={palette.gray400}
              selectionColor={palette.primary500}
              keyboardType="number-pad"
            />
          </View>
          {contactTouched && contactErrors.phone && (
            <ErrorLine text={contactErrors.phone} />
          )}
        </View>

        {/* ── Payment ── */}
        <SectionLabel>PAYMENT</SectionLabel>

        <View style={s.extras}>
          {payMethods.map((m, i) => (
            <Pressable
              key={m.id}
              style={[s.payRow, i === payMethods.length - 1 && { borderBottomWidth: 0 }]}
              onPress={() => setMethod(m.id)}
            >
              <View style={s.payIcon}>
                <Feather name={m.icon as never} size={17} color={palette.gray600} />
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="bodyMedium">{m.name}</Text>
                <Text variant="caption" color="textTertiary">
                  {m.note}
                </Text>
              </View>
              <View style={[s.radio, method === m.id && s.radioOn]}>
                {method === m.id && <Feather name="check" size={13} color={palette.white} />}
              </View>
            </Pressable>
          ))}
        </View>

        <View style={s.secure}>
          <Feather name="lock" size={13} color={palette.gray500} />
          <Text variant="caption" color="textTertiary" style={{ flex: 1 }}>
            Card and UPI details are collected on the next screen by the payment
            provider.
          </Text>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>

      {/* ── Price breakdown ── */}
      {priceOpen && passengers.length > 0 && (
        <View style={s.breakdown}>
          {quote.lines.map((l) => (
            <View key={l.label} style={s.breakLine}>
              <View style={{ flex: 1 }}>
                <Text variant="bodySmall">{l.label}</Text>
                {l.note && (
                  <Text variant="caption" color="textTertiary">
                    {l.note}
                  </Text>
                )}
              </View>
              <Text variant="bodySmall">₹{l.amount.toLocaleString()}</Text>
            </View>
          ))}
        </View>
      )}

      {/* ── Pay ── */}
      <View style={[s.bar, { paddingBottom: insets.bottom + spacing.md }]}>
        <Pressable
          style={{ flex: 1 }}
          onPress={() => {
            animate();
            setPriceOpen((v) => !v);
          }}
          disabled={passengers.length === 0}
        >
          <View style={s.totalRow}>
            <Text variant="caption" color="textTertiary">
              Total
            </Text>
            {passengers.length > 0 && (
              <Feather
                name={priceOpen ? 'chevron-down' : 'chevron-up'}
                size={13}
                color={palette.gray500}
              />
            )}
          </View>
          <Text style={s.total}>
            ₹{passengers.length === 0 ? '—' : quote.total.toLocaleString()}
          </Text>
        </Pressable>

        <Pressable
          style={[s.pay, blocker && s.payBlocked]}
          onPress={handlePay}
        >
          <Text variant="bodyMedium" style={{ color: palette.white, fontWeight: '600' }}>
            {blocker ? 'Continue' : `Pay ₹${quote.total.toLocaleString()}`}
          </Text>
          {!blocker && <Feather name="arrow-right" size={17} color={palette.white} />}
        </Pressable>
      </View>

      {blocker && attempted && (
        <View style={[s.blockerBar, { paddingBottom: insets.bottom }]}>
          <Feather name="alert-circle" size={14} color={palette.white} />
          <Text variant="caption" style={{ color: palette.white, flex: 1 }}>
            {blocker.message}
          </Text>
        </View>
      )}

      {/* ── Sheets ── */}
      <PassengerSheet
        visible={editing !== null}
        passenger={editing}
        index={editIndex}
        international={INTERNATIONAL}
        departISO={DEPART_ISO}
        onClose={() => setEditing(null)}
        onSave={(p, _doc) => savePassenger(p)}
        onRemove={
          editing && passengers.some((p) => p.id === editing.id)
            ? removePassenger
            : undefined
        }
      />

      <SeatSheet
        visible={seatsOpen}
        passengers={passengers}
        onClose={() => setSeatsOpen(false)}
        onApply={(next) => {
          animate();
          setPassengers(next);
          setSeatsOpen(false);
        }}
      />

      <ExtrasSheet
        kind={extras ?? 'meal'}
        visible={extras !== null}
        passengers={passengers}
        onClose={() => setExtras(null)}
        onApply={(next) => {
          animate();
          setPassengers(next);
          setExtras(null);
        }}
      />
    </SafeAreaView>
  );
}

// ─── Small pieces ────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <Text variant="label" color="textTertiary" style={s.sectionLabel}>
      {children}
    </Text>
  );
}

function DetailLine({ label, value }: { label: string; value: string }) {
  return (
    <View style={s.detailLine}>
      <Text variant="caption" color="textTertiary" style={{ width: 80 }}>
        {label}
      </Text>
      <Text variant="caption" style={{ flex: 1 }}>
        {value}
      </Text>
    </View>
  );
}

function ErrorLine({ text }: { text: string }) {
  return (
    <View style={s.errorLine}>
      <Feather name="alert-circle" size={12} color={palette.error} />
      <Text variant="caption" style={{ color: palette.error }}>
        {text}
      </Text>
    </View>
  );
}

function ExtraRow({
  icon,
  label,
  value,
  fallback,
  onPress,
  last,
}: {
  icon: string;
  label: string;
  value: string | null;
  fallback: string;
  onPress: () => void;
  last?: boolean;
}) {
  return (
    <Pressable
      style={[s.extraRow, last && { borderBottomWidth: 0 }]}
      onPress={onPress}
    >
      <View style={s.extraIcon}>
        <Feather name={icon as never} size={17} color={palette.gray600} />
      </View>
      <View style={{ flex: 1 }}>
        <Text variant="bodyMedium">{label}</Text>
        <Text
          variant="caption"
          style={{ color: value ? palette.primary600 : palette.gray500 }}
          numberOfLines={1}
        >
          {value ?? fallback}
        </Text>
      </View>
      <View style={s.extraAction}>
        <Feather
          name={value ? 'edit-2' : 'plus'}
          size={15}
          color={palette.primary600}
        />
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.white },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: HPAD,
    paddingVertical: spacing.sm,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: palette.gray200,
    alignItems: 'center',
    justifyContent: 'center',
  },

  scroll: { paddingHorizontal: HPAD, paddingTop: spacing.md },

  // Flight
  flight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: palette.gray50,
    borderRadius: radii.md,
    padding: spacing.md,
    minHeight: 64,
  },
  airline: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flightDetail: {
    backgroundColor: palette.gray50,
    borderBottomLeftRadius: radii.md,
    borderBottomRightRadius: radii.md,
    marginTop: -spacing.sm,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  detailLine: { flexDirection: 'row', paddingVertical: 4 },

  sectionLabel: { letterSpacing: 1, marginTop: spacing.xl, marginBottom: spacing.sm },
  sectionNote: { marginTop: -spacing.xs, marginBottom: spacing.md },

  // Passengers
  empty: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: palette.primary300,
    backgroundColor: palette.primary50,
    borderRadius: radii.md,
    padding: spacing.md,
    minHeight: 72,
  },
  emptyBlocked: { borderColor: palette.warning, backgroundColor: palette.warningLight },
  emptyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  passenger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderWidth: 1,
    borderColor: palette.gray200,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    minHeight: 68,
  },
  passengerBlocked: { borderColor: palette.warning, backgroundColor: palette.warningLight },
  pIndex: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: palette.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pIndexOk: { backgroundColor: palette.success },
  warn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: palette.warningLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    minHeight: 48,
  },

  // Extras
  extras: {
    borderWidth: 1,
    borderColor: palette.gray200,
    borderRadius: radii.md,
    overflow: 'hidden',
  },
  extraRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    minHeight: 68,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: palette.gray200,
  },
  extraIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: palette.gray50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  extraAction: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: palette.primary50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Contact
  field: { marginBottom: spacing.md },
  input: {
    ...typography.body,
    color: palette.gray900,
    minHeight: 52,
    borderWidth: 1,
    borderColor: palette.gray200,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
  },
  inputError: { borderColor: palette.error },
  phoneRow: { flexDirection: 'row', gap: spacing.sm },
  dial: {
    width: 62,
    minHeight: 52,
    borderWidth: 1,
    borderColor: palette.gray200,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.gray50,
  },
  phoneInput: { flex: 1 },
  errorLine: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 6 },

  // Payment
  payRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    minHeight: 68,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: palette.gray200,
  },
  payIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: palette.gray50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: palette.gray300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOn: { backgroundColor: palette.primary500, borderColor: palette.primary500 },

  secure: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },

  // Breakdown
  breakdown: {
    backgroundColor: palette.gray50,
    paddingHorizontal: HPAD,
    paddingVertical: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: palette.gray200,
  },
  breakLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },

  // Pay bar
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: HPAD,
    paddingTop: spacing.md,
    backgroundColor: palette.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: palette.gray200,
    ...shadows.floating,
  },
  totalRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  total: { fontSize: 22, fontWeight: '700', color: palette.gray900, lineHeight: 27 },
  pay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: palette.primary500,
    paddingHorizontal: spacing.lg,
    minHeight: 52,
    borderRadius: radii.full,
    justifyContent: 'center',
  },
  payBlocked: { backgroundColor: palette.gray400 },

  blockerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: palette.warningDark,
    paddingHorizontal: HPAD,
    paddingTop: spacing.sm,
  },

  // Confirmation
  done: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: HPAD,
    gap: spacing.sm,
  },
  doneIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: palette.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  doneCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    alignSelf: 'stretch',
    minHeight: 52,
    backgroundColor: palette.primary500,
    borderRadius: radii.full,
    marginTop: spacing.lg,
  },
  doneCard: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: palette.gray200,
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginTop: spacing.xl,
  },
});

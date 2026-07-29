import { useState, useRef, useMemo, useCallback } from 'react';
import {
  View,
  TextInput,
  SectionList,
  Pressable,
  StyleSheet,
  Keyboard,
  LayoutAnimation,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Text, Row } from '../components/ui';
import { colors, palette, spacing, radii, typography } from '../constants/tokens';
import { allAirports } from '../data/airports';
import type { Airport } from '../types';

// ─── Helpers ─────────────────────────────────────────────

/** Group airports by first letter of city, sorted Z→A */
function groupByLetter(list: Airport[]) {
  const map = new Map<string, Airport[]>();
  for (const a of list) {
    const letter = a.city[0].toUpperCase();
    if (!map.has(letter)) map.set(letter, []);
    map.get(letter)!.push(a);
  }
  // Sort groups Z→A, items within group Z→A
  return [...map.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([letter, data]) => ({
      title: letter,
      data: data.sort((a, b) => b.city.localeCompare(a.city)),
    }));
}

/** Fuzzy search — match city name, prioritise prefix */
function searchAirports(query: string, list: Airport[]) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return list
    .filter(
      (a) =>
        a.city.toLowerCase().includes(q) ||
        a.iata.toLowerCase().includes(q) ||
        a.name.toLowerCase().includes(q),
    )
    .sort((a, b) => {
      // Prefix matches first
      const aPrefix = a.city.toLowerCase().startsWith(q) ? 0 : 1;
      const bPrefix = b.city.toLowerCase().startsWith(q) ? 0 : 1;
      if (aPrefix !== bPrefix) return aPrefix - bPrefix;
      return a.city.localeCompare(b.city);
    });
}

// ─── Bold match component ────────────────────────────────

function HighlightedText({ text, highlight }: { text: string; highlight: string }) {
  if (!highlight.trim()) {
    return <Text style={styles.airportCity}>{text}</Text>;
  }

  const idx = text.toLowerCase().indexOf(highlight.toLowerCase());
  if (idx === -1) {
    return <Text style={styles.airportCity}>{text}</Text>;
  }

  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + highlight.length);
  const after = text.slice(idx + highlight.length);

  return (
    <Text style={styles.airportCity}>
      {before}
      <Text style={styles.airportCityBold}>{match}</Text>
      {after}
    </Text>
  );
}

// ─── Alphabet scrubber ───────────────────────────────────

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').reverse();

function AlphabetScrubber({
  activeLetters,
  onPress,
}: {
  activeLetters: Set<string>;
  onPress: (letter: string) => void;
}) {
  return (
    <View style={styles.scrubber}>
      {LETTERS.map((letter) => {
        const isActive = activeLetters.has(letter);
        return (
          <Pressable
            key={letter}
            onPress={() => isActive && onPress(letter)}
            hitSlop={4}
          >
            <Text
              style={[
                styles.scrubberLetter,
                isActive ? styles.scrubberActive : styles.scrubberInactive,
              ]}
            >
              {letter}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

// ─── Main screen ─────────────────────────────────────────

export default function AirportSearch() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Airport | null>(null);
  const inputRef = useRef<TextInput>(null);
  const listRef = useRef<SectionList>(null);

  const isSearching = query.length > 0;

  // Grouped list (Z→A)
  const sections = useMemo(() => groupByLetter(allAirports), []);

  // Search results
  const searchResults = useMemo(
    () => (isSearching ? searchAirports(query, allAirports) : []),
    [query, isSearching],
  );

  // Active letters for scrubber
  const activeLetters = useMemo(
    () => new Set(sections.map((s) => s.title)),
    [sections],
  );

  const handleSelect = useCallback((airport: Airport) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelected(airport);
    Keyboard.dismiss();
  }, []);

  const handleScrubberPress = useCallback(
    (letter: string) => {
      const sectionIndex = sections.findIndex((s) => s.title === letter);
      if (sectionIndex >= 0 && listRef.current) {
        listRef.current.scrollToLocation({
          sectionIndex,
          itemIndex: 0,
          viewOffset: 40,
          animated: true,
        });
      }
    },
    [sections],
  );

  const handleClear = useCallback(() => {
    setQuery('');
    inputRef.current?.focus();
  }, []);

  // ── Render ──

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      {/* Header */}
      <Row justify="space-between" style={styles.header}>
        <View style={styles.locationPill}>
          <Text style={{ fontSize: 14 }}>📍</Text>
          <Text variant="bodySmall">New Delhi, India</Text>
          <Feather name="chevron-down" size={14} color={palette.gray500} />
        </View>
        <Pressable style={styles.closeBtn} onPress={() => {}}>
          <Feather name="x" size={20} color={palette.gray600} />
        </Pressable>
      </Row>

      {/* Selected confirmation */}
      {selected && (
        <View style={styles.selectedBanner}>
          <Text variant="bodyMedium" color="textInverse">
            Selected: {selected.city} ({selected.iata})
          </Text>
        </View>
      )}

      {/* Content: either full list or search results */}
      <View style={styles.content}>
        {isSearching ? (
          // ── Search results ──
          <View style={styles.searchResults}>
            {searchResults.length > 0 ? (
              <>
                <Text
                  variant="caption"
                  color="textTertiary"
                  style={styles.didYouMean}
                >
                  Did you mean
                </Text>
                {searchResults.map((airport) => (
                  <Pressable
                    key={`${airport.iata}-${airport.city}`}
                    style={({ pressed }) => [
                      styles.resultRow,
                      pressed && styles.resultRowPressed,
                    ]}
                    onPress={() => handleSelect(airport)}
                  >
                    <HighlightedText
                      text={`${airport.city} (${airport.iata})`}
                      highlight={query}
                    />
                  </Pressable>
                ))}
              </>
            ) : (
              <View style={styles.noResults}>
                <Text variant="body" color="textTertiary" align="center">
                  No airports found
                </Text>
                <Text variant="caption" color="textTertiary" align="center">
                  Try a different city or airport code
                </Text>
              </View>
            )}
          </View>
        ) : (
          // ── Full Z→A list with scrubber ──
          <View style={styles.listContainer}>
            <SectionList
              ref={listRef}
              sections={sections}
              keyExtractor={(item, index) => `${item.iata}-${item.city}-${index}`}
              renderItem={({ item }) => (
                <Pressable
                  style={({ pressed }) => [
                    styles.airportRow,
                    pressed && styles.airportRowPressed,
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.airportCity}>
                    {item.city} ({item.iata})
                  </Text>
                </Pressable>
              )}
              renderSectionFooter={({ section }) => (
                <Text style={styles.sectionLabel}>{section.title}</Text>
              )}
              stickySectionHeadersEnabled={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              keyboardShouldPersistTaps="handled"
              onScrollToIndexFailed={() => {}}
            />
            <AlphabetScrubber
              activeLetters={activeLetters}
              onPress={handleScrubberPress}
            />
          </View>
        )}
      </View>

      {/* Bottom search input */}
      <View style={styles.searchBar}>
        <Feather
          name="search"
          size={18}
          color={palette.gray400}
          style={styles.searchIcon}
        />
        <TextInput
          ref={inputRef}
          style={styles.searchInput}
          placeholder="Where to next?"
          placeholderTextColor={palette.gray400}
          value={query}
          onChangeText={(text) => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setQuery(text);
          }}
          selectionColor={palette.primary500}
          autoFocus
          returnKeyType="search"
        />
        {query.length > 0 && (
          <Pressable onPress={handleClear} hitSlop={8}>
            <Feather name="x-circle" size={18} color={palette.gray400} />
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: palette.white,
  },

  // Header
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.gray50,
    borderRadius: radii.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  closeBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: palette.gray200,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Selected banner
  selectedBanner: {
    backgroundColor: palette.primary500,
    marginHorizontal: spacing.lg,
    marginTop: spacing.xs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radii.sm,
    alignItems: 'center',
  },

  // Content area
  content: {
    flex: 1,
  },

  // ── Full list ──
  listContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  airportRow: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    borderRadius: radii.sm,
  },
  airportRowPressed: {
    backgroundColor: palette.gray50,
  },
  airportCity: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '400',
    color: palette.gray900,
  },
  airportCityBold: {
    fontWeight: '700',
    color: palette.gray900,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: palette.gray400,
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.xs,
  },

  // ── Alphabet scrubber ──
  scrubber: {
    position: 'absolute',
    right: 4,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.md,
    width: 24,
  },
  scrubberLetter: {
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
  },
  scrubberActive: {
    fontWeight: '700',
    color: palette.gray900,
  },
  scrubberInactive: {
    fontWeight: '400',
    color: palette.gray300,
  },

  // ── Search results ──
  searchResults: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  didYouMean: {
    paddingHorizontal: spacing.xs,
    marginBottom: spacing.sm,
  },
  resultRow: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    borderRadius: radii.sm,
  },
  resultRowPressed: {
    backgroundColor: palette.gray50,
  },
  noResults: {
    gap: spacing.xs,
    paddingBottom: spacing.xl,
  },

  // ── Search bar ──
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: palette.gray200,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: palette.white,
    gap: spacing.sm,
  },
  searchIcon: {
    marginRight: spacing.xs,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: palette.gray900,
    paddingVertical: spacing.sm,
  },
});

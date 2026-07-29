import { Text as RNText } from 'react-native';
import { palette } from '../../constants/tokens';

/**
 * Aircraft glyph.
 *
 * react-native-svg is a native module, so a version that does not match the
 * runtime fails to load and would otherwise take the whole screen down. A
 * decorative icon should never be able to do that, hence the guarded require
 * and the text fallback.
 */
let Svg: any = null;
let SvgPath: any = null;
try {
  const mod = require('react-native-svg');
  Svg = mod.default ?? mod.Svg;
  SvgPath = mod.Path;
} catch {
  Svg = null;
}

const PATH =
  'M-3.66642e-06 21.75L11 21.75L20.24 34.8L36.08 34.8L22 -2.88495e-06L35.2 ' +
  '-2.30796e-06L59.84 34.8L79.2 34.8C81.62 34.8 83.6917 35.6519 85.415 ' +
  '37.3556C87.1383 39.0594 88 41.1075 88 43.5C88 45.8925 87.1383 47.9406 ' +
  '85.415 49.6444C83.6917 51.3481 81.62 52.2 79.2 52.2L59.84 52.2L35.2 87L22 ' +
  '87L36.08 52.2L20.24 52.2L11 65.25L-5.56787e-06 65.25L6.6 43.5L-3.66642e-06 21.75Z';

/** U+FE0E forces the monochrome glyph rather than a colour emoji. */
const GLYPH = '\u2708\uFE0E';

export function Plane({
  size = 14,
  color = palette.gray600,
  up = false,
}: {
  size?: number;
  color?: string;
  up?: boolean;
}) {
  if (!Svg || !SvgPath) {
    return (
      <RNText
        style={{
          fontSize: size,
          lineHeight: size * 1.2,
          color,
          transform: [{ rotate: up ? '-45deg' : '45deg' }],
        }}
      >
        {GLYPH}
      </RNText>
    );
  }

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 88 87"
      style={up ? { transform: [{ rotate: '-90deg' }] } : undefined}
    >
      <SvgPath d={PATH} fill={color} />
    </Svg>
  );
}

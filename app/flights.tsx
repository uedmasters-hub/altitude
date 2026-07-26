import { Text, Screen } from '../components/ui';

export default function Flights() {
  return (
    <Screen anchor="top" edges={['top', 'bottom']}>
      <Text variant="h1">Recommended for you</Text>
    </Screen>
  );
}

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme/theme';

interface MoodDataPoint {
  day: string;
  value: number; // 0 to 100
}

interface MoodGraphPlaceholderProps {
  data?: MoodDataPoint[];
  style?: ViewStyle;
}

const DEFAULT_DATA: MoodDataPoint[] = [
  { day: 'M', value: 40 },
  { day: 'T', value: 65 },
  { day: 'W', value: 45 },
  { day: 'T', value: 80 },
  { day: 'F', value: 55 },
  { day: 'S', value: 70 },
  { day: 'S', value: 60 },
];

const MAX_BAR_HEIGHT = 80;

export default function MoodGraphPlaceholder({
  data = DEFAULT_DATA,
  style,
}: MoodGraphPlaceholderProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.graphContainer}>
        {data.map((point, index) => {
          const barHeight = (point.value / 100) * MAX_BAR_HEIGHT;
          return (
            <View key={index} style={styles.barColumn}>
              <View style={styles.barWrapper}>
                <View
                  style={[
                    styles.bar,
                    { height: barHeight },
                    point.value >= 70 && styles.barHigh,
                    point.value < 40 && styles.barLow,
                  ]}
                />
              </View>
              <Text style={styles.dayLabel}>{point.day}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.barHigh]} />
          <Text style={styles.legendText}>Good</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.bar]} />
          <Text style={styles.legendText}>Neutral</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.barLow]} />
          <Text style={styles.legendText}>Low</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  graphContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: MAX_BAR_HEIGHT + 30,
    paddingHorizontal: theme.spacing.sm,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barWrapper: {
    height: MAX_BAR_HEIGHT,
    justifyContent: 'flex-end',
  },
  bar: {
    width: 20,
    backgroundColor: theme.colors.lavender,
    borderRadius: 4,
    opacity: 0.7,
  },
  barHigh: {
    backgroundColor: '#7ED6A0',
    opacity: 0.85,
  },
  barLow: {
    backgroundColor: '#E6A07C',
    opacity: 0.75,
  },
  dayLabel: {
    marginTop: theme.spacing.sm,
    fontSize: theme.fontSizes.caption,
    color: `${theme.colors.softWhite}60`,
    fontWeight: '500',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: theme.spacing.xs,
  },
  legendText: {
    fontSize: theme.fontSizes.caption,
    color: `${theme.colors.softWhite}50`,
  },
});

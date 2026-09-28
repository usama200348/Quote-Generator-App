import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  LayoutAnimation,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  UIManager,
  View,
  FlatList,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Clipboard from '@react-native-clipboard/clipboard';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useQuoteState } from '../hooks/useQuoteState';
import { getDefaultRate } from '../lib/roomRates';
import styles from './style/QuoteScreen.styles';

type CurrencyOption = { code: string; name: string; symbol: string };
type Tone = 'friendly' | 'formal' | 'casual';
type DiscountType = 'percent' | 'flat';
type TabKey = 'stay' | 'rooms' | 'pricing' | 'quote';
type IconName =
  | 'calendar-month-outline'
  | 'bed-outline'
  | 'cash-multiple'
  | 'file-document-outline'
  | 'chevron-left'
  | 'chevron-right'
  | 'calendar-check-outline'
  | 'lock-outline'
  | 'chevron-down'
  | 'swap-horizontal'
  | 'office-building-outline'
  | 'check'
  | 'content-copy'
  | 'whatsapp'
  | 'email-outline'
  | 'arrow-left'
  | 'arrow-right'
  | 'trash-can-outline'
  | 'account-group-outline'
  | 'account-outline'
  | 'account-child-outline'
  | 'plus';

function Icon({
  name,
  size = 20,
  color = '#16733F',
  style,
}: {
  name: IconName;
  size?: number;
  color?: string;
  style?: any;
}) {
  return (
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={color}
      style={style}
    />
  );
}

const CURRENCIES: CurrencyOption[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼' },
];

const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.74,
  PKR: 280,
  AED: 3.67,
  SAR: 3.75,
};

const TABS: {
  key: TabKey;
  label: string;
  number: string;
  icon: IconName;
}[] = [
  { key: 'stay', label: 'Stay', number: '01', icon: 'calendar-month-outline' },
  { key: 'rooms', label: 'Rooms', number: '02', icon: 'bed-outline' },
  { key: 'pricing', label: 'Pricing', number: '03', icon: 'cash-multiple' },
  { key: 'quote', label: 'Quote', number: '04', icon: 'file-document-outline' },
];

const PRESET_ROOMS = ['Standard Room', 'Deluxe Room', 'Suite', 'Family Room', 'Executive Room'];
const ROOMS_PAGE_SIZE = 3;

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function AnimatedButton({
  children,
  onPress,
  style,
  disabled = false,
}: {
  children: React.ReactNode;
  onPress: () => void;
  style?: any;
  disabled?: boolean;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (disabled) return;
    Animated.spring(scale, {
      toValue: 0.96,
      speed: 35,
      bounciness: 4,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    if (disabled) return;
    Animated.spring(scale, {
      toValue: 1,
      speed: 35,
      bounciness: 7,
      useNativeDriver: true,
    }).start();
  };

  return (
    <AnimatedPressable
      disabled={disabled}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        style,
        {
          opacity: disabled ? 0.42 : 1,
          transform: [{ scale }],
        },
      ]}
    >
      {children}
    </AnimatedPressable>
  );
}

function SectionTitle({ children }: { children: string }) {
  return <Text style={styles.sectionLabel}>{children}</Text>;
}

function Card({
  children,
  index = 0,
}: {
  children: React.ReactNode;
  index?: number;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;
  const scale = useRef(new Animated.Value(0.98)).current;

  useEffect(() => {
    const delay = index * 50;

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 380,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        delay,
        tension: 55,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        delay,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index, opacity, scale, translateY]);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity,
          transform: [{ translateY }, { scale }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

function AnimatedLogo() {
  const scale = useRef(new Animated.Value(0.7)).current;
  const rotate = useRef(new Animated.Value(-1)).current;
  const float = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        tension: 60,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(float, {
            toValue: 1,
            duration: 1800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(float, {
            toValue: 0,
            duration: 1800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ),
    ]).start();
  }, [float, rotate, scale]);

  const rotateY = rotate.interpolate({
    inputRange: [-1, 0],
    outputRange: ['-35deg', '0deg'],
  });

  const translateY = float.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -4],
  });

  return (
    <Animated.View
      style={[
        styles.logo,
        {
          transform: [
            { perspective: 800 },
            { scale },
            { rotateY },
            { translateY },
          ],
        },
      ]}
    >
      <Text style={styles.logoText}>★</Text>
    </Animated.View>
  );
}

function AnimatedHeading() {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(14)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        tension: 45,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);

  return (
    <Animated.View
      style={[
        styles.headingContainer,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.headingAccent} />
      <Text style={styles.pageTitle}>Create a Quote</Text>
      <Text style={styles.pageSubtitle}>
        Build a professional guest quotation in a few simple steps.
      </Text>
    </Animated.View>
  );
}

function StepProgressBar({
  activeTab,
  onTabPress,
}: {
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
}) {
  const tabKeys: TabKey[] = ['stay', 'rooms', 'pricing', 'quote'];
  const currentIndex = tabKeys.indexOf(activeTab);

  return (
    <View style={styles.stepProgressContainer}>
      {TABS.map((tab, idx) => {
        const isActive = activeTab === tab.key;
        const isCompleted = currentIndex > idx;

        return (
          <React.Fragment key={tab.key}>
            <Pressable
              onPress={() => onTabPress(tab.key)}
              style={styles.stepPressable}
              accessibilityRole="button"
              accessibilityLabel={`Step ${idx + 1}: ${tab.label}`}
              hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
            >
              <View
                style={[
                  styles.stepPill,
                  isActive && styles.stepPillActive,
                  isCompleted && styles.stepPillCompleted,
                ]}
              >
                {isCompleted ? (
                  <Icon name="check" size={13} color="#16733F" />
                ) : (
                  <Text
                    style={
                      isActive
                        ? styles.stepPillTextActive
                        : styles.stepPillTextUpcoming
                    }
                  >
                    {idx + 1}
                  </Text>
                )}
              </View>

              <Text
                style={[
                  styles.stepLabel,
                  isActive && styles.stepLabelActive,
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>

            {idx < TABS.length - 1 && (
              <View
                style={[
                  styles.stepDivider,
                  currentIndex > idx && styles.stepDividerCompleted,
                ]}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}

function Counter({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <View style={styles.counterRow}>
      <View style={styles.counterLabelWrap}>
        <Text style={styles.counterLabel}>{label}</Text>
        <Text style={styles.counterSubLabel}>
          {label === 'Adults'
            ? 'Guests 12 years and above'
            : 'Guests below 12 years'}
        </Text>
      </View>

      <View style={styles.counterControls}>
        <AnimatedButton
          disabled={value <= min}
          onPress={() => onChange(Math.max(min, value - 1))}
          style={[
            styles.counterButton,
            value <= min && styles.counterButtonDisabled,
          ]}
        >
          <Text style={styles.counterButtonText}>−</Text>
        </AnimatedButton>

        <Text style={styles.counterValue}>{value}</Text>

        <AnimatedButton
          disabled={value >= max}
          onPress={() => onChange(Math.min(max, value + 1))}
          style={[
            styles.counterButton,
            value >= max && styles.counterButtonDisabled,
          ]}
        >
          <Text style={styles.counterButtonText}>+</Text>
        </AnimatedButton>
      </View>
    </View>
  );
}

function formatMoney(amount: number, currency: string) {
  const currencyData = CURRENCIES.find(item => item.code === currency);
  const symbol = currencyData?.symbol || currency;
  return `${symbol}${amount.toFixed(2)}`;
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryRowLabel}>{label}</Text>
      <Text style={styles.summaryRowValue}>{value}</Text>
    </View>
  );
}

function TabBar({
  activeTab,
  onTabPress,
}: {
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
}) {
  return (
    <View style={styles.tabBar}>
      {TABS.map(tab => {
        const selected = activeTab === tab.key;

        return (
          <Pressable
            key={tab.key}
            onPress={() => onTabPress(tab.key)}
            style={styles.tabPressable}
            android_ripple={{
              color: 'rgba(22, 115, 63, 0.15)',
              borderless: false,
            }}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            accessibilityLabel={`${tab.label} tab`}
            hitSlop={{ top: 6, bottom: 6, left: 4, right: 4 }}
          >
            <View
              style={[
                styles.tabItem,
                selected && styles.tabItemActive,
              ]}
            >
              <Icon
                name={tab.icon}
                size={18}
                color={selected ? '#FFFFFF' : '#8A9790'}
                style={[
                  styles.tabIcon,
                  selected && styles.tabIconActive,
                ]}
              />

              <Text
                style={[
                  styles.tabLabel,
                  selected && styles.tabLabelActive,
                ]}
                numberOfLines={1}
              >
                {tab.label}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

function startOfDay(date: Date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

function addDays(date: Date, amount: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return startOfDay(result);
}

function parseDate(value?: string) {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;
  return startOfDay(new Date(year, month - 1, day));
}

function formatISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isSameDay(first: Date, second: Date) {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

function getCalendarDays(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const leadingDays = (firstDay + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const result: (Date | null)[] = [];

  for (let i = 0; i < leadingDays; i++) {
    result.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    result.push(new Date(year, month, day));
  }

  while (result.length % 7 !== 0) {
    result.push(null);
  }

  return result;
}

function CalendarModal({
  visible,
  field,
  checkIn,
  checkOut,
  onClose,
  onSelect,
}: {
  visible: boolean;
  field: 'checkIn' | 'checkOut' | null;
  checkIn: string;
  checkOut: string;
  onClose: () => void;
  onSelect: (date: Date) => void;
}) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const checkInDate = useMemo(() => parseDate(checkIn), [checkIn]);
  const checkOutDate = useMemo(() => parseDate(checkOut), [checkOut]);

  const minimumDate = useMemo(() => {
    return field === 'checkOut' && checkInDate ? addDays(checkInDate, 1) : today;
  }, [field, checkInDate, today]);

  const selectedDate = useMemo(() => {
    return field === 'checkIn' ? checkInDate : checkOutDate;
  }, [field, checkInDate, checkOutDate]);

  const [visibleMonth, setVisibleMonth] = useState(() => {
    const initialDate = (field === 'checkIn' ? parseDate(checkIn) : parseDate(checkOut)) || startOfDay(new Date());
    return new Date(initialDate.getFullYear(), initialDate.getMonth(), 1);
  });

  const sheetAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return;

    const initialDate =
      (field === 'checkIn' ? parseDate(checkIn) : parseDate(checkOut)) ||
      (field === 'checkOut' && parseDate(checkIn) ? addDays(parseDate(checkIn)!, 1) : startOfDay(new Date()));

    setVisibleMonth(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));

    sheetAnimation.setValue(0);
    Animated.timing(sheetAnimation, {
      toValue: 1,
      duration: 280,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, field]);

  const closeCalendar = () => {
    Animated.timing(sheetAnimation, {
      toValue: 0,
      duration: 200,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const monthLabel = useMemo(
    () =>
      visibleMonth.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
    [visibleMonth],
  );

  const days = useMemo(() => getCalendarDays(visibleMonth), [visibleMonth]);

  const goMonth = (amount: number) => {
    setVisibleMonth(
      current => new Date(current.getFullYear(), current.getMonth() + amount, 1),
    );
  };

  const handleTodayPress = () => {
    const todayDate = startOfDay(new Date());
    if (field === 'checkOut' && checkInDate && todayDate <= checkInDate) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Check-out',
        text2: 'Check-out must be after check-in.',
        position: 'top',
        visibilityTime: 2500,
        topOffset: 60,
      });
      return;
    }

    setVisibleMonth(new Date(todayDate.getFullYear(), todayDate.getMonth(), 1));
    onSelect(todayDate);
  };

  const canGoPrevious = useMemo(() => {
    return (
      visibleMonth.getFullYear() > minimumDate.getFullYear() ||
      (visibleMonth.getFullYear() === minimumDate.getFullYear() &&
        visibleMonth.getMonth() > minimumDate.getMonth())
    );
  }, [visibleMonth, minimumDate]);

  const sheetTranslateY = sheetAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [420, 0],
  });

  const sheetOpacity = sheetAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={closeCalendar}>
      <View style={styles.calendarOverlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={closeCalendar} />

        <Animated.View
          style={[
            styles.calendarSheet,
            {
              opacity: sheetOpacity,
              transform: [{ translateY: sheetTranslateY }],
            },
          ]}
        >
          <View style={styles.calendarTop}>
            <View>
              <Text style={styles.calendarEyebrow}>
                {field === 'checkIn' ? 'SELECT CHECK-IN' : 'SELECT CHECK-OUT'}
              </Text>
              <Text style={styles.calendarSelectedText}>
                {selectedDate
                  ? selectedDate.toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })
                  : 'Choose a date'}
              </Text>
            </View>

            <Pressable onPress={closeCalendar} style={styles.calendarClose}>
              <Text style={styles.calendarCloseText}>×</Text>
            </Pressable>
          </View>

          <View style={styles.monthNavigation}>
            <Pressable
              disabled={!canGoPrevious}
              onPress={() => goMonth(-1)}
              style={[styles.monthButton, !canGoPrevious && styles.monthButtonDisabled]}
            >
              <Icon name="chevron-left" size={24} color="#16733F" />
            </Pressable>

            <Text style={styles.monthTitle}>{monthLabel}</Text>

            <Pressable onPress={() => goMonth(1)} style={styles.monthButton}>
              <Icon name="chevron-right" size={24} color="#16733F" />
            </Pressable>

            <Pressable onPress={handleTodayPress} style={styles.todayButton}>
              <Icon name="calendar-check-outline" size={15} color="#16733F" />
              <Text style={styles.todayButtonText}>Today</Text>
            </Pressable>
          </View>

          <View style={styles.weekRow}>
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
              <Text key={day} style={styles.weekText}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {days.map((date, index) => {
              if (!date) {
                return <View key={`empty-${index}`} style={styles.calendarDay} />;
              }

              const disabled = date < minimumDate;
              const selected = !!selectedDate && isSameDay(date, selectedDate);
              const isToday = isSameDay(date, today);
              const isRangeStart = !!checkInDate && isSameDay(date, checkInDate);
              const isRangeEnd = !!checkOutDate && isSameDay(date, checkOutDate);
              const inRange =
                !!checkInDate && !!checkOutDate && date > checkInDate && date < checkOutDate;

              return (
                <View key={date.toISOString()} style={styles.calendarDay}>
                  <Pressable
                    disabled={disabled}
                    onPress={() => onSelect(date)}
                    style={[
                      styles.calendarDateButton,
                      inRange && styles.calendarRange,
                      selected && styles.calendarDateSelected,
                      isToday && !selected && styles.calendarToday,
                      disabled && styles.calendarDateDisabled,
                    ]}
                  >
                    <Text
                      style={[
                        styles.calendarDateText,
                        selected && styles.calendarDateTextSelected,
                        disabled && styles.calendarDateTextDisabled,
                      ]}
                    >
                      {date.getDate()}
                    </Text>
                  </Pressable>

                  {isToday && !selected && <View style={styles.todayDot} />}
                  {(isRangeStart || isRangeEnd) && checkInDate && checkOutDate && (
                    <View style={styles.rangeMarker} />
                  )}
                </View>
              );
            })}
          </View>

          <View style={styles.calendarLegend}>
            <View style={styles.legendItem}>
              <View style={styles.legendDotSelected} />
              <Text style={styles.legendText}>Selected</Text>
            </View>

            <View style={styles.legendItem}>
              <View style={styles.legendDotToday} />
              <Text style={styles.legendText}>Today</Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

export default function QuoteScreen() {
  const {
    quote,
    updateQuote,
    updateGuests,
    addRoom,
    updateRoom,
    removeRoom,
  } = useQuoteState();

  const [targetCurrency, setTargetCurrency] = useState('PKR');
  const [tone, setTone] = useState<Tone>('friendly');
  const [discountType, setDiscountType] = useState<DiscountType>('percent');
  const [activeTab, setActiveTab] = useState<TabKey>('stay');
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [calendarField, setCalendarField] = useState<'checkIn' | 'checkOut' | null>(null);
  const [currencyModal, setCurrencyModal] = useState(false);
  const [visibleRoomCount, setVisibleRoomCount] = useState(ROOMS_PAGE_SIZE);
  const [isLoadingMoreRooms, setIsLoadingMoreRooms] = useState(false);

  // Room display identity is intentionally separate from array index.
  const roomNumbersRef = useRef<Record<string, number>>(
    Object.fromEntries(quote.rooms.map((room, index) => [room.id, index + 1])),
  );

  const nextRoomNumberRef = useRef(quote.rooms.length + 1);

  const [roomOrder, setRoomOrder] = useState<string[]>(() =>
    quote.rooms.map(room => room.id),
  );

  useEffect(() => {
    const currentIds = new Set(quote.rooms.map(room => room.id));

    quote.rooms.forEach(room => {
      if (!roomNumbersRef.current[room.id]) {
        roomNumbersRef.current[room.id] = nextRoomNumberRef.current;
        nextRoomNumberRef.current += 1;
      }
    });

    setRoomOrder(previous => {
      const existing = previous.filter(id => currentIds.has(id));
      const newIds = quote.rooms
        .map(room => room.id)
        .filter(id => !previous.includes(id));
      if (newIds.length === 0 && existing.length === previous.length) {
        return previous;
      }
      return [...newIds, ...existing];
    });
  }, [quote.rooms]);

  const { rooms } = quote;
  const orderedRooms = useMemo(() => {
    const byId = new Map(rooms.map(room => [room.id, room]));
    const ordered = roomOrder.map(id => byId.get(id)).filter(Boolean) as typeof rooms;
    const missing = rooms.filter(room => !roomOrder.includes(room.id));
    return [...ordered, ...missing];
  }, [rooms, roomOrder]);

  const hasMoreRooms = visibleRoomCount < quote.rooms.length;
  const totalGuests = quote.guests.adults + quote.guests.children;

  type RoomGuestValues = { adults: number; children: number };
  const [roomGuests, setRoomGuests] = useState<Record<string, RoomGuestValues>>({});

  useEffect(() => {
    setRoomGuests(previous => {
      let changed = false;
      const next = { ...previous };

      quote.rooms.forEach(room => {
        const roomData = room as typeof room & { adults?: number; children?: number };
        if (!next[room.id]) {
          next[room.id] = {
            adults: roomData.adults ?? 1,
            children: roomData.children ?? 0,
          };
          changed = true;
        }
      });

      Object.keys(next).forEach(id => {
        if (!quote.rooms.some(room => room.id === id)) {
          delete next[id];
          changed = true;
        }
      });

      return changed ? next : previous;
    });
  }, [quote.rooms]);

  const getRoomGuests = (room: (typeof quote.rooms)[number]): RoomGuestValues => {
    const roomData = room as typeof room & { adults?: number; children?: number };
    return (
      roomGuests[room.id] ?? {
        adults: roomData.adults ?? 1,
        children: roomData.children ?? 0,
      }
    );
  };

  const updateRoomGuestCount = (
    room: (typeof quote.rooms)[number],
    field: keyof RoomGuestValues,
    value: number,
  ) => {
    const nextValue = Math.max(0, value);

    setRoomGuests(previous => ({
      ...previous,
      [room.id]: {
        ...getRoomGuests(room),
        [field]: nextValue,
      },
    }));

    updateRoom(room.id, {
      [field]: nextValue,
    } as any);
  };

  const buildRoomGuestAllocation = (
    adults: number,
    children: number,
    allRooms: typeof quote.rooms,
  ): Record<string, RoomGuestValues> => {
    const allocation: Record<string, RoomGuestValues> = {};
    let remainingAdults = Math.max(0, adults);
    let remainingChildren = Math.max(0, children);

    allRooms.forEach((room, index) => {
      const roomsLeft = allRooms.length - index;
      const roomAdults =
        roomsLeft > 0
          ? Math.floor(remainingAdults / roomsLeft) +
            (remainingAdults % roomsLeft > 0 ? 1 : 0)
          : 0;
      const roomChildren =
        roomsLeft > 0
          ? Math.floor(remainingChildren / roomsLeft) +
            (remainingChildren % roomsLeft > 0 ? 1 : 0)
          : 0;

      allocation[room.id] = {
        adults: roomAdults,
        children: roomChildren,
      };

      remainingAdults -= roomAdults;
      remainingChildren -= roomChildren;
    });

    return allocation;
  };

  const syncRoomGuestsToQuoteGuests = (
    adults: number,
    children: number,
    allRooms = quote.rooms,
  ) => {
    const allocation = buildRoomGuestAllocation(adults, children, allRooms);
    setRoomGuests(allocation);

    allRooms.forEach(room => {
      const guests = allocation[room.id];
      if (!guests) return;
      updateRoom(room.id, {
        adults: guests.adults,
        children: guests.children,
      } as any);
    });
  };

  const previousRoomCountRef = useRef(quote.rooms.length);

  useEffect(() => {
    if (previousRoomCountRef.current === quote.rooms.length) return;
    previousRoomCountRef.current = quote.rooms.length;

    syncRoomGuestsToQuoteGuests(
      quote.guests.adults,
      quote.guests.children,
      quote.rooms,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quote.rooms.length]);

  const totalNights = useMemo(() => {
    const start = parseDate(quote.checkIn);
    const end = parseDate(quote.checkOut);
    if (!start || !end) return 0;
    return Math.max(0, Math.round((end.getTime() - start.getTime()) / 86400000));
  }, [quote.checkIn, quote.checkOut]);

  const roomSubtotal = useMemo(() => {
    if (totalNights <= 0) return 0;

    return quote.rooms.reduce((total, room) => {
      const guestsInRoom =
        (roomGuests[room.id]?.adults ?? 1) + (roomGuests[room.id]?.children ?? 0);
      const guestMultiplier = room.pricingType === 'perGuest' ? guestsInRoom : 1;

      return total + room.rate * room.quantity * totalNights * guestMultiplier;
    }, 0);
  }, [quote.rooms, roomGuests, totalNights]);

  const discountAmount =
    discountType === 'percent'
      ? roomSubtotal * (quote.discount / 100)
      : Math.min(quote.discount, roomSubtotal);

  const subtotal = Math.max(roomSubtotal - discountAmount, 0);
  const taxAmount = subtotal * (quote.tax / 100);
  const finalTotal = subtotal + taxAmount;

  const exchangeRate =
    EXCHANGE_RATES[targetCurrency] / EXCHANGE_RATES[quote.currency.code];
  const convertedTotal = finalTotal * exchangeRate;

  const datesSelected = Boolean(quote.checkIn && quote.checkOut && totalNights > 0);

  const showDateRequiredToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Dates Required',
      text2: 'Please select both check-in and check-out dates first.',
      position: 'top',
      visibilityTime: 2500,
      topOffset: 60,
    });
  };

  const handleTabPress = (tab: TabKey) => {
    if (tab === activeTab) return;

    const currentIndex = TABS.findIndex(item => item.key === activeTab);
    const targetIndex = TABS.findIndex(item => item.key === tab);

    if (activeTab === 'stay' && targetIndex > currentIndex && !datesSelected) {
      showDateRequiredToast();
      return;
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveTab(tab);
  };

  const openCalendar = (field: 'checkIn' | 'checkOut') => {
    setCalendarField(field);
    setCalendarVisible(true);
  };

  const closeCalendar = () => {
    setCalendarVisible(false);
    setCalendarField(null);
  };

  const handleCalendarSelect = (selected: Date) => {
    const formattedDate = formatISODate(selected);

    if (calendarField === 'checkIn') {
      const currentCheckOut = parseDate(quote.checkOut);

      if (currentCheckOut && selected >= currentCheckOut) {
        updateQuote({
          checkIn: formattedDate,
          checkOut: '',
        });
      } else {
        updateQuote({
          checkIn: formattedDate,
        });
      }
    }

    if (calendarField === 'checkOut') {
      const currentCheckIn = parseDate(quote.checkIn);

      if (currentCheckIn && selected <= currentCheckIn) {
        Toast.show({
          type: 'error',
          text1: 'Invalid Check-out',
          text2: 'Check-out must be after check-in.',
          position: 'top',
          visibilityTime: 2500,
          topOffset: 60,
        });
        return;
      }

      updateQuote({
        checkOut: formattedDate,
      });
    }

    closeCalendar();
  };

  const handleAddRoom = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    addRoom();
    setVisibleRoomCount(current => Math.min(current + 1, quote.rooms.length + 1));

    Toast.show({
      type: 'success',
      text1: 'New Room Added',
      text2: 'A new room has been added to your accommodation list.',
      position: 'top',
      visibilityTime: 2200,
      topOffset: 60,
    });
  };

  const handleLoadMoreRooms = () => {
    if (isLoadingMoreRooms || !hasMoreRooms) return;
    setIsLoadingMoreRooms(true);

    setTimeout(() => {
      setVisibleRoomCount(current =>
        Math.min(current + ROOMS_PAGE_SIZE, quote.rooms.length),
      );
      setIsLoadingMoreRooms(false);
    }, 200);
  };

  const handleRemoveRoom = (roomId: string) => {
    if (quote.rooms.length <= 1) {
      Toast.show({
        type: 'info',
        text1: 'At Least One Room Required',
        text2: 'The final room cannot be deleted.',
        position: 'top',
        visibilityTime: 2200,
        topOffset: 60,
      });
      return;
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const totalRoomsAfterDelete = quote.rooms.length - 1;

    setRoomOrder(previous => previous.filter(id => id !== roomId));
    setVisibleRoomCount(current => Math.min(current, totalRoomsAfterDelete));
    removeRoom(roomId);

    Toast.show({
      type: 'success',
      text1: 'Room Deleted',
      text2: `Room removed. ${totalRoomsAfterDelete} room${totalRoomsAfterDelete === 1 ? '' : 's'} remaining.`,
      position: 'top',
      visibilityTime: 2200,
      topOffset: 60,
    });
  };

  const selectCurrency = (currency: string) => {
    setTargetCurrency(currency);
    setCurrencyModal(false);
  };

  const generateMessage = () => {
    if (!datesSelected || finalTotal <= 0) {
      return 'Fill in dates and room details to preview your quote message...';
    }

    const dateText = `${quote.checkIn} to ${quote.checkOut}`;

    if (tone === 'formal') {
      return (
        `Dear Guest,\n\n` +
        `Thank you for your inquiry. ` +
        `Your quote for ${dateText} ` +
        `(${totalNights} nights) ` +
        `for ${totalGuests} guests ` +
        `is ${formatMoney(finalTotal, quote.currency.code)}.\n\n` +
        `Please contact us to finalize your reservation.\n\n` +
        `Warm regards,\nReservations Team`
      );
    }

    if (tone === 'casual') {
      return (
        `Hey! Your stay from ${dateText} ` +
        `comes out to ${formatMoney(finalTotal, quote.currency.code)}. Hit us up to lock it in!`
      );
    }

    return (
      `Hi there! We'd love to host you. ` +
      `For your stay from ${dateText} ` +
      `(${totalNights} nights) for ` +
      `${totalGuests} guests, the total is ` +
      `${formatMoney(finalTotal, quote.currency.code)} ` +
      `(~${formatMoney(convertedTotal, targetCurrency)}). Let us know if you'd like to book!`
    );
  };

  const message = generateMessage();

  const copyMessage = () => {
    if (!datesSelected || finalTotal <= 0) {
      Toast.show({
        type: 'error',
        text1: 'Quote Incomplete',
        text2: 'Please select dates and add room details first.',
        position: 'top',
        visibilityTime: 2500,
        topOffset: 60,
      });
      return;
    }

    Clipboard.setString(message);
    Toast.show({
      type: 'success',
      text1: 'Copied to Clipboard',
      text2: 'Quote message is ready to paste.',
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const openWhatsApp = () => {
    if (!datesSelected || finalTotal <= 0) {
      Toast.show({
        type: 'error',
        text1: 'Quote Incomplete',
        text2: 'Please complete the quote first.',
        position: 'top',
        visibilityTime: 2500,
        topOffset: 60,
      });
      return;
    }

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      Toast.show({
        type: 'error',
        text1: 'WhatsApp Error',
        text2: 'Could not open WhatsApp.',
        position: 'top',
        visibilityTime: 2500,
        topOffset: 60,
      });
    });
  };

  const openEmail = () => {
    if (!datesSelected || finalTotal <= 0) {
      Toast.show({
        type: 'error',
        text1: 'Quote Incomplete',
        text2: 'Please complete the quote first.',
        position: 'top',
        visibilityTime: 2500,
        topOffset: 60,
      });
      return;
    }

    const subject = encodeURIComponent('Your Hotel Booking Quote');
    const body = encodeURIComponent(message);
    const url = `mailto:?subject=${subject}&body=${body}`;

    Linking.openURL(url).catch(() => {
      Toast.show({
        type: 'error',
        text1: 'Email Error',
        text2: 'No email app is available on this device.',
        position: 'top',
        visibilityTime: 2500,
        topOffset: 60,
      });
    });
  };

  const goNext = () => {
    if (activeTab === 'stay') {
      if (!datesSelected) {
        showDateRequiredToast();
        return;
      }
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setActiveTab('rooms');
      return;
    }

    if (activeTab === 'rooms') {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setActiveTab('pricing');
      return;
    }

    if (activeTab === 'pricing') {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setActiveTab('quote');
    }
  };

  const goBack = () => {
    if (activeTab === 'rooms') {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setActiveTab('stay');
      return;
    }

    if (activeTab === 'pricing') {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setActiveTab('rooms');
      return;
    }

    if (activeTab === 'quote') {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setActiveTab('pricing');
    }
  };

  const renderStayTab = () => (
    <>
      <Card index={0}>
        <View style={styles.sectionTopRow}>
          <View>
            <SectionTitle>STAY DETAILS</SectionTitle>
            <Text style={styles.sectionDescription}>
              Select check-in and check-out dates
            </Text>
          </View>
        </View>

        <View style={styles.twoColumns}>
          <View style={styles.halfColumn}>
            <Text style={styles.fieldLabel}>Check-in</Text>
            <AnimatedButton
              onPress={() => openCalendar('checkIn')}
              style={styles.dateInput}
            >
              <Text style={quote.checkIn ? styles.dateText : styles.placeholderText}>
                {quote.checkIn || 'Select date'}
              </Text>
              <Icon name="calendar-month-outline" size={19} color="#16733F" />
            </AnimatedButton>
          </View>

          <View style={styles.halfColumn}>
            <Text style={styles.fieldLabel}>Check-out</Text>
            <AnimatedButton
              disabled={!quote.checkIn}
              onPress={() => openCalendar('checkOut')}
              style={[
                styles.dateInput,
                !quote.checkIn && styles.disabledInput,
              ]}
            >
              <Text style={quote.checkOut ? styles.dateText : styles.placeholderText}>
                {quote.checkOut || 'Select date'}
              </Text>
              <Icon name="calendar-month-outline" size={19} color="#16733F" />
            </AnimatedButton>
          </View>
        </View>

        {quote.checkIn && quote.checkOut && totalNights > 0 && (
          <View style={styles.stayInfoBar}>
            <Icon
              name="calendar-check-outline"
              size={18}
              color="#16733F"
              style={styles.stayInfoIcon}
            />
            <Text style={styles.stayInfoText}>
              {totalNights} {totalNights === 1 ? 'night' : 'nights'} stay ({quote.checkIn} → {quote.checkOut})
            </Text>
          </View>
        )}
      </Card>

      <Card index={1}>
        <View style={styles.sectionTopRow}>
          <View>
            <SectionTitle>GUESTS</SectionTitle>
            <Text style={styles.sectionDescription}>
              Specify total guests travelling
            </Text>
          </View>
        </View>

        <Counter
          label="Adults"
          value={quote.guests.adults}
          min={1}
          max={20}
          onChange={value => {
            updateGuests({ adults: value });
            syncRoomGuestsToQuoteGuests(value, quote.guests.children);
          }}
        />

        <View style={styles.divider} />

        <Counter
          label="Children"
          value={quote.guests.children}
          min={0}
          max={20}
          onChange={value => {
            updateGuests({ children: value });
            syncRoomGuestsToQuoteGuests(quote.guests.adults, value);
          }}
        />

        <View style={styles.guestTotalBar}>
          <Text style={styles.guestTotalLabel}>Total guests</Text>
          <Text style={styles.guestTotalValue}>{totalGuests}</Text>
        </View>
      </Card>

      <NextButton label="Continue to Rooms" onPress={goNext} />
    </>
  );

  const renderRoomsHeader = () => (
    <Card index={0}>
      <View style={styles.sectionHeaderRow}>
        <View style={styles.sectionHeaderContent}>
          <SectionTitle>ACCOMMODATION & RATES</SectionTitle>
          <Text style={styles.sectionDescription}>
            Configure rooms, rates, and guest allocation
          </Text>
        </View>

        <AnimatedButton onPress={handleAddRoom} style={styles.addRoomButton}>
          <Icon name="plus" size={16} color="#FFFFFF" />
          <Text style={styles.addRoomText}>Add Room</Text>
        </AnimatedButton>
      </View>
    </Card>
  );

  const renderRoomItem = ({
    item: room,
    index,
  }: {
    item: (typeof quote.rooms)[number];
    index: number;
  }) => {
    const displayRoomNumber = roomNumbersRef.current[room.id] ?? index + 1;
    const roomGuestData = getRoomGuests(room);

    return (
      <Card index={index}>
        <View style={styles.roomBox}>
          <View style={styles.roomHeader}>
            <View style={styles.roomNumber}>
              <Text style={styles.roomNumberText}>
                {String(displayRoomNumber).padStart(2, '0')}
              </Text>
            </View>

            <View style={styles.roomHeaderTitle}>
              <Text style={styles.roomTitle}>Room {displayRoomNumber}</Text>
              <Text style={styles.roomSubtitle}>Accommodation</Text>
            </View>

            {quote.rooms.length > 1 && (
              <AnimatedButton
                onPress={() => handleRemoveRoom(room.id)}
                style={styles.deleteButton}
              >
                <Icon name="trash-can-outline" size={17} color="#DC2626" />
                <Text style={styles.deleteText}>Delete</Text>
              </AnimatedButton>
            )}
          </View>

          <View style={styles.twoColumns}>
            <View style={styles.halfColumn}>
              <Text style={styles.fieldLabel}>Room Type</Text>
              <TextInput
                value={room.name}
                onChangeText={value => updateRoom(room.id, { name: value })}
                placeholder="e.g. Deluxe Room"
                placeholderTextColor="#9AA6A0"
                style={styles.input}
              />
            </View>

            <View style={styles.halfColumn}>
              <Text style={styles.fieldLabel}>Nightly Rate</Text>
              <View style={styles.rateInputContainer}>
                <Text style={styles.currencyPrefix}>{quote.currency.symbol}</Text>
                <TextInput
                  value={room.rate ? String(room.rate) : ''}
                  keyboardType="decimal-pad"
                  onChangeText={value =>
                    updateRoom(room.id, { rate: Number(value) || 0 })
                  }
                  placeholder="0"
                  placeholderTextColor="#9AA6A0"
                  style={styles.rateTextInput}
                />
              </View>
            </View>
          </View>

          {/* Quick preset room suggestions */}
          <View style={styles.quickRoomChips}>
            {PRESET_ROOMS.map(preset => {
              const isMatch = room.name.toLowerCase() === preset.toLowerCase();
              return (
                <Pressable
                  key={preset}
                  onPress={() => {
                    const defaultRate = getDefaultRate(preset);
                    updateRoom(room.id, {
                      name: preset,
                      rate: room.rate === 0 || room.rate === 100 ? defaultRate : room.rate,
                    });
                  }}
                  style={[
                    styles.quickRoomChip,
                    isMatch && styles.quickRoomChipActive,
                  ]}
                  hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
                >
                  <Text
                    style={[
                      styles.quickRoomChipText,
                      isMatch && styles.quickRoomChipTextActive,
                    ]}
                  >
                    {preset.replace(' Room', '')}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.roomGuestHeader}>
            <View style={styles.roomGuestHeaderText}>
              <Text style={styles.fieldLabel}>Guests in this room</Text>
              <Text style={styles.roomGuestHint}>
                Set the guest allocation for this room
              </Text>
            </View>

            <View style={styles.roomGuestBadge}>
              <Icon name="account-group-outline" size={14} color="#16733F" />
              <Text style={styles.roomGuestBadgeText}>
                {roomGuestData.adults + roomGuestData.children}
              </Text>
            </View>
          </View>

          <View style={styles.roomGuestRow}>
            <View style={styles.roomGuestCounter}>
              <View style={styles.roomGuestLabelWrap}>
                <Icon name="account-outline" size={17} color="#55655D" />
                <Text style={styles.roomGuestLabel}>Adults</Text>
              </View>

              <View style={styles.roomGuestControls}>
                <AnimatedButton
                  onPress={() =>
                    updateRoomGuestCount(
                      room,
                      'adults',
                      getRoomGuests(room).adults - 1,
                    )
                  }
                  disabled={getRoomGuests(room).adults <= 1}
                  style={[
                    styles.roomGuestButton,
                    getRoomGuests(room).adults <= 1 && styles.roomGuestButtonDisabled,
                  ]}
                >
                  <Text style={styles.roomGuestButtonText}>−</Text>
                </AnimatedButton>

                <Text style={styles.roomGuestValue}>{getRoomGuests(room).adults}</Text>

                <AnimatedButton
                  onPress={() =>
                    updateRoomGuestCount(
                      room,
                      'adults',
                      getRoomGuests(room).adults + 1,
                    )
                  }
                  disabled={getRoomGuests(room).adults >= 20}
                  style={[
                    styles.roomGuestButton,
                    getRoomGuests(room).adults >= 20 && styles.roomGuestButtonDisabled,
                  ]}
                >
                  <Text style={styles.roomGuestButtonText}>+</Text>
                </AnimatedButton>
              </View>
            </View>

            <View style={styles.roomGuestCounter}>
              <View style={styles.roomGuestLabelWrap}>
                <Icon name="account-child-outline" size={17} color="#55655D" />
                <Text style={styles.roomGuestLabel}>Children</Text>
              </View>

              <View style={styles.roomGuestControls}>
                <AnimatedButton
                  onPress={() =>
                    updateRoomGuestCount(
                      room,
                      'children',
                      getRoomGuests(room).children - 1,
                    )
                  }
                  disabled={getRoomGuests(room).children <= 0}
                  style={[
                    styles.roomGuestButton,
                    getRoomGuests(room).children <= 0 && styles.roomGuestButtonDisabled,
                  ]}
                >
                  <Text style={styles.roomGuestButtonText}>−</Text>
                </AnimatedButton>

                <Text style={styles.roomGuestValue}>
                  {getRoomGuests(room).children}
                </Text>

                <AnimatedButton
                  onPress={() =>
                    updateRoomGuestCount(
                      room,
                      'children',
                      getRoomGuests(room).children + 1,
                    )
                  }
                  disabled={getRoomGuests(room).children >= 20}
                  style={[
                    styles.roomGuestButton,
                    getRoomGuests(room).children >= 20 && styles.roomGuestButtonDisabled,
                  ]}
                >
                  <Text style={styles.roomGuestButtonText}>+</Text>
                </AnimatedButton>
              </View>
            </View>
          </View>

          <Text style={[styles.fieldLabel, styles.rateAppliesLabel]}>
            Rate applies
          </Text>

          <View style={styles.toggleRow}>
            <AnimatedButton
              onPress={() => updateRoom(room.id, { pricingType: 'perRoom' })}
              style={[
                styles.toggleButton,
                room.pricingType === 'perRoom' && styles.toggleActive,
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  room.pricingType === 'perRoom' && styles.toggleActiveText,
                ]}
              >
                Per Room
              </Text>
            </AnimatedButton>

            <AnimatedButton
              onPress={() => updateRoom(room.id, { pricingType: 'perGuest' })}
              style={[
                styles.toggleButton,
                room.pricingType === 'perGuest' && styles.toggleActive,
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  room.pricingType === 'perGuest' && styles.toggleActiveText,
                ]}
              >
                Per Guest
              </Text>
            </AnimatedButton>
          </View>
        </View>
      </Card>
    );
  };

  const renderRoomsFooter = () => (
    <>
      {isLoadingMoreRooms && (
        <View style={styles.loadingMoreRoomsContainer}>
          <Text style={styles.loadingMoreRoomsText}>
            Loading more rooms...
          </Text>
        </View>
      )}

      <View style={styles.roomTotalPreview}>
        <View>
          <Text style={styles.previewCaption}>CURRENT ROOM SUBTOTAL</Text>
          <Text style={styles.previewAmount}>
            {formatMoney(roomSubtotal, quote.currency.code)}
          </Text>
        </View>

        <Text style={styles.previewNights}>
          {totalNights || 0} {totalNights === 1 ? 'night' : 'nights'}
        </Text>
      </View>
    </>
  );

  const renderPricingTab = () => (
    <>
      <Card index={0}>
        <View style={styles.sectionTopRow}>
          <View>
            <SectionTitle>PRICING MODIFIERS</SectionTitle>
            <Text style={styles.sectionDescription}>
              Adjust discounts and tax settings
            </Text>
          </View>
        </View>

        <View style={styles.twoColumns}>
          <View style={styles.halfColumn}>
            <Text style={styles.fieldLabel}>Discount</Text>
            <View style={styles.smallToggleRow}>
              <AnimatedButton
                onPress={() => setDiscountType('percent')}
                style={[
                  styles.smallToggle,
                  discountType === 'percent' && styles.toggleActive,
                ]}
              >
                <Text
                  style={[
                    styles.toggleText,
                    discountType === 'percent' && styles.toggleActiveText,
                  ]}
                >
                  %
                </Text>
              </AnimatedButton>

              <AnimatedButton
                onPress={() => setDiscountType('flat')}
                style={[
                  styles.smallToggle,
                  discountType === 'flat' && styles.toggleActive,
                ]}
              >
                <Text
                  style={[
                    styles.toggleText,
                    discountType === 'flat' && styles.toggleActiveText,
                  ]}
                >
                  Flat
                </Text>
              </AnimatedButton>
            </View>

            <TextInput
              value={quote.discount ? String(quote.discount) : ''}
              keyboardType="decimal-pad"
              placeholder="0"
              placeholderTextColor="#9AA6A0"
              onChangeText={value =>
                updateQuote({ discount: Number(value) || 0 })
              }
              style={styles.input}
            />
          </View>

          <View style={styles.halfColumn}>
            <Text style={styles.fieldLabel}>Tax Rate</Text>
            <View style={styles.taxLabelSpace}>
              <Text style={styles.percentBadgeText}>% APPLIED</Text>
            </View>

            <TextInput
              value={quote.tax ? String(quote.tax) : ''}
              keyboardType="decimal-pad"
              placeholder="0"
              placeholderTextColor="#9AA6A0"
              onChangeText={value => updateQuote({ tax: Number(value) || 0 })}
              style={styles.input}
            />
          </View>
        </View>
      </Card>

      <Card index={1}>
        <View style={styles.sectionTopRow}>
          <View>
            <SectionTitle>CURRENCY</SectionTitle>
            <Text style={styles.sectionDescription}>
              Choose quotation base and display currency
            </Text>
          </View>

          <View style={styles.currencyIcon}>
            <Text style={styles.currencyIconText}>$</Text>
          </View>
        </View>

        <View style={styles.twoColumns}>
          <View style={styles.halfColumn}>
            <Text style={styles.fieldLabel}>Base Currency</Text>
            <View style={styles.selectBox}>
              <Text style={styles.selectText}>{quote.currency.code}</Text>
              <Icon name="lock-outline" size={17} color="#9BA59F" />
            </View>
          </View>

          <View style={styles.halfColumn}>
            <Text style={styles.fieldLabel}>Display In</Text>
            <AnimatedButton
              style={styles.selectBox}
              onPress={() => setCurrencyModal(true)}
            >
              <Text style={styles.selectText}>{targetCurrency}</Text>
              <Icon name="chevron-down" size={19} color="#16733F" />
            </AnimatedButton>
          </View>
        </View>

        <View style={styles.exchangeBox}>
          <View style={styles.exchangeIcon}>
            <Icon name="swap-horizontal" size={20} color="#16733F" />
          </View>

          <View style={styles.exchangeContent}>
            <Text style={styles.exchangeCaption}>DISPLAY RATE</Text>
            <Text style={styles.exchangeText}>
              1 {quote.currency.code} = {exchangeRate.toFixed(2)} {targetCurrency}
            </Text>
          </View>
        </View>
      </Card>

      <Card index={2}>
        <View style={styles.pricingPreviewHeader}>
          <View>
            <Text style={styles.previewCaption}>ESTIMATED TOTAL</Text>
            <Text style={styles.pricingPreviewAmount}>
              {formatMoney(finalTotal, quote.currency.code)}
            </Text>
          </View>

          <View style={styles.pricingStatus}>
            <Text style={styles.pricingStatusText}>READY</Text>
          </View>
        </View>

        <SummaryRow
          label="Room subtotal"
          value={formatMoney(roomSubtotal, quote.currency.code)}
        />
        <SummaryRow
          label="Discount"
          value={`- ${formatMoney(discountAmount, quote.currency.code)}`}
        />
        <SummaryRow
          label="Tax"
          value={`+ ${formatMoney(taxAmount, quote.currency.code)}`}
        />
      </Card>

      <NextButton
        label="Generate Quote"
        onPress={goNext}
        onBack={goBack}
        showBack
      />
    </>
  );

  const renderQuoteTab = () => (
    <>
      <Card index={0}>
        <View style={styles.summaryHeader}>
          <View style={styles.summaryIcon}>
            <Icon name="office-building-outline" size={22} color="#FFFFFF" />
          </View>

          <View style={styles.summaryHeaderText}>
            <Text style={styles.summaryTitle}>Quote Summary</Text>
            <Text style={styles.summarySubtitle}>
              {totalGuests} {totalGuests === 1 ? 'guest' : 'guests'} · {quote.rooms.length}{' '}
              {quote.rooms.length === 1 ? 'room' : 'rooms'} · {totalNights}{' '}
              {totalNights === 1 ? 'night' : 'nights'}
            </Text>
          </View>

          <View style={styles.summaryCheck}>
            <Icon name="check" size={18} color="#16733F" />
          </View>
        </View>

        <View style={styles.quoteRoomsSection}>
          <View style={styles.quoteRoomsSectionHeader}>
            <Text style={styles.quoteRoomsSectionTitle}>ROOMS & GUESTS</Text>
            <View style={styles.nightBadge}>
              <Text style={styles.nightBadgeText}>
                {quote.rooms.length} {quote.rooms.length === 1 ? 'ROOM' : 'ROOMS'}
              </Text>
            </View>
          </View>

          {quote.rooms.map((room, index) => {
            const guests = getRoomGuests(room);
            const totalRoomGuests = guests.adults + guests.children;
            const guestMultiplier =
              room.pricingType === 'perGuest' ? totalRoomGuests : 1;
            const singleRoomSubtotal =
              totalNights > 0
                ? room.rate * room.quantity * totalNights * guestMultiplier
                : 0;
            const displayRoomNumber =
              roomNumbersRef.current[room.id] ?? index + 1;

            return (
              <View key={room.id} style={styles.quoteRoomCard}>
                <View style={styles.quoteRoomTopRow}>
                  <View style={styles.quoteRoomTitleRow}>
                    <View style={styles.quoteRoomBadge}>
                      <Text style={styles.quoteRoomBadgeText}>
                        R{String(displayRoomNumber).padStart(2, '0')}
                      </Text>
                    </View>
                    <Text style={styles.quoteRoomName} numberOfLines={1}>
                      {room.name || `Room ${displayRoomNumber}`}
                    </Text>
                  </View>
                  <Text style={styles.quoteRoomSubtotal}>
                    {formatMoney(singleRoomSubtotal, quote.currency.code)}
                  </Text>
                </View>

                <View style={styles.quoteRoomDetailRow}>
                  <View style={styles.quoteRoomGuestsWrap}>
                    <View style={styles.quoteGuestPill}>
                      <Icon name="account-outline" size={13} color="#16733F" />
                      <Text style={styles.quoteGuestPillText}>
                        {guests.adults} {guests.adults === 1 ? 'Adult' : 'Adults'}
                      </Text>
                    </View>
                    {guests.children > 0 && (
                      <View style={styles.quoteGuestPill}>
                        <Icon name="account-child-outline" size={13} color="#16733F" />
                        <Text style={styles.quoteGuestPillText}>
                          {guests.children} {guests.children === 1 ? 'Child' : 'Children'}
                        </Text>
                      </View>
                    )}
                  </View>

                  <Text style={styles.quoteRoomPricingCalc}>
                    {formatMoney(room.rate, quote.currency.code)}/nt
                    {room.pricingType === 'perGuest' ? ' · Per Guest' : ' · Per Room'}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.quoteRoomDivider} />

        <View style={styles.breakdownHeader}>
          <Text style={styles.sectionLabel}>COST BREAKDOWN</Text>
          <View style={styles.nightBadge}>
            <Text style={styles.nightBadgeText}>
              {totalNights} {totalNights === 1 ? 'NIGHT' : 'NIGHTS'}
            </Text>
          </View>
        </View>

        <SummaryRow
          label="Room subtotal"
          value={formatMoney(roomSubtotal, quote.currency.code)}
        />

        {discountAmount > 0 && (
          <SummaryRow
            label="Discount"
            value={`- ${formatMoney(discountAmount, quote.currency.code)}`}
          />
        )}

        {discountAmount > 0 && (
          <SummaryRow
            label="After discount"
            value={formatMoney(subtotal, quote.currency.code)}
          />
        )}

        {taxAmount > 0 && (
          <SummaryRow
            label="Taxes"
            value={`+ ${formatMoney(taxAmount, quote.currency.code)}`}
          />
        )}

        <View style={styles.totalBox}>
          <View>
            <Text style={styles.totalLabel}>TOTAL AMOUNT</Text>
            <Text style={styles.totalCaption}>
              Final quotation (all nights & taxes)
            </Text>
          </View>

          <View style={styles.totalRight}>
            <Text style={styles.totalValue}>
              {formatMoney(finalTotal, quote.currency.code)}
            </Text>

            <Text style={styles.convertedValue}>
              ~ {formatMoney(convertedTotal, targetCurrency)}
            </Text>
          </View>
        </View>
      </Card>

      <Card index={1}>
        <SectionTitle>QUOTE MESSAGE</SectionTitle>
        <Text style={styles.sectionDescription}>
          Choose tone and export to guests
        </Text>

        <View style={styles.toneRow}>
          {(['friendly', 'formal', 'casual'] as const).map(option => (
            <AnimatedButton
              key={option}
              onPress={() => setTone(option)}
              style={[
                styles.toneButton,
                tone === option && styles.toneActive,
              ]}
            >
              <Text
                style={[
                  styles.toneText,
                  tone === option && styles.toneActiveText,
                ]}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Text>
            </AnimatedButton>
          ))}
        </View>

        <View style={styles.messageBox}>
          <View style={styles.messageHeader}>
            <Text style={styles.messageHeaderText}>LIVE PREVIEW</Text>
            <View style={styles.messageLiveDot} />
          </View>

          <Text
            style={[
              styles.messageText,
              finalTotal <= 0 && styles.messagePlaceholder,
            ]}
          >
            {message}
          </Text>
        </View>

        <View style={styles.actionRow}>
          <AnimatedButton onPress={copyMessage} style={styles.copyButton}>
            <Icon name="content-copy" size={17} color="#2D3B33" />
            <Text style={styles.copyButtonText}>Copy</Text>
          </AnimatedButton>

          <AnimatedButton onPress={openWhatsApp} style={styles.whatsappButton}>
            <Icon name="whatsapp" size={19} color="#FFFFFF" />
            <Text style={styles.whatsappButtonText}>WhatsApp</Text>
          </AnimatedButton>

          <AnimatedButton onPress={openEmail} style={styles.emailButton}>
            <Icon name="email-outline" size={19} color="#FFFFFF" />
            <Text style={styles.emailButtonText}>Email</Text>
          </AnimatedButton>
        </View>
      </Card>

      <NextButton
        label="Back to Pricing"
        onPress={goBack}
        showBack
        backOnly
      />
    </>
  );

  const renderCurrentTab = () => {
    switch (activeTab) {
      case 'pricing':
        return renderPricingTab();
      case 'quote':
        return renderQuoteTab();
      case 'stay':
      default:
        return renderStayTab();
    }
  };

  const renderScreenHeader = () => (
    <>
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <AnimatedLogo />
          <View>
            <Text style={styles.brandTitle}>Quote Generator</Text>
            <Text style={styles.brandSubtitle}>HOSPITALITY SUITE</Text>
          </View>
        </View>

       
      </View>

      <AnimatedHeading />

      <StepProgressBar
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
    </>
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {activeTab === 'rooms' ? (
          <View style={styles.roomsContainer}>
            <FlatList
              data={orderedRooms.slice(0, visibleRoomCount)}
              keyExtractor={item => item.id}
              renderItem={renderRoomItem}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              onEndReached={handleLoadMoreRooms}
              onEndReachedThreshold={0.5}
              initialNumToRender={ROOMS_PAGE_SIZE}
              maxToRenderPerBatch={ROOMS_PAGE_SIZE}
              windowSize={5}
              removeClippedSubviews={Platform.OS === 'android'}
              contentContainerStyle={[
                styles.content,
                styles.roomsListContent,
              ]}
              ListHeaderComponent={
                <>
                  {renderScreenHeader()}
                  {renderRoomsHeader()}
                </>
              }
              ListFooterComponent={renderRoomsFooter}
            />

            <View style={styles.stickyRoomsFooter}>
              <NextButton
                label="Continue to Pricing"
                onPress={goNext}
                onBack={goBack}
                showBack
              />
            </View>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {renderScreenHeader()}
            <View>{renderCurrentTab()}</View>
          </ScrollView>
        )}

        <View style={styles.bottomTabBar}>
          <TabBar activeTab={activeTab} onTabPress={handleTabPress} />
        </View>
      </KeyboardAvoidingView>

      <CalendarModal
        visible={calendarVisible}
        field={calendarField}
        checkIn={quote.checkIn}
        checkOut={quote.checkOut}
        onClose={closeCalendar}
        onSelect={handleCalendarSelect}
      />

      <Modal
        visible={currencyModal}
        transparent
        animationType="slide"
        onRequestClose={() => setCurrencyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.currencyModal}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Display Currency</Text>
                <Text style={styles.modalSubtitle}>
                  Choose the currency for displaying your quote
                </Text>
              </View>

              <Pressable
                onPress={() => setCurrencyModal(false)}
                style={styles.modalClose}
              >
                <Text style={styles.modalCloseText}>×</Text>
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {CURRENCIES.map(currency => {
                const selected = targetCurrency === currency.code;

                return (
                  <Pressable
                    key={currency.code}
                    onPress={() => selectCurrency(currency.code)}
                    style={[
                      styles.currencyOption,
                      selected && styles.currencyOptionActive,
                    ]}
                  >
                    <View style={styles.currencySymbolBox}>
                      <Text style={styles.currencySymbol}>{currency.symbol}</Text>
                    </View>

                    <View style={styles.currencyOptionContent}>
                      <Text style={styles.currencyCode}>{currency.code}</Text>
                      <Text style={styles.currencyName}>{currency.name}</Text>
                    </View>

                    {selected && (
                      <View style={styles.selectedCheck}>
                        <Icon name="check" size={16} color="#FFFFFF" />
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function NextButton({
  label,
  onPress,
  onBack,
  showBack = false,
  backOnly = false,
}: {
  label: string;
  onPress: () => void;
  onBack?: () => void;
  showBack?: boolean;
  backOnly?: boolean;
}) {
  if (backOnly) {
    return (
      <View style={styles.navigationButtons}>
        <AnimatedButton onPress={onPress} style={styles.backOnlyButton}>
          <Icon name="arrow-left" size={19} color="#16733F" />
          <Text style={styles.backButtonText}>{label}</Text>
        </AnimatedButton>
      </View>
    );
  }

  return (
    <View style={styles.navigationButtons}>
      {showBack && onBack && (
        <AnimatedButton onPress={onBack} style={styles.backButton}>
          <Icon name="arrow-left" size={19} color="#16733F" />
          <Text style={styles.backButtonText}>Back</Text>
        </AnimatedButton>
      )}

      <AnimatedButton
        onPress={onPress}
        style={[styles.nextButton, showBack && styles.nextButtonWithBack]}
      >
        <Text style={styles.nextButtonText}>{label}</Text>
        <Icon name="arrow-right" size={20} color="#FFFFFF" />
      </AnimatedButton>
    </View>
  );
}
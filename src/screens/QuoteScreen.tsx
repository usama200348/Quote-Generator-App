import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  Alert,
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
} from 'react-native';

import Toast from 'react-native-toast-message';
import Clipboard from '@react-native-clipboard/clipboard';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useQuoteState } from '../hooks/useQuoteState';

type CurrencyOption = {
  code: string;
  name: string;
  symbol: string;
};

type Tone = 'friendly' | 'formal' | 'casual';

type DiscountType = 'percent' | 'flat';

type TabKey =
  | 'stay'
  | 'rooms'
  | 'pricing'
  | 'quote';

const CURRENCIES: CurrencyOption[] = [
  {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
  },
  {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
  },
  {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
  },
  {
    code: 'PKR',
    name: 'Pakistani Rupee',
    symbol: '₨',
  },
  {
    code: 'AED',
    name: 'UAE Dirham',
    symbol: 'د.إ',
  },
  {
    code: 'SAR',
    name: 'Saudi Riyal',
    symbol: '﷼',
  },
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
  icon: string;
}[] = [
  {
    key: 'stay',
    label: 'Stay',
    number: '01',
    icon: 'calendar-month-outline',
  },
  {
    key: 'rooms',
    label: 'Rooms',
    number: '02',
    icon: 'bed-outline',
  },
  {
    key: 'pricing',
    label: 'Pricing',
    number: '03',
    icon: 'cash-multiple',
  },
  {
    key: 'quote',
    label: 'Quote',
    number: '04',
    icon: 'file-document-outline',
  },
];

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AnimatedPressable =
  Animated.createAnimatedComponent(Pressable);

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
  const scale = useRef(
    new Animated.Value(1),
  ).current;

  const handlePressIn = () => {
    if (disabled) {
      return;
    }

    Animated.spring(scale, {
      toValue: 0.95,
      speed: 35,
      bounciness: 4,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    if (disabled) {
      return;
    }

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

function SectionTitle({
  children,
}: {
  children: string;
}) {
  return (
    <Text style={styles.sectionLabel}>
      {children}
    </Text>
  );
}

function Card({
  children,
  index = 0,
}: {
  children: React.ReactNode;
  index?: number;
}) {
  const opacity = useRef(
    new Animated.Value(0),
  ).current;

  const translateY = useRef(
    new Animated.Value(24),
  ).current;

  const scale = useRef(
    new Animated.Value(0.97),
  ).current;

  const rotateX = useRef(
    new Animated.Value(1),
  ).current;

  useEffect(() => {
    const delay = index * 60;

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 420,
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
      Animated.timing(rotateX, {
        toValue: 0,
        duration: 550,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const rotateXValue =
    rotateX.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '4deg'],
    });

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity,
          transform: [
            { perspective: 1000 },
            { translateY },
            { scale },
            { rotateX: rotateXValue },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

function AnimatedLogo() {
  const scale = useRef(
    new Animated.Value(0.7),
  ).current;

  const rotate = useRef(
    new Animated.Value(-1),
  ).current;

  const float = useRef(
    new Animated.Value(0),
  ).current;

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
  }, []);

  const rotateY =
    rotate.interpolate({
      inputRange: [-1, 0],
      outputRange: ['-35deg', '0deg'],
    });

  const translateY =
    float.interpolate({
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
  const opacity = useRef(
    new Animated.Value(0),
  ).current;

  const translateY = useRef(
    new Animated.Value(18),
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
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
  }, []);

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

      <Text style={styles.pageTitle}>
        Create a Quote
      </Text>

      <Text style={styles.pageSubtitle}>
        Build a professional guest quotation in a few simple steps.
      </Text>
    </Animated.View>
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
      <View style={styles.counterInfo}>
        <Text style={styles.counterLabel}>
          {label}
        </Text>

        <Text style={styles.counterHint}>
          {label === 'Adults'
            ? 'Guests above 12 years'
            : 'Guests below 12 years'}
        </Text>
      </View>

      <View style={styles.counterControls}>
        <AnimatedButton
          disabled={value <= min}
          onPress={() =>
            onChange(
              Math.max(min, value - 1),
            )
          }
          style={[
            styles.counterButton,
            value <= min &&
              styles.counterButtonDisabled,
          ]}
        >
          <Text style={styles.counterButtonText}>
            −
          </Text>
        </AnimatedButton>

        <Text style={styles.counterValue}>
          {value}
        </Text>

        <AnimatedButton
          disabled={value >= max}
          onPress={() =>
            onChange(
              Math.min(max, value + 1),
            )
          }
          style={[
            styles.counterButton,
            value >= max &&
              styles.counterButtonDisabled,
          ]}
        >
          <Text style={styles.counterButtonText}>
            +
          </Text>
        </AnimatedButton>
      </View>
    </View>
  );
}

function formatMoney(
  amount: number,
  currency: string,
) {
  const currencyData =
    CURRENCIES.find(
      item => item.code === currency,
    );

  const symbol =
    currencyData?.symbol || currency;

  return `${symbol}${amount.toFixed(2)}`;
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryRowLabel}>
        {label}
      </Text>

      <Text style={styles.summaryRowValue}>
        {value}
      </Text>
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
        const selected =
          activeTab === tab.key;

        return (
          <Pressable
            key={tab.key}
            onPress={() =>
              onTabPress(tab.key)
            }
            style={styles.tabPressable}
            android_ripple={{
              color: '#DCEBE1',
              borderless: true,
            }}
          >
            <View
              style={[
                styles.tabItem,
                selected &&
                  styles.tabItemActive,
              ]}
            >
              <MaterialCommunityIcons
                name={tab.icon}
                size={17}
                color={
                  selected
                    ? '#16733F'
                    : '#8A9790'
                }
                style={styles.tabIcon}
              />

              <View
                style={
                  styles.tabTextContainer
                }
              >
                <Text
                  style={[
                    styles.tabNumber,
                    selected &&
                      styles.tabNumberActive,
                  ]}
                >
                  {tab.number}
                </Text>

                <Text
                  style={[
                    styles.tabLabel,
                    selected &&
                      styles.tabLabelActive,
                  ]}
                >
                  {tab.label}
                </Text>
              </View>
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

function addDays(
  date: Date,
  amount: number,
) {
  const result = new Date(date);

  result.setDate(
    result.getDate() + amount,
  );

  return startOfDay(result);
}

function parseDate(
  value?: string,
) {
  if (!value) {
    return null;
  }

  const [
    year,
    month,
    day,
  ] = value
    .split('-')
    .map(Number);

  if (
    !year ||
    !month ||
    !day
  ) {
    return null;
  }

  return startOfDay(
    new Date(
      year,
      month - 1,
      day,
    ),
  );
}

function formatISODate(
  date: Date,
) {
  const year =
    date.getFullYear();

  const month = String(
    date.getMonth() + 1,
  ).padStart(2, '0');

  const day = String(
    date.getDate(),
  ).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function isSameDay(
  first: Date,
  second: Date,
) {
  return (
    first.getFullYear() ===
      second.getFullYear() &&
    first.getMonth() ===
      second.getMonth() &&
    first.getDate() ===
      second.getDate()
  );
}

function getCalendarDays(
  monthDate: Date,
) {
  const year =
    monthDate.getFullYear();

  const month =
    monthDate.getMonth();

  const firstDay =
    new Date(
      year,
      month,
      1,
    ).getDay();

  const leadingDays =
    (firstDay + 6) % 7;

  const daysInMonth =
    new Date(
      year,
      month + 1,
      0,
    ).getDate();

  const result: (
    | Date
    | null
  )[] = [];

  for (
    let i = 0;
    i < leadingDays;
    i++
  ) {
    result.push(null);
  }

  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {
    result.push(
      new Date(
        year,
        month,
        day,
      ),
    );
  }

  while (
    result.length % 7 !== 0
  ) {
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
  onSelect: (
    date: Date,
  ) => void;
}) {
  const today =
    startOfDay(new Date());

  const checkInDate =
    parseDate(checkIn);

  const checkOutDate =
    parseDate(checkOut);

  const minimumDate =
    field === 'checkOut' &&
    checkInDate
      ? addDays(checkInDate, 1)
      : today;

  const selectedDate =
    field === 'checkIn'
      ? checkInDate
      : checkOutDate;

  const [
    visibleMonth,
    setVisibleMonth,
  ] = useState(
    new Date(
      today.getFullYear(),
      today.getMonth(),
      1,
    ),
  );

  const sheetAnimation =
    useRef(
      new Animated.Value(0),
    ).current;

  useEffect(() => {
    if (!visible) {
      return;
    }

    const initialDate =
      selectedDate ||
      minimumDate;

    setVisibleMonth(
      new Date(
        initialDate.getFullYear(),
        initialDate.getMonth(),
        1,
      ),
    );

    sheetAnimation.setValue(0);

    Animated.timing(
      sheetAnimation,
      {
        toValue: 1,
        duration: 320,
        easing: Easing.out(
          Easing.cubic,
        ),
        useNativeDriver: true,
      },
    ).start();
  }, [visible]);

  const closeCalendar = () => {
    Animated.timing(
      sheetAnimation,
      {
        toValue: 0,
        duration: 220,
        easing: Easing.in(
          Easing.cubic,
        ),
        useNativeDriver: true,
      },
    ).start(() => {
      onClose();
    });
  };

  const monthLabel =
    visibleMonth.toLocaleDateString(
      'en-US',
      {
        month: 'long',
        year: 'numeric',
      },
    );

  const days =
    getCalendarDays(
      visibleMonth,
    );

  const goMonth = (
    amount: number,
  ) => {
    setVisibleMonth(
      current =>
        new Date(
          current.getFullYear(),
          current.getMonth() +
            amount,
          1,
        ),
    );
  };

  const canGoPrevious =
    visibleMonth.getFullYear() >
      minimumDate.getFullYear() ||
    (
      visibleMonth.getFullYear() ===
        minimumDate.getFullYear() &&
      visibleMonth.getMonth() >
        minimumDate.getMonth()
    );

  const sheetTranslateY =
    sheetAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [450, 0],
    });

  const sheetScale =
    sheetAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.96, 1],
    });

  const sheetOpacity =
    sheetAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={
        closeCalendar
      }
    >
      <View
        style={
          styles.calendarOverlay
        }
      >
        <Pressable
          style={
            StyleSheet.absoluteFill
          }
          onPress={
            closeCalendar
          }
        />

        <Animated.View
          style={[
            styles.calendarSheet,
            {
              opacity:
                sheetOpacity,
              transform: [
                {
                  translateY:
                    sheetTranslateY,
                },
                {
                  scale:
                    sheetScale,
                },
              ],
            },
          ]}
        >
          <View
            style={
              styles.calendarTop
            }
          >
            <View>
              <Text
                style={
                  styles.calendarEyebrow
                }
              >
                {field === 'checkIn'
                  ? 'SELECT CHECK-IN'
                  : 'SELECT CHECK-OUT'}
              </Text>

              <Text
                style={
                  styles.calendarSelectedText
                }
              >
                {selectedDate
                  ? selectedDate.toLocaleDateString(
                      'en-US',
                      {
                        weekday:
                          'short',
                        month:
                          'short',
                        day: 'numeric',
                      },
                    )
                  : 'Choose a date'}
              </Text>
            </View>

            <Pressable
              onPress={
                closeCalendar
              }
              style={
                styles.calendarClose
              }
            >
              <Text
                style={
                  styles.calendarCloseText
                }
              >
                ×
              </Text>
            </Pressable>
          </View>

          <View
            style={
              styles.monthNavigation
            }
          >
            <Pressable
              disabled={
                !canGoPrevious
              }
              onPress={() =>
                goMonth(-1)
              }
              style={[
                styles.monthButton,
                !canGoPrevious &&
                  styles.monthButtonDisabled,
              ]}
            >
              <MaterialCommunityIcons
                name="chevron-left"
                size={27}
                color="#1B7A43"
              />
            </Pressable>

            <Text
              style={
                styles.monthTitle
              }
            >
              {monthLabel}
            </Text>

            <Pressable
              onPress={() =>
                goMonth(1)
              }
              style={
                styles.monthButton
              }
            >
              <MaterialCommunityIcons
                name="chevron-right"
                size={27}
                color="#1B7A43"
              />
            </Pressable>
          </View>

          <View
            style={
              styles.weekRow
            }
          >
            {[
              'MON',
              'TUE',
              'WED',
              'THU',
              'FRI',
              'SAT',
              'SUN',
            ].map(day => (
              <Text
                key={day}
                style={
                  styles.weekText
                }
              >
                {day}
              </Text>
            ))}
          </View>

          <View
            style={
              styles.calendarGrid
            }
          >
            {days.map(
              (date, index) => {
                if (!date) {
                  return (
                    <View
                      key={`empty-${index}`}
                      style={
                        styles.calendarDay
                      }
                    />
                  );
                }

                const disabled =
                  date <
                  minimumDate;

                const selected =
                  !!selectedDate &&
                  isSameDay(
                    date,
                    selectedDate,
                  );

                const isToday =
                  isSameDay(
                    date,
                    today,
                  );

                const isRangeStart =
                  !!checkInDate &&
                  isSameDay(
                    date,
                    checkInDate,
                  );

                const isRangeEnd =
                  !!checkOutDate &&
                  isSameDay(
                    date,
                    checkOutDate,
                  );

                const inRange =
                  !!checkInDate &&
                  !!checkOutDate &&
                  date >
                    checkInDate &&
                  date <
                    checkOutDate;

                return (
                  <View
                    key={date.toISOString()}
                    style={
                      styles.calendarDay
                    }
                  >
                    <Pressable
                      disabled={
                        disabled
                      }
                      onPress={() =>
                        onSelect(
                          date,
                        )
                      }
                      style={[
                        styles.calendarDateButton,
                        inRange &&
                          styles.calendarRange,
                        selected &&
                          styles.calendarDateSelected,
                        isToday &&
                          !selected &&
                          styles.calendarToday,
                        disabled &&
                          styles.calendarDateDisabled,
                      ]}
                    >
                      <Text
                        style={[
                          styles.calendarDateText,
                          selected &&
                            styles.calendarDateTextSelected,
                          disabled &&
                            styles.calendarDateTextDisabled,
                        ]}
                      >
                        {date.getDate()}
                      </Text>
                    </Pressable>

                    {isToday &&
                      !selected && (
                        <View
                          style={
                            styles.todayDot
                          }
                        />
                      )}

                    {(isRangeStart ||
                      isRangeEnd) &&
                      checkInDate &&
                      checkOutDate && (
                        <View
                          style={
                            styles.rangeMarker
                          }
                        />
                      )}
                  </View>
                );
              },
            )}
          </View>

          <View
            style={
              styles.calendarLegend
            }
          >
            <View
              style={
                styles.legendItem
              }
            >
              <View
                style={
                  styles.legendDotSelected
                }
              />

              <Text
                style={
                  styles.legendText
                }
              >
                Selected
              </Text>
            </View>

            <View
              style={
                styles.legendItem
              }
            >
              <View
                style={
                  styles.legendDotToday
                }
              />

              <Text
                style={
                  styles.legendText
                }
              >
                Today
              </Text>
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

  const [
    targetCurrency,
    setTargetCurrency,
  ] = useState('PKR');

  const [tone, setTone] =
    useState<Tone>('friendly');

  const [
    discountType,
    setDiscountType,
  ] =
    useState<DiscountType>(
      'percent',
    );

  const [
    activeTab,
    setActiveTab,
  ] = useState<TabKey>('stay');

  const [
    calendarVisible,
    setCalendarVisible,
  ] = useState(false);

  const [
    calendarField,
    setCalendarField,
  ] =
    useState<
      'checkIn' | 'checkOut' | null
    >(null);

  const [
    currencyModal,
    setCurrencyModal,
  ] = useState(false);

  const totalGuests =
    quote.guests.adults +
    quote.guests.children;

  const totalNights =
    useMemo(() => {
      const start =
        parseDate(
          quote.checkIn,
        );

      const end =
        parseDate(
          quote.checkOut,
        );

      if (!start || !end) {
        return 0;
      }

      return Math.max(
        0,
        Math.round(
          (end.getTime() -
            start.getTime()) /
            86400000,
        ),
      );
    }, [
      quote.checkIn,
      quote.checkOut,
    ]);

  const roomSubtotal =
    useMemo(() => {
      if (
        totalNights <= 0
      ) {
        return 0;
      }

      return quote.rooms.reduce(
        (total, room) => {
          const guestMultiplier =
            room.pricingType ===
            'perGuest'
              ? totalGuests
              : 1;

          return (
            total +
            room.rate *
              room.quantity *
              totalNights *
              guestMultiplier
          );
        },
        0,
      );
    }, [
      quote.rooms,
      totalNights,
      totalGuests,
    ]);

  const discountAmount =
    discountType === 'percent'
      ? roomSubtotal *
        (quote.discount / 100)
      : Math.min(
          quote.discount,
          roomSubtotal,
        );

  const subtotal = Math.max(
    roomSubtotal -
      discountAmount,
    0,
  );

  const taxAmount =
    subtotal *
    (quote.tax / 100);

  const finalTotal =
    subtotal + taxAmount;

  const exchangeRate =
    EXCHANGE_RATES[
      targetCurrency
    ] /
    EXCHANGE_RATES[
      quote.currency.code
    ];

  const convertedTotal =
    finalTotal *
    exchangeRate;

  const datesSelected =
    Boolean(
      quote.checkIn &&
        quote.checkOut &&
        totalNights > 0,
    );

  const showDateRequiredToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Dates Required',
      text2:
        'Please select both check-in and check-out dates first.',
      position: 'top',
      visibilityTime: 2500,
      topOffset: 60,
    });
  };

  const handleTabPress = (
    tab: TabKey,
  ) => {
    if (tab === activeTab) {
      return;
    }

    const currentIndex =
      TABS.findIndex(
        item =>
          item.key === activeTab,
      );

    const targetIndex =
      TABS.findIndex(
        item =>
          item.key === tab,
      );

    if (
      activeTab === 'stay' &&
      targetIndex > currentIndex &&
      !datesSelected
    ) {
      showDateRequiredToast();
      return;
    }

    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut,
    );

    setActiveTab(tab);
  };

  const openCalendar = (
    field:
      | 'checkIn'
      | 'checkOut',
  ) => {
    if (
      field === 'checkOut' &&
      !quote.checkIn
    ) {
      Toast.show({
        type: 'error',
        text1: 'Check-in Required',
        text2:
          'Please select check-in before selecting check-out.',
        position: 'top',
        visibilityTime: 2500,
        topOffset: 60,
      });

      return;
    }

    setCalendarField(field);
    setCalendarVisible(true);
  };

  const closeCalendar = () => {
    setCalendarVisible(false);
    setCalendarField(null);
  };

  const handleCalendarSelect = (
    date: Date,
  ) => {
    if (!calendarField) {
      return;
    }

    const formattedDate =
      formatISODate(date);

    if (
      calendarField ===
      'checkIn'
    ) {
      updateQuote({
        checkIn:
          formattedDate,
        checkOut: '',
      });
    } else {
      const checkIn =
        parseDate(
          quote.checkIn,
        );

      if (
        checkIn &&
        date <= checkIn
      ) {
        Toast.show({
          type: 'error',
          text1: 'Invalid Check-out',
          text2:
            'Check-out must be after check-in.',
          position: 'top',
          visibilityTime: 2500,
          topOffset: 60,
        });

        return;
      }

      updateQuote({
        checkOut:
          formattedDate,
      });
    }

    closeCalendar();
  };

  const handleAddRoom = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets
        .easeInEaseOut,
    );

    addRoom();
  };

  const handleRemoveRoom = (
    roomId: string,
  ) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets
        .easeInEaseOut,
    );

    removeRoom(roomId);
  };

  const selectCurrency = (
    currency: string,
  ) => {
    setTargetCurrency(currency);
    setCurrencyModal(false);
  };

  const generateMessage = () => {
    if (
      !datesSelected ||
      finalTotal <= 0
    ) {
      return 'Fill in dates and room details to preview your quote message...';
    }

    const dateText =
      `${quote.checkIn} to ${quote.checkOut}`;

    if (
      tone === 'formal'
    ) {
      return (
        `Dear Guest,\n\n` +
        `Thank you for your inquiry. ` +
        `Your quote for ${dateText} ` +
        `(${totalNights} nights) ` +
        `for ${totalGuests} guests ` +
        `is ${formatMoney(
          finalTotal,
          quote.currency.code,
        )}.\n\n` +
        `Please contact us to finalize your reservation.\n\n` +
        `Warm regards,\nReservations Team`
      );
    }

    if (
      tone === 'casual'
    ) {
      return (
        `Hey! Your stay from ${dateText} ` +
        `comes out to ${formatMoney(
          finalTotal,
          quote.currency.code,
        )}. Hit us up to lock it in!`
      );
    }

    return (
      `Hi there! We'd love to host you. ` +
      `For your stay from ${dateText} ` +
      `(${totalNights} nights) for ` +
      `${totalGuests} guests, the total is ` +
      `${formatMoney(
        finalTotal,
        quote.currency.code,
      )} ` +
      `(~${formatMoney(
        convertedTotal,
        targetCurrency,
      )}). Let us know if you'd like to book!`
    );
  };

  const message =
    generateMessage();

  const copyMessage = () => {
    if (
      !datesSelected ||
      finalTotal <= 0
    ) {
      Toast.show({
        type: 'error',
        text1: 'Quote Incomplete',
        text2:
          'Please select dates and add room details first.',
        position: 'top',
        visibilityTime: 2500,
        topOffset: 60,
      });

      return;
    }

    Clipboard.setString(
      message,
    );

    Toast.show({
      type: 'success',
      text1: 'Copied to Clipboard',
      text2:
        'Quote message is ready to paste.',
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const openWhatsApp = () => {
    if (
      !datesSelected ||
      finalTotal <= 0
    ) {
      Toast.show({
        type: 'error',
        text1: 'Quote Incomplete',
        text2:
          'Please complete the quote first.',
        position: 'top',
        visibilityTime: 2500,
        topOffset: 60,
      });

      return;
    }

    const url =
      `https://wa.me/?text=${encodeURIComponent(
        message,
      )}`;

    Linking.openURL(url).catch(
      () =>
        Alert.alert(
          'Error',
          'Could not open WhatsApp.',
        ),
    );
  };

  const openEmail = () => {
    if (
      !datesSelected ||
      finalTotal <= 0
    ) {
      Toast.show({
        type: 'error',
        text1: 'Quote Incomplete',
        text2:
          'Please complete the quote first.',
        position: 'top',
        visibilityTime: 2500,
        topOffset: 60,
      });

      return;
    }

    const subject =
      encodeURIComponent(
        'Your Hotel Booking Quote',
      );

    const body =
      encodeURIComponent(
        message,
      );

    const url =
      `mailto:?subject=${subject}&body=${body}`;

    Linking.openURL(url).catch(
      () =>
        Alert.alert(
          'Error',
          'No email app is available on this device.',
        ),
    );
  };

  const goNext = () => {
    if (
      activeTab === 'stay'
    ) {
      if (!datesSelected) {
        showDateRequiredToast();
        return;
      }

      LayoutAnimation.configureNext(
        LayoutAnimation.Presets.easeInEaseOut,
      );

      setActiveTab('rooms');
      return;
    }

    if (
      activeTab === 'rooms'
    ) {
      LayoutAnimation.configureNext(
        LayoutAnimation.Presets.easeInEaseOut,
      );

      setActiveTab('pricing');
      return;
    }

    if (
      activeTab === 'pricing'
    ) {
      LayoutAnimation.configureNext(
        LayoutAnimation.Presets.easeInEaseOut,
      );

      setActiveTab('quote');
      return;
    }
  };

  const goBack = () => {
    if (
      activeTab === 'rooms'
    ) {
      setActiveTab('stay');
      return;
    }

    if (
      activeTab === 'pricing'
    ) {
      setActiveTab('rooms');
      return;
    }

    if (
      activeTab === 'quote'
    ) {
      setActiveTab('pricing');
      return;
    }
  };

  const renderStayTab =
    () => (
      <>
        <Card index={0}>
          <View
            style={
              styles.sectionTopRow
            }
          >
            <View>
              <SectionTitle>
                STAY DETAILS
              </SectionTitle>

              <Text
                style={
                  styles.sectionDescription
                }
              >
                Select your guest stay dates
              </Text>
            </View>

            <View
              style={
                styles.stepBadge
              }
            >
              <Text
                style={
                  styles.stepBadgeText
                }
              >
                01
              </Text>
            </View>
          </View>

          <View
            style={
              styles.twoColumns
            }
          >
            <View
              style={
                styles.halfColumn
              }
            >
              <Text
                style={
                  styles.fieldLabel
                }
              >
                Check-in
              </Text>

              <AnimatedButton
                onPress={() =>
                  openCalendar(
                    'checkIn',
                  )
                }
                style={
                  styles.dateInput
                }
              >
                <Text
                  style={
                    quote.checkIn
                      ? styles.dateText
                      : styles.placeholderText
                  }
                >
                  {quote.checkIn ||
                    'Select date'}
                </Text>

                <MaterialCommunityIcons
                  name="calendar-month-outline"
                  size={19}
                  color="#16733F"
                />
              </AnimatedButton>
            </View>

            <View
              style={
                styles.halfColumn
              }
            >
              <Text
                style={
                  styles.fieldLabel
                }
              >
                Check-out
              </Text>

              <AnimatedButton
                disabled={
                  !quote.checkIn
                }
                onPress={() =>
                  openCalendar(
                    'checkOut',
                  )
                }
                style={[
                  styles.dateInput,
                  !quote.checkIn &&
                    styles.disabledInput,
                ]}
              >
                <Text
                  style={
                    quote.checkOut
                      ? styles.dateText
                      : styles.placeholderText
                  }
                >
                  {quote.checkOut ||
                    'Select date'}
                </Text>

                <MaterialCommunityIcons
                  name="calendar-month-outline"
                  size={19}
                  color="#16733F"
                />
              </AnimatedButton>
            </View>
          </View>

          {quote.checkIn &&
            quote.checkOut &&
            totalNights > 0 && (
              <View
                style={
                  styles.stayInfoBar
                }
              >
                <MaterialCommunityIcons
                  name="calendar-check-outline"
                  size={17}
                  color="#1B7A43"
                  style={
                    styles.stayInfoIcon
                  }
                />

                <Text
                  style={
                    styles.stayInfoText
                  }
                >
                  {totalNights}{' '}
                  {totalNights === 1
                    ? 'night'
                    : 'nights'}{' '}
                  stay
                </Text>
              </View>
            )}
        </Card>

        <Card index={1}>
          <View
            style={
              styles.sectionTopRow
            }
          >
            <View>
              <SectionTitle>
                GUESTS
              </SectionTitle>

              <Text
                style={
                  styles.sectionDescription
                }
              >
                Add the guests for this quote
              </Text>
            </View>

            <AnimatedButton
              onPress={
                handleAddRoom
              }
              style={
                styles.addRoomButton
              }
            >
              <Text
                style={
                  styles.addRoomText
                }
              >
                + Add Room
              </Text>
            </AnimatedButton>
          </View>

          <Counter
            label="Adults"
            value={
              quote.guests.adults
            }
            min={1}
            max={20}
            onChange={value =>
              updateGuests({
                adults: value,
              })
            }
          />

          <View
            style={styles.divider}
          />

          <Counter
            label="Children"
            value={
              quote.guests.children
            }
            min={0}
            max={20}
            onChange={value =>
              updateGuests({
                children: value,
              })
            }
          />

          <View
            style={
              styles.guestTotalBar
            }
          >
            <Text
              style={
                styles.guestTotalLabel
              }
            >
              Total guests
            </Text>

            <Text
              style={
                styles.guestTotalValue
              }
            >
              {totalGuests}
            </Text>
          </View>
        </Card>

        <NextButton
          label="Continue to Rooms"
          onPress={goNext}
        />
      </>
    );

  const renderRoomsTab =
    () => (
      <>
        <Card index={0}>
          <View
            style={
              styles.sectionHeaderRow
            }
          >
            <View
              style={
                styles.sectionHeaderContent
              }
            >
              <SectionTitle>
                ROOMS
              </SectionTitle>

              <Text
                style={
                  styles.sectionDescription
                }
              >
                Configure accommodation and nightly rates
              </Text>
            </View>

            <AnimatedButton
              onPress={
                handleAddRoom
              }
              style={
                styles.addRoomButton
              }
            >
              <Text
                style={
                  styles.addRoomText
                }
              >
                + Add Room
              </Text>
            </AnimatedButton>
          </View>

          {quote.rooms.map(
            (room, index) => (
              <View
                key={room.id}
                style={
                  styles.roomBox
                }
              >
                <View
                  style={
                    styles.roomHeader
                  }
                >
                  <View
                    style={
                      styles.roomNumber
                    }
                  >
                    <Text
                      style={
                        styles.roomNumberText
                      }
                    >
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        '0',
                      )}
                    </Text>
                  </View>

                  <View
                    style={
                      styles.roomHeaderTitle
                    }
                  >
                    <Text
                      style={
                        styles.roomTitle
                      }
                    >
                      Room {index + 1}
                    </Text>

                    <Text
                      style={
                        styles.roomSubtitle
                      }
                    >
                      Accommodation
                    </Text>
                  </View>

                  {quote.rooms
                    .length > 1 && (
                    <AnimatedButton
                      onPress={() =>
                        handleRemoveRoom(
                          room.id,
                        )
                      }
                      style={
                        styles.deleteButton
                      }
                    >
                      <Text
                        style={
                          styles.deleteText
                        }
                      >
                        Delete
                      </Text>
                    </AnimatedButton>
                  )}
                </View>

                <View
                  style={
                    styles.twoColumns
                  }
                >
                  <View
                    style={
                      styles.halfColumn
                    }
                  >
                    <Text
                      style={
                        styles.fieldLabel
                      }
                    >
                      Room Type
                    </Text>

                    <TextInput
                      value={room.name}
                      onChangeText={value =>
                        updateRoom(
                          room.id,
                          {
                            name: value,
                          },
                        )
                      }
                      placeholder="e.g. Deluxe"
                      placeholderTextColor="#9BA6A0"
                      style={
                        styles.input
                      }
                    />
                  </View>

                  <View
                    style={
                      styles.halfColumn
                    }
                  >
                    <Text
                      style={
                        styles.fieldLabel
                      }
                    >
                      Nightly Rate
                    </Text>

                    <TextInput
                      value={
                        room.rate
                          ? String(
                              room.rate,
                            )
                          : ''
                      }
                      keyboardType="decimal-pad"
                      onChangeText={value =>
                        updateRoom(
                          room.id,
                          {
                            rate:
                              Number(
                                value,
                              ) || 0,
                          },
                        )
                      }
                      placeholder="0"
                      placeholderTextColor="#9BA6A0"
                      style={
                        styles.input
                      }
                    />
                  </View>
                </View>

                <Text
                  style={[
                    styles.fieldLabel,
                    styles.rateAppliesLabel,
                  ]}
                >
                  Rate applies
                </Text>

                <View
                  style={
                    styles.toggleRow
                  }
                >
                  <AnimatedButton
                    onPress={() =>
                      updateRoom(
                        room.id,
                        {
                          pricingType:
                            'perRoom',
                        },
                      )
                    }
                    style={[
                      styles.toggleButton,
                      room.pricingType ===
                        'perRoom' &&
                        styles.toggleActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        room.pricingType ===
                          'perRoom' &&
                          styles.toggleActiveText,
                      ]}
                    >
                      Per Room
                    </Text>
                  </AnimatedButton>

                  <AnimatedButton
                    onPress={() =>
                      updateRoom(
                        room.id,
                        {
                          pricingType:
                            'perGuest',
                        },
                      )
                    }
                    style={[
                      styles.toggleButton,
                      room.pricingType ===
                        'perGuest' &&
                        styles.toggleActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        room.pricingType ===
                          'perGuest' &&
                          styles.toggleActiveText,
                      ]}
                    >
                      Per Guest
                    </Text>
                  </AnimatedButton>
                </View>
              </View>
            ),
          )}
        </Card>

        <View
          style={
            styles.roomTotalPreview
          }
        >
          <View>
            <Text
              style={
                styles.previewCaption
              }
            >
              CURRENT ROOM SUBTOTAL
            </Text>

            <Text
              style={
                styles.previewAmount
              }
            >
              {formatMoney(
                roomSubtotal,
                quote.currency.code,
              )}
            </Text>
          </View>

          <Text
            style={
              styles.previewNights
            }
          >
            {totalNights || 0}{' '}
            nights
          </Text>
        </View>

        <NextButton
          label="Continue to Pricing"
          onPress={goNext}
          onBack={goBack}
          showBack
        />
      </>
    );

  const renderPricingTab =
    () => (
      <>
        <Card index={0}>
          <View
            style={
              styles.sectionTopRow
            }
          >
            <View>
              <SectionTitle>
                PRICING MODIFIERS
              </SectionTitle>

              <Text
                style={
                  styles.sectionDescription
                }
              >
                Adjust discounts and taxes
              </Text>
            </View>

            <View
              style={
                styles.stepBadge
              }
            >
              <Text
                style={
                  styles.stepBadgeText
                }
              >
                03
              </Text>
            </View>
          </View>

          <View
            style={
              styles.twoColumns
            }
          >
            <View
              style={
                styles.halfColumn
              }
            >
              <Text
                style={
                  styles.fieldLabel
                }
              >
                Discount
              </Text>

              <View
                style={
                  styles.smallToggleRow
                }
              >
                <AnimatedButton
                  onPress={() =>
                    setDiscountType(
                      'percent',
                    )
                  }
                  style={[
                    styles.smallToggle,
                    discountType ===
                      'percent' &&
                      styles.toggleActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.toggleText,
                      discountType ===
                        'percent' &&
                        styles.toggleActiveText,
                    ]}
                  >
                    %
                  </Text>
                </AnimatedButton>

                <AnimatedButton
                  onPress={() =>
                    setDiscountType(
                      'flat',
                    )
                  }
                  style={[
                    styles.smallToggle,
                    discountType ===
                      'flat' &&
                      styles.toggleActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.toggleText,
                      discountType ===
                        'flat' &&
                        styles.toggleActiveText,
                    ]}
                  >
                    Flat
                  </Text>
                </AnimatedButton>
              </View>

              <TextInput
                value={
                  quote.discount
                    ? String(
                        quote.discount,
                      )
                    : ''
                }
                keyboardType="decimal-pad"
                placeholder="0"
                placeholderTextColor="#9BA6A0"
                onChangeText={value =>
                  updateQuote({
                    discount:
                      Number(value) ||
                      0,
                  })
                }
                style={
                  styles.input
                }
              />
            </View>

            <View
              style={
                styles.halfColumn
              }
            >
              <Text
                style={
                  styles.fieldLabel
                }
              >
                Tax Rate
              </Text>

              <View
                style={
                  styles.taxLabelSpace
                }
              >
                <Text
                  style={
                    styles.percentBadgeText
                  }
                >
                  TAX
                </Text>
              </View>

              <TextInput
                value={
                  quote.tax
                    ? String(
                        quote.tax,
                      )
                    : ''
                }
                keyboardType="decimal-pad"
                placeholder="0"
                placeholderTextColor="#9BA6A0"
                onChangeText={value =>
                  updateQuote({
                    tax:
                      Number(value) ||
                      0,
                  })
                }
                style={
                  styles.input
                }
              />
            </View>
          </View>
        </Card>

        <Card index={1}>
          <View
            style={
              styles.sectionTopRow
            }
          >
            <View>
              <SectionTitle>
                CURRENCY
              </SectionTitle>

              <Text
                style={
                  styles.sectionDescription
                }
              >
                Choose how your quote is displayed
              </Text>
            </View>

            <View
              style={
                styles.currencyIcon
              }
            >
              <Text
                style={
                  styles.currencyIconText
                }
              >
                $
              </Text>
            </View>
          </View>

          <View
            style={
              styles.twoColumns
            }
          >
            <View
              style={
                styles.halfColumn
              }
            >
              <Text
                style={
                  styles.fieldLabel
                }
              >
                Base Currency
              </Text>

              <View
                style={
                  styles.selectBox
                }
              >
                <Text
                  style={
                    styles.selectText
                  }
                >
                  {quote.currency.code}
                </Text>

                <MaterialCommunityIcons
                  name="lock-outline"
                  size={17}
                  color="#9BA59F"
                />
              </View>
            </View>

            <View
              style={
                styles.halfColumn
              }
            >
              <Text
                style={
                  styles.fieldLabel
                }
              >
                Display In
              </Text>

              <AnimatedButton
                style={
                  styles.selectBox
                }
                onPress={() =>
                  setCurrencyModal(
                    true,
                  )
                }
              >
                <Text
                  style={
                    styles.selectText
                  }
                >
                  {targetCurrency}
                </Text>

                <MaterialCommunityIcons
                  name="chevron-down"
                  size={19}
                  color="#1B7A43"
                />
              </AnimatedButton>
            </View>
          </View>

          <View
            style={
              styles.exchangeBox
            }
          >
            <View
              style={
                styles.exchangeIcon
              }
            >
              <MaterialCommunityIcons
                name="swap-horizontal"
                size={19}
                color="#1B7A43"
              />
            </View>

            <View
              style={
                styles.exchangeContent
              }
            >
              <Text
                style={
                  styles.exchangeCaption
                }
              >
                DISPLAY RATE
              </Text>

              <Text
                style={
                  styles.exchangeText
                }
              >
                1 {quote.currency.code}{' '}
                ={' '}
                {exchangeRate.toFixed(
                  2,
                )}{' '}
                {targetCurrency}
              </Text>
            </View>
          </View>
        </Card>

        <Card index={2}>
          <View
            style={
              styles.pricingPreviewHeader
            }
          >
            <View>
              <Text
                style={
                  styles.previewCaption
                }
              >
                ESTIMATED TOTAL
              </Text>

              <Text
                style={
                  styles.pricingPreviewAmount
                }
              >
                {formatMoney(
                  finalTotal,
                  quote.currency.code,
                )}
              </Text>
            </View>

            <View
              style={
                styles.pricingStatus
              }
            >
              <Text
                style={
                  styles.pricingStatusText
                }
              >
                READY
              </Text>
            </View>
          </View>

          <SummaryRow
            label="Room subtotal"
            value={formatMoney(
              roomSubtotal,
              quote.currency.code,
            )}
          />

          <SummaryRow
            label="Discount"
            value={`- ${formatMoney(
              discountAmount,
              quote.currency.code,
            )}`}
          />

          <SummaryRow
            label="Tax"
            value={`+ ${formatMoney(
              taxAmount,
              quote.currency.code,
            )}`}
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

  const renderQuoteTab =
    () => (
      <>
        <Card index={0}>
          <View
            style={
              styles.summaryHeader
            }
          >
            <View
              style={
                styles.summaryIcon
              }
            >
              <MaterialCommunityIcons
                name="office-building-outline"
                size={22}
                color="#FFFFFF"
              />
            </View>

            <View
              style={
                styles.summaryHeaderText
              }
            >
              <Text
                style={
                  styles.summaryTitle
                }
              >
                Quote Summary
              </Text>

              <Text
                style={
                  styles.summarySubtitle
                }
              >
                {totalGuests}{' '}
                {totalGuests === 1
                  ? 'guest'
                  : 'guests'}{' '}
                ·{' '}
                {quote.rooms.length}{' '}
                {quote.rooms.length ===
                1
                  ? 'room'
                  : 'rooms'}
              </Text>
            </View>

            <View
              style={
                styles.summaryCheck
              }
            >
              <MaterialCommunityIcons
                name="check"
                size={18}
                color="#1B7A43"
              />
            </View>
          </View>

          <View
            style={
              styles.breakdownHeader
            }
          >
            <Text
              style={
                styles.sectionLabel
              }
            >
              BREAKDOWN
            </Text>

            <View
              style={
                styles.nightBadge
              }
            >
              <Text
                style={
                  styles.nightBadgeText
                }
              >
                {totalNights}{' '}
                {totalNights === 1
                  ? 'NIGHT'
                  : 'NIGHTS'}
              </Text>
            </View>
          </View>

          <SummaryRow
            label="Room subtotal"
            value={formatMoney(
              roomSubtotal,
              quote.currency.code,
            )}
          />

          {discountAmount > 0 && (
            <SummaryRow
              label="Discount"
              value={`- ${formatMoney(
                discountAmount,
                quote.currency.code,
              )}`}
            />
          )}

          {discountAmount > 0 && (
            <SummaryRow
              label="After discount"
              value={formatMoney(
                subtotal,
                quote.currency.code,
              )}
            />
          )}

          {taxAmount > 0 && (
            <SummaryRow
              label="Taxes"
              value={`+ ${formatMoney(
                taxAmount,
                quote.currency.code,
              )}`}
            />
          )}

          <View
            style={
              styles.totalBox
            }
          >
            <View>
              <Text
                style={
                  styles.totalLabel
                }
              >
                TOTAL
              </Text>

              <Text
                style={
                  styles.totalCaption
                }
              >
                Final quotation amount
              </Text>
            </View>

            <View
              style={
                styles.totalRight
              }
            >
              <Text
                style={
                  styles.totalValue
                }
              >
                {formatMoney(
                  finalTotal,
                  quote.currency.code,
                )}
              </Text>

              <Text
                style={
                  styles.convertedValue
                }
              >
                ~{' '}
                {formatMoney(
                  convertedTotal,
                  targetCurrency,
                )}
              </Text>
            </View>
          </View>
        </Card>

        <Card index={1}>
          <SectionTitle>
            QUOTE MESSAGE
          </SectionTitle>

          <Text
            style={
              styles.sectionDescription
            }
          >
            Choose the tone for your guest
          </Text>

          <View
            style={
              styles.toneRow
            }
          >
            {(
              [
                'friendly',
                'formal',
                'casual',
              ] as const
            ).map(option => (
              <AnimatedButton
                key={option}
                onPress={() =>
                  setTone(option)
                }
                style={[
                  styles.toneButton,
                  tone === option &&
                    styles.toneActive,
                ]}
              >
                <Text
                  style={[
                    styles.toneText,
                    tone === option &&
                      styles.toneActiveText,
                  ]}
                >
                  {option
                    .charAt(0)
                    .toUpperCase() +
                    option.slice(1)}
                </Text>
              </AnimatedButton>
            ))}
          </View>

          <View
            style={
              styles.messageBox
            }
          >
            <View
              style={
                styles.messageHeader
              }
            >
              <Text
                style={
                  styles.messageHeaderText
                }
              >
                LIVE PREVIEW
              </Text>

              <View
                style={
                  styles.messageLiveDot
                }
              />
            </View>

            <Text
              style={[
                styles.messageText,
                finalTotal <= 0 &&
                  styles.messagePlaceholder,
              ]}
            >
              {message}
            </Text>
          </View>

          <View
            style={
              styles.actionRow
            }
          >
            <AnimatedButton
              onPress={
                copyMessage
              }
              style={
                styles.copyButton
              }
            >
              <MaterialCommunityIcons
                name="content-copy"
                size={18}
                color="#364039"
              />

              <Text
                style={
                  styles.copyButtonText
                }
              >
                Copy
              </Text>
            </AnimatedButton>

            <AnimatedButton
              onPress={
                openWhatsApp
              }
              style={
                styles.whatsappButton
              }
            >
              <MaterialCommunityIcons
                name="whatsapp"
                size={20}
                color="#FFFFFF"
              />

              <Text
                style={
                  styles.whatsappButtonText
                }
              >
                WhatsApp
              </Text>
            </AnimatedButton>

            <AnimatedButton
              onPress={
                openEmail
              }
              style={
                styles.emailButton
              }
            >
              <MaterialCommunityIcons
                name="email-outline"
                size={20}
                color="#FFFFFF"
              />

              <Text
                style={
                  styles.emailButtonText
                }
              >
                Email
              </Text>
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

  const renderCurrentTab =
    () => {
      switch (
        activeTab
      ) {
        case 'rooms':
          return renderRoomsTab();

        case 'pricing':
          return renderPricingTab();

        case 'quote':
          return renderQuoteTab();

        case 'stay':
        default:
          return renderStayTab();
      }
    };

  return (
    <SafeAreaView
      style={styles.screen}
      edges={['top']}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >
        <ScrollView
          contentContainerStyle={
            styles.content
          }
          showsVerticalScrollIndicator={
            false
          }
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={
              styles.header
            }
          >
            <View
              style={
                styles.brandRow
              }
            >
              <AnimatedLogo />

              <View>
                <Text
                  style={
                    styles.brandTitle
                  }
                >
                  Quote Generator
                </Text>

                <Text
                  style={
                    styles.brandSubtitle
                  }
                >
                  HOSPITALITY SUITE
                </Text>
              </View>
            </View>

            <View
              style={
                styles.headerStatus
              }
            >
              <View
                style={
                  styles.statusDot
                }
              />

              <Text
                style={
                  styles.statusText
                }
              >
                READY
              </Text>
            </View>
          </View>

          <AnimatedHeading />

          <View
            style={
              styles.tabsContainer
            }
          >
            <TabBar
              activeTab={
                activeTab
              }
              onTabPress={
                handleTabPress
              }
            />
          </View>

          <View>
            {renderCurrentTab()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <CalendarModal
        visible={
          calendarVisible
        }
        field={
          calendarField
        }
        checkIn={
          quote.checkIn
        }
        checkOut={
          quote.checkOut
        }
        onClose={
          closeCalendar
        }
        onSelect={
          handleCalendarSelect
        }
      />

      <Modal
        visible={
          currencyModal
        }
        transparent
        animationType="slide"
        onRequestClose={() =>
          setCurrencyModal(
            false,
          )
        }
      >
        <View
          style={
            styles.modalOverlay
          }
        >
          <View
            style={
              styles.currencyModal
            }
          >
            <View
              style={
                styles.modalHeader
              }
            >
              <View>
                <Text
                  style={
                    styles.modalTitle
                  }
                >
                  Display Currency
                </Text>

                <Text
                  style={
                    styles.modalSubtitle
                  }
                >
                  Choose the currency for your quote
                </Text>
              </View>

              <Pressable
                onPress={() =>
                  setCurrencyModal(
                    false,
                  )
                }
                style={
                  styles.modalClose
                }
              >
                <Text
                  style={
                    styles.modalCloseText
                  }
                >
                  ×
                </Text>
              </Pressable>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={
                false
              }
            >
              {CURRENCIES.map(
                currency => {
                  const selected =
                    targetCurrency ===
                    currency.code;

                  return (
                    <Pressable
                      key={
                        currency.code
                      }
                      onPress={() =>
                        selectCurrency(
                          currency.code,
                        )
                      }
                      style={[
                        styles.currencyOption,
                        selected &&
                          styles.currencyOptionActive,
                      ]}
                    >
                      <View
                        style={
                          styles.currencySymbolBox
                        }
                      >
                        <Text
                          style={
                            styles.currencySymbol
                          }
                        >
                          {
                            currency.symbol
                          }
                        </Text>
                      </View>

                      <View
                        style={
                          styles.currencyOptionContent
                        }
                      >
                        <Text
                          style={
                            styles.currencyCode
                          }
                        >
                          {
                            currency.code
                          }
                        </Text>

                        <Text
                          style={
                            styles.currencyName
                          }
                        >
                          {
                            currency.name
                          }
                        </Text>
                      </View>

                      {selected && (
                        <View
                          style={
                            styles.selectedCheck
                          }
                        >
                          <MaterialCommunityIcons
                            name="check"
                            size={16}
                            color="#FFFFFF"
                          />
                        </View>
                      )}
                    </Pressable>
                  );
                },
              )}
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
        <AnimatedButton
          onPress={onPress}
          style={styles.backOnlyButton}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={19}
            color="#16733F"
          />

          <Text style={styles.backButtonText}>
            {label}
          </Text>
        </AnimatedButton>
      </View>
    );
  }

  return (
    <View style={styles.navigationButtons}>
      {showBack && onBack && (
        <AnimatedButton
          onPress={onBack}
          style={styles.backButton}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={19}
            color="#16733F"
          />

          <Text style={styles.backButtonText}>
            Back
          </Text>
        </AnimatedButton>
      )}

      <AnimatedButton
        onPress={onPress}
        style={[
          styles.nextButton,
          showBack &&
            styles.nextButtonWithBack,
        ]}
      >
        <Text style={styles.nextButtonText}>
          {label}
        </Text>

        <MaterialCommunityIcons
          name="arrow-right"
          size={21}
          color="#FFFFFF"
        />
      </AnimatedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  screen: {
    flex: 1,
    backgroundColor: '#F2F7F4',
  },

  content: {
    paddingBottom: 25,
  },

  header: {
    minHeight: 74,
    paddingHorizontal: 18,
    paddingVertical: 13,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5ECE7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#10291D',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },

  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#16733F',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
    shadowColor: '#16733F',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 5,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },

  brandTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#102119',
  },

  brandSubtitle: {
    fontSize: 8,
    fontWeight: '800',
    color: '#8A9690',
    marginTop: 3,
    letterSpacing: 1.2,
  },

  headerStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#EFF8F2',
    borderWidth: 1,
    borderColor: '#DCEFE3',
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1B9A55',
    marginRight: 5,
  },

  statusText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#16733F',
    letterSpacing: 0.7,
  },

  headingContainer: {
    paddingHorizontal: 18,
    paddingTop: 26,
    paddingBottom: 15,
  },

  headingAccent: {
    width: 34,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1B7A43',
    marginBottom: 11,
  },

  pageTitle: {
    fontSize: 29,
    fontWeight: '900',
    color: '#101714',
    letterSpacing: -0.8,
  },

  pageSubtitle: {
    marginTop: 7,
    fontSize: 12,
    lineHeight: 19,
    fontWeight: '500',
    color: '#7B8781',
    maxWidth: 350,
  },

  tabsContainer: {
    paddingHorizontal: 16,
    marginBottom: 18,
  },

  tabBar: {
    minHeight: 72,
    borderRadius: 23,
    backgroundColor: '#E6EEE9',
    padding: 5,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#DCE6E0',
    shadowColor: '#10291D',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },

  tabPressable: {
    flex: 1,
    minWidth: 0,
  },

  tabItem: {
    flex: 1,
    minWidth: 0,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 4,
  },

  tabItemActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#10291D',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 9,
    elevation: 4,
  },

  tabIcon: {
    marginRight: 4,
  },

  tabTextContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  tabNumber: {
    fontSize: 7,
    fontWeight: '900',
    color: '#92A098',
    letterSpacing: 0.6,
    marginBottom: 2,
  },

  tabNumberActive: {
    color: '#1B7A43',
  },

  tabLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#76837C',
  },

  tabLabelActive: {
    color: '#10291D',
    fontWeight: '900',
  },

  card: {
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E3EBE6',
    shadowColor: '#10291D',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.055,
    shadowRadius: 17,
    elevation: 3,
  },

  sectionTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },

  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  sectionHeaderContent: {
    flex: 1,
    paddingRight: 10,
  },

  sectionLabel: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.15,
    color: '#718078',
    marginBottom: 5,
  },

  sectionDescription: {
    fontSize: 10,
    color: '#9AA49F',
    lineHeight: 15,
  },

  stepBadge: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#EFF8F2',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D9EDDF',
    marginLeft: 8,
  },

  stepBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#1B7A43',
  },

  fieldLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#65716B',
    marginBottom: 7,
  },

  twoColumns: {
    flexDirection: 'row',
    gap: 10,
  },

  halfColumn: {
    flex: 1,
    minWidth: 0,
  },

  input: {
    minHeight: 51,
    backgroundColor: '#F7FAF8',
    borderWidth: 1,
    borderColor: '#E0E8E3',
    borderRadius: 14,
    paddingHorizontal: 14,
    color: '#111815',
    fontSize: 13,
    fontWeight: '600',
  },

  dateInput: {
    minHeight: 51,
    backgroundColor: '#F7FAF8',
    borderWidth: 1,
    borderColor: '#E0E8E3',
    borderRadius: 14,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dateText: {
    flex: 1,
    fontSize: 12,
    color: '#16201B',
    fontWeight: '700',
  },

  placeholderText: {
    flex: 1,
    fontSize: 12,
    color: '#98A39D',
    fontWeight: '500',
  },

  disabledInput: {
    opacity: 0.42,
  },

  stayInfoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: '#EFF8F2',
    borderWidth: 1,
    borderColor: '#DCEFE3',
  },

  stayInfoIcon: {
    marginRight: 7,
  },

  stayInfoText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#267347',
  },

  counterRow: {
    minHeight: 63,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  counterInfo: {
    flex: 1,
  },

  counterLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#17201B',
  },

  counterHint: {
    fontSize: 9,
    color: '#99A39E',
    marginTop: 3,
  },

  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },

  counterButton: {
    width: 37,
    height: 37,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DCE5DF',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },

  counterButtonDisabled: {
    opacity: 0.28,
  },

  counterButtonText: {
    fontSize: 21,
    color: '#16733F',
    lineHeight: 22,
    fontWeight: '600',
  },

  counterValue: {
    width: 34,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '900',
    color: '#142019',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEF2EF',
    marginVertical: 2,
  },

  guestTotalBar: {
    marginTop: 12,
    paddingHorizontal: 13,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: '#F8FAF9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  guestTotalLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#7A8680',
  },

  guestTotalValue: {
    fontSize: 14,
    fontWeight: '900',
    color: '#1B7A43',
  },

  addRoomButton: {
    minHeight: 40,
    paddingHorizontal: 13,
    borderRadius: 12,
    backgroundColor: '#EFF8F2',
    borderWidth: 1,
    borderColor: '#CFE8D8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addRoomText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#16733F',
  },

  roomBox: {
    backgroundColor: '#F7FAF8',
    borderWidth: 1,
    borderColor: '#E0E8E3',
    borderRadius: 17,
    padding: 15,
    marginBottom: 11,
  },

  roomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  roomNumber: {
    width: 39,
    height: 39,
    borderRadius: 13,
    backgroundColor: '#173C29',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  roomNumberText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  roomHeaderTitle: {
    flex: 1,
  },

  roomTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#17201B',
  },

  roomSubtitle: {
    fontSize: 9,
    color: '#929C96',
    marginTop: 2,
  },

  deleteButton: {
    paddingHorizontal: 8,
    paddingVertical: 7,
  },

  deleteText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#E34A4A',
  },

  rateAppliesLabel: {
    marginTop: 15,
  },

  toggleRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },

  toggleButton: {
    flex: 1,
    minWidth: 0,
    height: 44,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DCE5DF',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  toggleActive: {
    backgroundColor: '#E9F6EE',
    borderColor: '#1B7A43',
  },

  toggleText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#66716C',
    textAlign: 'center',
  },

  toggleActiveText: {
    color: '#16733F',
    fontWeight: '900',
  },

  roomTotalPreview: {
    marginHorizontal: 16,
    marginBottom: 14,
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderRadius: 18,
    backgroundColor: '#10291D',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  previewCaption: {
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1,
    color: '#8FA99A',
    marginBottom: 4,
  },

  previewAmount: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  previewNights: {
    fontSize: 10,
    fontWeight: '800',
    color: '#A5C4B1',
  },

  smallToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  smallToggle: {
    minWidth: 52,
    height: 36,
    paddingHorizontal: 13,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DCE5DF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginRight: 7,
  },

  taxLabelSpace: {
    height: 36,
    justifyContent: 'center',
    marginBottom: 8,
  },

  percentBadgeText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#1B7A43',
    letterSpacing: 1,
  },

  pricingPreviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  pricingPreviewAmount: {
    fontSize: 24,
    fontWeight: '900',
    color: '#10291D',
  },

  pricingStatus: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: '#EFF8F2',
    borderWidth: 1,
    borderColor: '#DCEFE3',
  },

  pricingStatusText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#1B7A43',
    letterSpacing: 0.7,
  },

  selectBox: {
    minHeight: 51,
    backgroundColor: '#F7FAF8',
    borderWidth: 1,
    borderColor: '#E0E8E3',
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  selectText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#17201B',
  },

  currencyIcon: {
    width: 31,
    height: 31,
    borderRadius: 10,
    backgroundColor: '#EFF8F2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  currencyIconText: {
    color: '#1B7A43',
    fontSize: 13,
    fontWeight: '900',
  },

  exchangeBox: {
    marginTop: 13,
    paddingHorizontal: 13,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: '#EFF8F2',
    borderWidth: 1,
    borderColor: '#DCEFE3',
    flexDirection: 'row',
    alignItems: 'center',
  },

  exchangeIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  exchangeContent: {
    flex: 1,
  },

  exchangeCaption: {
    fontSize: 7,
    fontWeight: '900',
    letterSpacing: 1,
    color: '#7B9485',
    marginBottom: 2,
  },

  exchangeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#17201B',
  },

  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  summaryIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: '#173C29',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
    elevation: 4,
  },

  summaryHeaderText: {
    flex: 1,
  },

  summaryTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#17201B',
  },

  summarySubtitle: {
    fontSize: 10,
    color: '#89938E',
    marginTop: 3,
  },

  summaryCheck: {
    width: 29,
    height: 29,
    borderRadius: 10,
    backgroundColor: '#EAF6EE',
    alignItems: 'center',
    justifyContent: 'center',
  },

  breakdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 11,
  },

  nightBadge: {
    backgroundColor: '#EFF8F2',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DCEFE3',
  },

  nightBadgeText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#1B7A43',
    letterSpacing: 0.5,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  summaryRowLabel: {
    fontSize: 11,
    color: '#737E78',
    fontWeight: '500',
  },

  summaryRowValue: {
    fontSize: 12,
    fontWeight: '800',
    color: '#18211C',
  },

  totalBox: {
    marginTop: 15,
    paddingHorizontal: 17,
    paddingVertical: 17,
    borderRadius: 18,
    backgroundColor: '#10291D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 6,
  },

  totalLabel: {
    fontSize: 13,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },

  totalCaption: {
    fontSize: 8,
    color: '#8FA99A',
    marginTop: 4,
  },

  totalRight: {
    alignItems: 'flex-end',
    maxWidth: '60%',
  },

  totalValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'right',
  },

  convertedValue: {
    fontSize: 10,
    color: '#9FC1AD',
    textAlign: 'right',
    marginTop: 4,
    fontWeight: '600',
  },

  toneRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 13,
    marginBottom: 13,
  },

  toneButton: {
    flex: 1,
    minWidth: 0,
    height: 42,
    paddingHorizontal: 6,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#DDE5E0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7FAF8',
  },

  toneActive: {
    backgroundColor: '#1B7A43',
    borderColor: '#1B7A43',
    elevation: 3,
  },

  toneText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#737D78',
    textAlign: 'center',
  },

  toneActiveText: {
    color: '#FFFFFF',
    fontWeight: '900',
  },

  messageBox: {
    backgroundColor: '#F7FAF8',
    padding: 14,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E0E8E3',
    marginBottom: 13,
    minHeight: 125,
  },

  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
  },

  messageHeaderText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#8A958F',
    letterSpacing: 1,
  },

  messageLiveDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#1B9A55',
    marginLeft: 6,
  },

  messageText: {
    fontSize: 12,
    color: '#35413A',
    lineHeight: 19,
    fontWeight: '500',
  },

  messagePlaceholder: {
    color: '#99A39E',
    fontStyle: 'italic',
  },

  actionRow: {
    flexDirection: 'row',
    gap: 7,
    width: '100%',
  },

  copyButton: {
    flex: 1,
    minWidth: 0,
    height: 46,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCE5DF',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  copyButtonText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#364039',
    marginLeft: 5,
  },

  whatsappButton: {
    flex: 1.35,
    minWidth: 0,
    height: 46,
    backgroundColor: '#25D366',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 4,
  },

  whatsappButtonText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFFFFF',
    marginLeft: 5,
  },

  emailButton: {
    flex: 1,
    minWidth: 0,
    height: 46,
    backgroundColor: '#1B7A43',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 4,
  },

  emailButtonText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFFFFF',
    marginLeft: 5,
  },

  navigationButtons: {
    marginHorizontal: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },

  backButton: {
    height: 54,
    paddingHorizontal: 16,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCE5DF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#10291D',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 7,
    elevation: 2,
  },

  backOnlyButton: {
    flex: 1,
    height: 54,
    paddingHorizontal: 18,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCE5DF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#10291D',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 7,
    elevation: 2,
  },

  backButtonText: {
    color: '#364039',
    fontSize: 11,
    fontWeight: '900',
    marginLeft: 5,
  },

  nextButton: {
    flex: 1,
    minHeight: 54,
    borderRadius: 17,
    backgroundColor: '#16733F',
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#16733F',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },

  nextButtonWithBack: {
    flex: 1,
  },

  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },

  calendarOverlay: {
    flex: 1,
    backgroundColor:
      'rgba(7, 23, 15, 0.48)',
    justifyContent: 'flex-end',
  },

  calendarSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 28,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 15,
  },

  calendarTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 19,
  },

  calendarEyebrow: {
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1.2,
    color: '#7B8A82',
    marginBottom: 4,
  },

  calendarSelectedText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#10291D',
  },

  calendarClose: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: '#F2F7F4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  calendarCloseText: {
    fontSize: 25,
    color: '#59675F',
    lineHeight: 27,
  },

  monthNavigation: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 7,
  },

  monthTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#17201B',
  },

  monthButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EFF8F2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  monthButtonDisabled: {
    opacity: 0.3,
  },

  weekRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },

  weekText: {
    width: '14.2857%',
    textAlign: 'center',
    fontSize: 8,
    fontWeight: '900',
    color: '#98A39D',
    letterSpacing: 0.4,
  },

  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  calendarDay: {
    width: '14.2857%',
    height: 49,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  calendarDateButton: {
    width: 39,
    height: 39,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },

  calendarDateText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#26332C',
  },

  calendarDateSelected: {
    backgroundColor: '#16733F',
    shadowColor: '#16733F',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 3,
  },

  calendarDateTextSelected: {
    color: '#FFFFFF',
    fontWeight: '900',
  },

  calendarDateDisabled: {
    opacity: 0.27,
  },

  calendarDateTextDisabled: {
    color: '#89938D',
  },

  calendarToday: {
    borderWidth: 1.5,
    borderColor: '#1B7A43',
  },

  calendarRange: {
    backgroundColor: '#E9F6EE',
    borderRadius: 0,
  },

  todayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1B7A43',
    position: 'absolute',
    bottom: 2,
  },

  rangeMarker: {
    position: 'absolute',
    bottom: 3,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },

  calendarLegend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginTop: 13,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: '#EEF2EF',
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  legendDotSelected: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#16733F',
    marginRight: 6,
  },

  legendDotToday: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    borderWidth: 1.5,
    borderColor: '#1B7A43',
    marginRight: 6,
  },

  legendText: {
    fontSize: 9,
    color: '#7F8B85',
    fontWeight: '600',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor:
      'rgba(10, 25, 18, 0.45)',
    justifyContent: 'flex-end',
  },

  currencyModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 28,
    maxHeight: '75%',
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#152019',
  },

  modalSubtitle: {
    fontSize: 10,
    color: '#8B9690',
    marginTop: 4,
  },

  modalClose: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#F2F7F4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalCloseText: {
    fontSize: 24,
    color: '#526059',
    lineHeight: 26,
  },

  currencyOption: {
    minHeight: 65,
    borderRadius: 15,
    paddingHorizontal: 11,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E4EBE6',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  currencyOptionActive: {
    backgroundColor: '#EFF8F2',
    borderColor: '#BFDCC9',
  },

  currencySymbolBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F2F7F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  currencySymbol: {
    fontSize: 15,
    fontWeight: '900',
    color: '#1B7A43',
  },

  currencyOptionContent: {
    flex: 1,
  },

  currencyCode: {
    fontSize: 13,
    fontWeight: '900',
    color: '#18211C',
  },

  currencyName: {
    fontSize: 9,
    color: '#8C9791',
    marginTop: 3,
  },

  selectedCheck: {
    width: 27,
    height: 27,
    borderRadius: 9,
    backgroundColor: '#1B7A43',
    alignItems: 'center',
    justifyContent: 'center',
  },

  finalSuccessCard: {
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 15,
    borderRadius: 17,
    backgroundColor: '#EFF8F2',
    borderWidth: 1,
    borderColor: '#DCEFE3',
    flexDirection: 'row',
    alignItems: 'center',
  },

  finalSuccessIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#16733F',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  finalSuccessContent: {
    flex: 1,
  },

  finalSuccessTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#173C29',
  },

  finalSuccessText: {
    fontSize: 9,
    lineHeight: 14,
    color: '#6F8277',
    marginTop: 3,
  },

  footer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
  },

  footerLine: {
    width: 35,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#CFE1D6',
    marginBottom: 10,
  },

  footerText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#8C9892',
    letterSpacing: 0.9,
    textAlign: 'center',
  },

  footerSubtext: {
    fontSize: 9,
    color: '#A6AEA9',
    marginTop: 4,
  },

  bottomSpace: {
    height: 35,
  },
});
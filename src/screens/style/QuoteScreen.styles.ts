import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  screen: {
    flex: 1,
    backgroundColor: '#F2F7F4',
  },

  content: {
    paddingBottom: 24,
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
    display: 'none',
  },

  tabBar: {
    minHeight: 64,
    marginHorizontal: 16,
    marginVertical: 6,
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#151C18',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#07100B',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 8,
  },

  tabPressable: {
    flex: 1,
    minWidth: 0,
    borderRadius: 16,
    overflow: 'hidden',
  },

  tabItem: {
    flex: 1,
    minWidth: 0,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingVertical: 6,
    paddingHorizontal: 2,
    marginHorizontal: 2,
  },

  tabItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(27, 122, 67, 0.45)',
  },

  tabIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginBottom: 3,
    backgroundColor: 'transparent',
    lineHeight: 32,
  },

  tabIconActive: {
    backgroundColor: '#16733F',
    color: '#FFFFFF',
    shadowColor: '#16733F',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },

  tabTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabNumber: {
    fontSize: 8,
    fontWeight: '800',
    color: '#6E7C74',
    letterSpacing: 0.5,
    marginBottom: 1,
  },

  tabNumberActive: {
    color: '#5ED895',
  },

  tabLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#909F96',
    textAlign: 'center',
    letterSpacing: 0.1,
  },

  tabLabelActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  bottomTabBar: {
    backgroundColor: '#F2F7F4',
    paddingTop: 2,
    paddingBottom: Platform.OS === 'ios' ? 12 : 8,
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
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: '#16733F',
    borderWidth: 1,
    borderColor: '#16733F',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#16733F',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },

  addRoomText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  roomBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE8E1',
    borderRadius: 18,
    padding: 16,
    marginBottom: 11,
    shadowColor: '#10291D',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
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
    minWidth: 72,
    height: 36,
    paddingHorizontal: 10,
    borderRadius: 11,
    backgroundColor: '#FFF4F4',
    borderWidth: 1,
    borderColor: '#F3D4D4',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
  },

  deleteText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#D64545',
  },

  roomGuestHeader: {
    marginTop: 16,
    marginBottom: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  roomGuestHeaderText: {
    flex: 1,
    paddingRight: 10,
  },

  roomGuestHint: {
    fontSize: 9,
    color: '#8E9993',
    marginTop: -3,
  },

  roomGuestBadge: {
    minWidth: 42,
    height: 32,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: '#EFF8F2',
    borderWidth: 1,
    borderColor: '#D6EBDD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  roomGuestBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#16733F',
  },

  roomGuestRow: {
    flexDirection: 'row',
    gap: 9,
    marginBottom: 2,
  },

  roomGuestCounter: {
    flex: 1,
    minWidth: 0,
    minHeight: 58,
    paddingHorizontal: 9,
    paddingVertical: 8,
    borderRadius: 13,
    backgroundColor: '#F7FAF8',
    borderWidth: 1,
    borderColor: '#E0E8E3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  roomGuestLabelWrap: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  roomGuestLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#536159',
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


  todayButton: {
  alignSelf: 'center',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  paddingHorizontal: 16,
  paddingVertical: 8,
  marginTop: 4,
  marginBottom: 10,
  borderRadius: 20,
  backgroundColor: '#E8F4EC',
  borderWidth: 1,
  borderColor: '#C8E2D1',
},

todayButtonText: {
  fontSize: 13,
  fontWeight: '800',
  color: '#1B7A43',
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
    height: 48,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCE5DF',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  copyButtonText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#364039',
    marginLeft: 6,
  },

  whatsappButton: {
    flex: 1.25,
    minWidth: 0,
    height: 48,
    backgroundColor: '#25D366',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 3,
  },

  whatsappButtonText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
    marginLeft: 6,
  },

  emailButton: {
    flex: 1,
    minWidth: 0,
    height: 48,
    backgroundColor: '#1B7A43',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 3,
  },

  emailButtonText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
    marginLeft: 6,
  },

navigationButtons: {
  marginHorizontal: 16,
  marginTop: 2,
  marginBottom: 2,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
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
    height: 50,
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
    minHeight: 50,
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

roomsContainer: {
  flex: 1,
},

roomsListContent: {
  paddingBottom: 6,
},

stickyRoomsFooter: {
  backgroundColor: '#F7FAF8',
  borderTopWidth: 1,
  borderTopColor: '#E1EAE4',
  paddingHorizontal: 16,
  paddingTop: 8,
},

// Room & Guest Allocation Table / Breakdown in Quote Summary
quoteRoomsSection: {
  marginTop: 18,
  marginBottom: 8,
},

quoteRoomsSectionHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 10,
},

quoteRoomsSectionTitle: {
  fontSize: 10,
  fontWeight: '900',
  letterSpacing: 1.15,
  color: '#718078',
},

quoteRoomCard: {
  backgroundColor: '#F8FAF9',
  borderWidth: 1,
  borderColor: '#E2EBE5',
  borderRadius: 14,
  padding: 12,
  marginBottom: 10,
},

quoteRoomTopRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 6,
},

quoteRoomTitleRow: {
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
},

quoteRoomBadge: {
  backgroundColor: '#16733F',
  borderRadius: 7,
  paddingHorizontal: 6,
  paddingVertical: 3,
  marginRight: 8,
},

quoteRoomBadgeText: {
  fontSize: 9,
  fontWeight: '900',
  color: '#FFFFFF',
},

quoteRoomName: {
  fontSize: 12,
  fontWeight: '800',
  color: '#18211C',
  flex: 1,
},

quoteRoomSubtotal: {
  fontSize: 13,
  fontWeight: '900',
  color: '#16733F',
},

quoteRoomDetailRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 4,
},

quoteRoomGuestsWrap: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
},

quoteGuestPill: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#EFF8F2',
  borderWidth: 1,
  borderColor: '#D4EAD9',
  borderRadius: 8,
  paddingHorizontal: 7,
  paddingVertical: 3,
  gap: 4,
},

quoteGuestPillText: {
  fontSize: 10,
  fontWeight: '800',
  color: '#16733F',
},

quoteRoomPricingCalc: {
  fontSize: 10,
  fontWeight: '600',
  color: '#7E8B84',
},

quoteRoomDivider: {
  height: 1,
  backgroundColor: '#E7EFEA',
  marginVertical: 14,
},
});



export default styles


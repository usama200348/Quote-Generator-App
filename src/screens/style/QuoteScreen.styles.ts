import { Platform, StyleSheet } from 'react-native';

export const COLORS = {
  screenBg: '#F2F7F4',
  barBg: '#151C18',
  accent: '#16733F',
  labelIdle: '#9BA8A0',
  white: '#FFFFFF',
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  screen: {
    flex: 1,
    backgroundColor: '#F2F7F4',
  },

  content: {
    paddingBottom: 28,
  },

  // -------------------------------------------------------------
  // Header & Brand
  // -------------------------------------------------------------
  header: {
    minHeight: 70,
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5ECE7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#10291D',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#16733F',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#16733F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },

  brandTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#102119',
    letterSpacing: -0.2,
  },

  brandSubtitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#718078',
    marginTop: 2,
    letterSpacing: 1.1,
  },

  headerStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
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
    backgroundColor: '#16A34A',
    marginRight: 6,
  },

  statusText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#16733F',
    letterSpacing: 0.5,
  },

  // -------------------------------------------------------------
  // Heading
  // -------------------------------------------------------------
  headingContainer: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 14,
  },

  headingAccent: {
    width: 34,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#16733F',
    marginBottom: 8,
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#101714',
    letterSpacing: -0.6,
  },

  pageSubtitle: {
    marginTop: 5,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '500',
    color: '#65736C',
    maxWidth: 360,
  },

  // -------------------------------------------------------------
  // Step Progress Bar (Stay -> Rooms -> Pricing -> Quote)
  // -------------------------------------------------------------
  stepProgressContainer: {
    marginHorizontal: 16,
    marginBottom: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2EBE5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#10291D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },

  stepPressable: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },

  stepPill: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF3F0',
  },

  stepPillActive: {
    backgroundColor: '#16733F',
    shadowColor: '#16733F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },

  stepPillCompleted: {
    backgroundColor: '#EAF6EE',
    borderWidth: 1,
    borderColor: '#C8E8D3',
  },

  stepPillTextActive: {
    fontSize: 11,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  stepPillTextUpcoming: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7C8A82',
  },

  stepLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#718078',
  },

  stepLabelActive: {
    color: '#16733F',
    fontWeight: '900',
  },

  stepDivider: {
    flex: 1,
    height: 2,
    backgroundColor: '#E8EFEA',
    marginHorizontal: 4,
    borderRadius: 1,
  },

  stepDividerCompleted: {
    backgroundColor: '#16733F',
  },

  // -------------------------------------------------------------
  // Bottom Tab Bar (No 01, 02, 03 numbers!)
  // -------------------------------------------------------------
  bottomTabBar: {
    backgroundColor: COLORS.screenBg,
    paddingTop: 6,
    paddingBottom: Platform.OS === 'ios' ? 14 : 10,
    overflow: 'visible',
  },

  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    marginHorizontal: 16,
    borderRadius: 22,
    backgroundColor: COLORS.barBg,
    shadowColor: '#10291D',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    overflow: 'visible',
  },

  tabPressable: {
    flex: 1,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabCircle: {
    position: 'absolute',
    top: -24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.white,
    borderWidth: 5,
    borderColor: COLORS.screenBg,
    shadowColor: '#10291D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },

  tabLabel: {
    position: 'absolute',
    bottom: 8,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.3,
    color: '#FFFFFF',
  },

  tabLabelActive: {
    fontWeight: '700',
    color: COLORS.white,
  },

  // -------------------------------------------------------------
  // Cards & Layout
  // -------------------------------------------------------------
  card: {
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2EBE5',
    shadowColor: '#10291D',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.045,
    shadowRadius: 14,
    elevation: 3,
  },

  sectionTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },

  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  sectionHeaderContent: {
    flex: 1,
    paddingRight: 10,
  },

  sectionLabel: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.1,
    color: '#16733F',
    marginBottom: 3,
  },

  sectionDescription: {
    fontSize: 12,
    color: '#65736C',
    lineHeight: 17,
  },

  stepBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#EFF8F2',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D4EAD9',
    marginLeft: 8,
  },

  stepBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#16733F',
  },

  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2B3830',
    marginBottom: 7,
  },

  twoColumns: {
    flexDirection: 'row',
    gap: 12,
  },

  halfColumn: {
    flex: 1,
  },

  // -------------------------------------------------------------
  // Form Inputs
  // -------------------------------------------------------------
  input: {
    minHeight: 50,
    backgroundColor: '#F8FAF9',
    borderWidth: 1.5,
    borderColor: '#DCE5DF',
    borderRadius: 14,
    paddingHorizontal: 14,
    color: '#111815',
    fontSize: 14,
    fontWeight: '600',
  },

  rateInputContainer: {
    minHeight: 50,
    backgroundColor: '#F8FAF9',
    borderWidth: 1.5,
    borderColor: '#DCE5DF',
    borderRadius: 14,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  currencyPrefix: {
    fontSize: 14,
    fontWeight: '800',
    color: '#16733F',
    marginRight: 6,
  },

  rateTextInput: {
    flex: 1,
    height: 50,
    padding: 0,
    color: '#111815',
    fontSize: 14,
    fontWeight: '600',
  },

  dateInput: {
    minHeight: 50,
    backgroundColor: '#F8FAF9',
    borderWidth: 1.5,
    borderColor: '#DCE5DF',
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dateText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#16201B',
  },

  placeholderText: {
    flex: 1,
    fontSize: 13,
    color: '#95A19B',
    fontWeight: '500',
  },

  disabledInput: {
    opacity: 0.45,
    backgroundColor: '#F2F6F3',
  },

  stayInfoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#EFF8F2',
    borderWidth: 1,
    borderColor: '#D4EAD9',
  },

  stayInfoIcon: {
    marginRight: 8,
  },

  stayInfoText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#16733F',
  },

  // -------------------------------------------------------------
  // Counters (Guests & Rooms)
  // -------------------------------------------------------------
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },

  counterLabelWrap: {
    flex: 1,
  },

  counterLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#16221B',
  },

  counterSubLabel: {
    fontSize: 11,
    color: '#77867E',
    marginTop: 2,
  },

  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    gap: 4,
  },

  counterButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#D4E0D8',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10291D',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },

  counterButtonDisabled: {
    opacity: 0.3,
    borderColor: '#E2EBE5',
    backgroundColor: '#F5F8F6',
  },

  counterButtonText: {
    fontSize: 20,
    color: '#16733F',
    lineHeight: 22,
    fontWeight: '700',
  },

  counterValue: {
    minWidth: 36,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '900',
    color: '#142019',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEF2EF',
    marginVertical: 4,
  },

  guestTotalBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: '#F4F8F5',
    borderWidth: 1,
    borderColor: '#DFEAE2',
  },

  guestTotalLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4B5C52',
  },

  guestTotalValue: {
    fontSize: 16,
    fontWeight: '900',
    color: '#16733F',
  },

  // -------------------------------------------------------------
  // Rooms Tab & Room Items
  // -------------------------------------------------------------
  roomsContainer: {
    flex: 1,
  },

  roomsListContent: {
    paddingBottom: 20,
  },

  addRoomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#16733F',
    borderRadius: 13,
    paddingHorizontal: 14,
    height: 40,
    shadowColor: '#16733F',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },

  addRoomText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  roomBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCE5DF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#10291D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },

  roomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  roomNumber: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#173C29',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  roomNumberText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  roomHeaderTitle: {
    flex: 1,
  },

  roomTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#15201A',
  },

  roomSubtitle: {
    fontSize: 11,
    color: '#7A8880',
    marginTop: 1,
  },

  deleteButton: {
    height: 36,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#FFF2F2',
    borderWidth: 1,
    borderColor: '#FED7D7',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 4,
  },

  deleteText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#DC2626',
  },

  // Quick Room Suggestions
  quickRoomChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },

  quickRoomChip: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#EFF6F1',
    borderWidth: 1,
    borderColor: '#D4EAD9',
  },

  quickRoomChipActive: {
    backgroundColor: '#16733F',
    borderColor: '#16733F',
  },

  quickRoomChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16733F',
  },

  quickRoomChipTextActive: {
    color: '#FFFFFF',
  },

  roomGuestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    marginBottom: 8,
  },

  roomGuestHeaderText: {
    flex: 1,
  },

  roomGuestHint: {
    fontSize: 11,
    color: '#76857D',
    marginTop: 1,
  },

  roomGuestBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EFF8F2',
    borderWidth: 1,
    borderColor: '#D4EAD9',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  roomGuestBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#16733F',
  },

  roomGuestRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },

  roomGuestCounter: {
    flex: 1,
    backgroundColor: '#F8FAF9',
    borderWidth: 1,
    borderColor: '#E2EBE5',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  roomGuestLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginBottom: 8,
  },

  roomGuestLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#28362E',
  },

  roomGuestControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  roomGuestButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#D4E0D8',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10291D',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  roomGuestButtonDisabled: {
    opacity: 0.3,
    borderColor: '#E2EBE5',
    backgroundColor: '#F5F8F6',
  },

  roomGuestButtonText: {
    fontSize: 18,
    color: '#16733F',
    lineHeight: 20,
    fontWeight: '700',
  },

  roomGuestValue: {
    minWidth: 32,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '900',
    color: '#142019',
    marginHorizontal: 4,
  },

  rateAppliesLabel: {
    marginTop: 4,
  },

  toggleRow: {
    flexDirection: 'row',
    gap: 8,
  },

  toggleButton: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F4F7F5',
    borderWidth: 1,
    borderColor: '#DCE5DF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  toggleActive: {
    backgroundColor: '#16733F',
    borderColor: '#16733F',
    shadowColor: '#16733F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },

  toggleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#55655D',
  },

  toggleActiveText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  roomTotalPreview: {
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: '#10291D',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#0A1B13',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },

  previewCaption: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.9,
    color: '#8FA99A',
  },

  previewAmount: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 2,
  },

  previewNights: {
    fontSize: 12,
    fontWeight: '700',
    color: '#A3C8B3',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },

  loadingMoreRoomsContainer: {
    paddingVertical: 14,
    alignItems: 'center',
  },

  loadingMoreRoomsText: {
    color: '#16733F',
    fontWeight: '700',
    fontSize: 13,
  },

  stickyRoomsFooter: {
    backgroundColor: '#F2F7F4',
    borderTopWidth: 1,
    borderTopColor: '#E2EBE5',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },

  // -------------------------------------------------------------
  // Pricing Modifiers Tab
  // -------------------------------------------------------------
  smallToggleRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 8,
  },

  smallToggle: {
    flex: 1,
    height: 34,
    borderRadius: 9,
    backgroundColor: '#F4F7F5',
    borderWidth: 1,
    borderColor: '#DCE5DF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  taxLabelSpace: {
    height: 34,
    justifyContent: 'center',
    marginBottom: 8,
  },

  percentBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#718078',
  },

  pricingPreviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  pricingPreviewAmount: {
    fontSize: 24,
    fontWeight: '900',
    color: '#16733F',
    marginTop: 2,
  },

  pricingStatus: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#EFF8F2',
    borderWidth: 1,
    borderColor: '#D4EAD9',
  },

  pricingStatusText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#16733F',
    letterSpacing: 0.5,
  },

  selectBox: {
    minHeight: 50,
    borderRadius: 14,
    backgroundColor: '#F8FAF9',
    borderWidth: 1.5,
    borderColor: '#DCE5DF',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  selectText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#15201A',
  },

  currencyIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#EFF8F2',
    borderWidth: 1,
    borderColor: '#D4EAD9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  currencyIconText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#16733F',
  },

  exchangeBox: {
    marginTop: 14,
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#EFF8F2',
    borderWidth: 1,
    borderColor: '#D4EAD9',
    flexDirection: 'row',
    alignItems: 'center',
  },

  exchangeIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D4EAD9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  exchangeContent: {
    flex: 1,
  },

  exchangeCaption: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    color: '#16733F',
    marginBottom: 2,
  },

  exchangeText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#132119',
  },

  // -------------------------------------------------------------
  // Quote Summary Tab
  // -------------------------------------------------------------
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  summaryIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#173C29',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    elevation: 3,
  },

  summaryHeaderText: {
    flex: 1,
  },

  summaryTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#17201B',
  },

  summarySubtitle: {
    fontSize: 12,
    color: '#78867E',
    marginTop: 2,
    fontWeight: '500',
  },

  summaryCheck: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#EFF8F2',
    borderWidth: 1,
    borderColor: '#D4EAD9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  quoteRoomsSection: {
    marginTop: 14,
    marginBottom: 6,
  },

  quoteRoomsSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  quoteRoomsSectionTitle: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.1,
    color: '#16733F',
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
    paddingHorizontal: 7,
    paddingVertical: 3,
    marginRight: 8,
  },

  quoteRoomBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  quoteRoomName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#18211C',
    flex: 1,
  },

  quoteRoomSubtotal: {
    fontSize: 14,
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
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 4,
  },

  quoteGuestPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16733F',
  },

  quoteRoomPricingCalc: {
    fontSize: 11,
    fontWeight: '600',
    color: '#77867E',
  },

  quoteRoomDivider: {
    height: 1,
    backgroundColor: '#E7EFEA',
    marginVertical: 14,
  },

  breakdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  nightBadge: {
    backgroundColor: '#EFF8F2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D4EAD9',
  },

  nightBadgeText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#16733F',
    letterSpacing: 0.5,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },

  summaryRowLabel: {
    fontSize: 13,
    color: '#65736C',
    fontWeight: '500',
  },

  summaryRowValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#18211C',
  },

  // Hero Total Box
  totalBox: {
    marginTop: 16,
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#10291D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#071A11',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },

  totalLabel: {
    fontSize: 14,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },

  totalCaption: {
    fontSize: 11,
    color: '#8FA99A',
    marginTop: 3,
  },

  totalRight: {
    alignItems: 'flex-end',
    maxWidth: '65%',
  },

  totalValue: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'right',
  },

  convertedValue: {
    fontSize: 13,
    color: '#9FC1AD',
    textAlign: 'right',
    marginTop: 3,
    fontWeight: '700',
  },

  // Tone & Live Message
  toneRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    marginBottom: 14,
  },

  toneButton: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F3F7F5',
    borderWidth: 1,
    borderColor: '#DCE5DF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  toneActive: {
    backgroundColor: '#16733F',
    borderColor: '#16733F',
  },

  toneText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#55655D',
  },

  toneActiveText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  messageBox: {
    backgroundColor: '#F8FAF9',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#DCE5DF',
    marginBottom: 14,
    minHeight: 120,
  },

  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  messageHeaderText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#718078',
    letterSpacing: 0.8,
  },

  messageLiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
    marginLeft: 6,
  },

  messageText: {
    fontSize: 13,
    color: '#28362F',
    lineHeight: 20,
    fontWeight: '500',
  },

  messagePlaceholder: {
    color: '#929E97',
    fontStyle: 'italic',
  },

  actionRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },

  copyButton: {
    flex: 1,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#DCE5DF',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },

  copyButtonText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#364039',
  },

  whatsappButton: {
    flex: 1.25,
    height: 48,
    backgroundColor: '#25D366',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
    shadowColor: '#25D366',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },

  whatsappButtonText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  emailButton: {
    flex: 1,
    height: 48,
    backgroundColor: '#16733F',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
    shadowColor: '#16733F',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },

  emailButtonText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // -------------------------------------------------------------
  // Navigation Buttons (Next / Back)
  // -------------------------------------------------------------
  navigationButtons: {
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  backButton: {
    height: 52,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#DCE5DF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
    shadowColor: '#10291D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },

  backOnlyButton: {
    flex: 1,
    height: 52,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#DCE5DF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
    shadowColor: '#10291D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },

  backButtonText: {
    color: '#2B3830',
    fontSize: 14,
    fontWeight: '800',
  },

  nextButton: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#16733F',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#16733F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 4,
  },

  nextButtonWithBack: {
    flex: 1,
  },

  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  // -------------------------------------------------------------
  // Calendar Modal
  // -------------------------------------------------------------
  calendarOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 25, 17, 0.45)',
    justifyContent: 'flex-end',
  },

  calendarSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
  },

  calendarTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },

  calendarEyebrow: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.1,
    color: '#16733F',
  },

  calendarSelectedText: {
    fontSize: 17,
    fontWeight: '900',
    color: '#111815',
    marginTop: 3,
  },

  calendarClose: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F6F4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  calendarCloseText: {
    fontSize: 22,
    color: '#55655D',
    lineHeight: 24,
    fontWeight: '600',
  },

  monthNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingHorizontal: 4,
  },

  monthTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#121F17',
  },

  monthButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EFF8F2',
    borderWidth: 1,
    borderColor: '#D4EAD9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  monthButtonDisabled: {
    opacity: 0.35,
    backgroundColor: '#F5F8F6',
    borderColor: '#E2EBE5',
  },

  todayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: '#EFF8F2',
    borderWidth: 1,
    borderColor: '#D4EAD9',
  },

  todayButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#16733F',
  },

  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF3F0',
    paddingBottom: 8,
  },

  weekText: {
    width: 38,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '800',
    color: '#7E8E84',
    letterSpacing: 0.5,
  },

  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  calendarDay: {
    width: '14.28%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 2,
  },

  calendarDateButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },

  calendarDateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C2921',
  },

  calendarDateSelected: {
    backgroundColor: '#16733F',
    shadowColor: '#16733F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },

  calendarDateTextSelected: {
    color: '#FFFFFF',
    fontWeight: '900',
  },

  calendarDateDisabled: {
    opacity: 0.28,
  },

  calendarDateTextDisabled: {
    color: '#A0ACA5',
  },

  calendarToday: {
    borderWidth: 1.5,
    borderColor: '#16733F',
  },

  calendarRange: {
    backgroundColor: '#EFF8F2',
    borderRadius: 6,
  },

  todayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#16733F',
    position: 'absolute',
    bottom: 3,
  },

  rangeMarker: {
    position: 'absolute',
    bottom: 2,
    width: 14,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#16733F',
  },

  calendarLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEF3F0',
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  legendDotSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#16733F',
  },

  legendDotToday: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#16733F',
  },

  legendText: {
    fontSize: 12,
    color: '#65736C',
    fontWeight: '600',
  },

  // -------------------------------------------------------------
  // Currency Modal
  // -------------------------------------------------------------
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 25, 17, 0.45)',
    justifyContent: 'flex-end',
  },

  currencyModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
    maxHeight: '75%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
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
    fontSize: 12,
    color: '#76857D',
    marginTop: 2,
  },

  modalClose: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F6F4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalCloseText: {
    fontSize: 22,
    color: '#55655D',
    lineHeight: 24,
    fontWeight: '600',
  },

  currencyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginBottom: 8,
    backgroundColor: '#F8FAF9',
    borderWidth: 1,
    borderColor: '#E2EBE5',
  },

  currencyOptionActive: {
    backgroundColor: '#EFF8F2',
    borderColor: '#C8E8D3',
  },

  currencySymbolBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCE5DF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  currencySymbol: {
    fontSize: 16,
    fontWeight: '900',
    color: '#16733F',
  },

  currencyOptionContent: {
    flex: 1,
  },

  currencyCode: {
    fontSize: 15,
    fontWeight: '800',
    color: '#15201A',
  },

  currencyName: {
    fontSize: 12,
    color: '#718078',
    marginTop: 2,
  },

  selectedCheck: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#16733F',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // -------------------------------------------------------------
  // Miscellaneous / Status
  // -------------------------------------------------------------
  finalSuccessCard: {
    backgroundColor: '#EFF8F2',
    borderWidth: 1,
    borderColor: '#D4EAD9',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  finalSuccessIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#16733F',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  finalSuccessContent: {
    flex: 1,
  },

  finalSuccessTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#16733F',
  },

  finalSuccessText: {
    fontSize: 12,
    color: '#4B5C52',
    marginTop: 2,
  },

  footer: {
    paddingVertical: 18,
    alignItems: 'center',
  },

  footerLine: {
    width: 36,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#DDE6E0',
    marginBottom: 8,
  },

  footerText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#76857D',
  },

  footerSubtext: {
    fontSize: 11,
    color: '#9AA69F',
    marginTop: 2,
  },

  bottomSpace: {
    height: 30,
  },
});

export default styles;

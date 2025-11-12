import { useBottomSheetStore } from '@/store/useBottomSheetStore';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function GlobalBottomSheet() {
  const sheetRef = useRef<BottomSheet>(null);
  const {
    isGlobalBottomSheetOpen,
    content,
    header,
    footer,
    closeGlobalBottomSheet,
    snaps = []
  } = useBottomSheetStore();

  // const snapPoints = useMemo(() => ['25%'], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        onClose={closeGlobalBottomSheet}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    [closeGlobalBottomSheet]
  );

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (isGlobalBottomSheetOpen) {
      sheetRef.current?.expand();
    } else {
      sheetRef.current?.close();
    }
  }, [isGlobalBottomSheetOpen, sheetRef]);

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snaps}
      enableOverDrag
      enableDynamicSizing={snaps.length === 0}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      // onChange={handleSheetChange}
      // handleIndicatorStyle={{ borderRadius: 20 }}
      onClose={closeGlobalBottomSheet}
      // handleComponent={null}
    >
      {/* <View className="flex-1" style={{ paddingBottom: insets.bottom }}> */}
      {header}

      <BottomSheetScrollView>
        <View style={{ paddingBottom: footer ? 0 : insets.bottom }} className="flex-1">
          {content}
        </View>
      </BottomSheetScrollView>

      <View style={{ paddingBottom: footer ? insets.bottom : 0 }}>{footer}</View>
      {/* </View> */}
    </BottomSheet>
  );
}

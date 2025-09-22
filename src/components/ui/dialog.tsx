import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { View } from 'react-native';

import { Button, Text } from '@/components/ui';

export type DialogRef = {
  present: () => void;
  dismiss: () => void;
};

export const Dialog = forwardRef<DialogRef, any>(
  (
    {
      title,
      children,
      confirmText = 'Xác nhận',
      cancelText = 'Huỷ',
      onConfirm,
      onCancel,
    },
    ref
  ) => {
    const modalRef = useRef<BottomSheetModal>(null);

    useImperativeHandle(ref, () => ({
      present: () => modalRef.current?.present(),
      dismiss: () => modalRef.current?.dismiss(),
    }));

    return (
      <BottomSheetModal
        ref={modalRef}
        snapPoints={['30%']}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
      >
        <View className="p-4">
          {title && <Text className="mb-2 text-lg font-bold">{title}</Text>}
          {children}
          <View className="mt-4 flex-row justify-end gap-3">
            <Button
              label={cancelText}
              onPress={() => {
                modalRef.current?.dismiss();
                onCancel?.();
              }}
            />
            <Button
              label={confirmText}
              onPress={() => {
                modalRef.current?.dismiss();
                onConfirm?.();
              }}
            />
          </View>
        </View>
      </BottomSheetModal>
    );
  }
);

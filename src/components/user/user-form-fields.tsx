import React from 'react';
import type { Control, FieldErrors } from 'react-hook-form';

import { ControlledInput, ControlledSelect, View } from '@/components/ui';
import { translate } from '@/lib';
import type { FormData } from '@/types';

const genderOptions = [
  { label: translate('new_user.gender.male'), value: 'male' },
  { label: translate('new_user.gender.female'), value: 'female' },
  { label: translate('new_user.gender.other'), value: 'other' },
];

interface UserFormFieldsProps {
  control: Control<FormData>;
  errors?: FieldErrors<FormData>;
  isEdit?: boolean;
  disabled?: boolean;
}

export function UserFormFields({
  control,
  isEdit = false,
}: UserFormFieldsProps) {
  return (
    <View className="space-y-3">
      {isEdit && (
        <ControlledInput
          name="id"
          control={control}
          label={translate('new_user.form.id')}
          disabled={true}
          readOnly={true}
          testID="input-id"
        />
      )}

      <ControlledInput
        name="name"
        control={control}
        label={translate('new_user.form.name')}
        testID="input-name"
      />
      <ControlledInput
        name="email"
        control={control}
        label={translate('new_user.form.email')}
        keyboardType="email-address"
        testID="input-email"
      />
      <ControlledInput
        name="phone"
        control={control}
        label={translate('new_user.form.phone')}
        keyboardType="phone-pad"
        testID="input-phone"
      />
      <ControlledSelect
        name="gender"
        control={control}
        label={translate('new_user.form.gender')}
        options={genderOptions}
        placeholder={translate('new_user.form.gender_placeholder')}
        testID="select-gender"
      />
    </View>
  );
}

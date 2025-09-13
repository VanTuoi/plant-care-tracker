import React from 'react';

import type { OptionType } from '@/components/ui';
import { colors, Options, useModal } from '@/components/ui';
import type { ColorSchemeType } from '@/lib';
import { translate, useSelectedTheme } from '@/lib';

import { Theme } from '../ui/icons';
import { Item } from './item';

export const ThemeItem = () => {
  const { selectedTheme, setSelectedTheme } = useSelectedTheme();
  const modal = useModal();

  const onSelect = React.useCallback(
    (option: OptionType) => {
      setSelectedTheme(option.value as ColorSchemeType);
      modal.dismiss();
    },
    [setSelectedTheme, modal]
  );

  const themes = React.useMemo(
    () => [
      {
        label: `${translate('settings.theme.dark')}`,
        value: 'dark',
      },
      {
        label: `${translate('settings.theme.light')}`,
        value: 'light',
      },
      {
        label: `${translate('settings.theme.system')}`,
        value: 'system',
      },
    ],
    []
  );

  const theme = React.useMemo(
    () => themes.find((t) => t.value === selectedTheme),
    [selectedTheme, themes]
  );

  return (
    <>
      <Item
        tx="settings.theme.title"
        value={theme?.label}
        onPress={modal.present}
        icon={<Theme size={24} />}
        iconColor={colors.neutral[200]}
      />

      <Options
        ref={modal.ref}
        options={themes}
        onSelect={onSelect}
        value={theme?.value}
      />
    </>
  );
};

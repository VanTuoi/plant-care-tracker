import * as React from 'react';

import type { OptionType } from '@/components/ui';
import { colors, Options, useModal } from '@/components/ui';
import { useSelectedLanguage } from '@/lib';
import { translate } from '@/lib';
import { type Language } from '@/lib/i18n/resources';

import { Language as LanguageIcon } from '../ui/icons';
import { Item } from './item';

export const LanguageItem = () => {
  const { language, setLanguage } = useSelectedLanguage();
  const modal = useModal();
  const onSelect = React.useCallback(
    (option: OptionType) => {
      setLanguage(option.value as Language);
      modal.dismiss();
    },
    [setLanguage, modal]
  );

  const langs = React.useMemo(
    () => [
      { label: translate('settings.english'), value: 'en' },
      { label: translate('settings.arabic'), value: 'ar' },
      { label: translate('settings.vietnamese'), value: 'vi' },
    ],
    []
  );

  const selectedLanguage = React.useMemo(
    () => langs.find((lang) => lang.value === language),
    [language, langs]
  );

  return (
    <>
      <Item
        tx="settings.language"
        value={selectedLanguage?.label}
        onPress={modal.present}
        icon={<LanguageIcon size={24} />}
        iconColor={colors.neutral[200]}
      />
      <Options
        ref={modal.ref}
        options={langs}
        onSelect={onSelect}
        value={selectedLanguage?.value}
      />
    </>
  );
};

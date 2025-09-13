import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Pressable, Text } from 'react-native';

export function DatePickerField({
  value,
  onChange,
}: {
  value: Date;
  onChange: (d: Date) => void;
}) {
  const [show, setShow] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <>
      <Pressable
        className="rounded-full bg-primary-200 px-4 py-3"
        onPress={() => setShow(true)}
      >
        <Text className="text-lg text-primary-800">
          {value ? value.toLocaleDateString() : 'Chọn ngày'}
        </Text>
      </Pressable>

      {show && (
        <DateTimePicker
          mode="date"
          display="default"
          value={value || new Date()}
          onChange={handleChange}
        />
      )}
    </>
  );
}

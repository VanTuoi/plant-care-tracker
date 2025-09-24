import { Stack, useRouter } from 'expo-router';

import { Button, Text, View } from '@/components/ui';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center p-4">
        <Text className="mb-4 font-signika-bold text-2xl">
          This screen doesn't exist.
        </Text>

        <Button
          label="Go to Home"
          className="bg-primary-500"
          size="lg"
          onPress={() => router.push('/')}
        />
      </View>
    </>
  );
}

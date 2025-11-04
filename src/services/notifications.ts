import * as Notifications from 'expo-notifications';

// Configurar como as notificações aparecem
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const requestPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
};

export const scheduleNotification = async (title: string, body: string) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,
    },
    trigger: { seconds: 2 }, // Notificação em 2 segundos
  });
};

export const sendTestNotification = async () => {
  const hasPermission = await requestPermissions();
  if (hasPermission) {
    await scheduleNotification(
      'MottuStorage', 
      'Notificação de teste funcionando! '
    );
    return true;
  }
  return false;
};

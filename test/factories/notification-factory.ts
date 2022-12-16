import { Content } from '@app/entities/content';
import { Notification, NotificationProps } from '@app/entities/notifications';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'social',
    content: new Content('Nova solicitação de amizade!'),
    recipientId: 'example-teste-ignite-2',
    ...override,
  });
}

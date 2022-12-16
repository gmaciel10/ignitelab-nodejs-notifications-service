import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from '@app/use-cases/cancel-notification';
import { Notification } from '@app/entities/notifications';
import { Content } from '@app/entities/content';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';

describe('Cancel notifications', () => {
  it('Should be able cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notification_id: notification.id,
    });
    expect(notificationsRepository.notifications[0].cancelAt).toEqual(
      expect.any(Date),
    );
  });

  it('Should not be able to cancel a notification  when it does not exist ', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelNotification.execute({
        notification_id: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});

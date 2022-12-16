import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'example-teste-ignite-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'example-teste-ignite-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'example-teste-ignite-2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'example-teste-ignite-1',
    });

    expect(count).toEqual(2);
  });
});

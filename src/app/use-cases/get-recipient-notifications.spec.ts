import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipients notifications', () => {
  it('should be able get recipients notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'example-teste-ignite-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'example-teste-ignite-1' }),
        expect.objectContaining({ recipientId: 'example-teste-ignite-1' }),
      ]),
    );
  });
});

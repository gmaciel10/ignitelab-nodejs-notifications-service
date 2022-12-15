import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

describe('Send notifications', () => {
  it('Should be able send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    await sendNotification.execute({
      recipientId: 'example',
      content: 'This is a notification',
      category: 'social',
    });
    expect(notificationsRepository.notifications).toHaveLength(1);
  });
});

import { NotificationsRepository } from 'src/app/repositories/notifications-repository';
import { Notification } from '../../src/app/entities/notifications';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async findById(notification_id: string): Promise<Notification | null> {
    const notification = await this.notifications.find(
      (item) => item.id === notification_id,
    );
    if (!notification) {
      return null;
    }
    return notification;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );
  }

  async countManyByRecipientId(recipient_id: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipient_id,
    ).length;
  }

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }
}

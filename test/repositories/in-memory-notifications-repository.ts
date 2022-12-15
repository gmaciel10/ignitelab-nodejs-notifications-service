import { NotificationsRepository } from 'src/app/repositories/notifications-repository';
import { Notification } from '../../src/app/entities/notifications';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  async findById(notification_id: string): Promise<Notification | null> {
    const notification = await this.notifications.find(
      (item) => item.id === notification_id,
    );
    if (!notification) {
      return null;
    }
    return notification;
  }

  public notifications: Notification[] = [];
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

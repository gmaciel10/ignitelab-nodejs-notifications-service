import { Notification } from './notifications';
import { randomUUID } from 'node:crypto';
import { Content } from './content';

describe('Notification', () => {
  it('It should be able to create a notification', () => {
    const content = new Notification({
      content: new Content('Nova solicitação de amizade'),
      category: 'social',
      recipientId: randomUUID(),
    });

    expect(content).toBeTruthy();
  });
});

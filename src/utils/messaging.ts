import { defineExtensionMessaging } from '@webext-core/messaging';

interface ProtocolMap {
  copyBv(): void;
  egg(): void;
}

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();

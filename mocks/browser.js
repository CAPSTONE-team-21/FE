import { setupWorker } from 'msw/browser';
import { chatHandlers } from './handlers/chatHandlers';
import { loginHandlers } from './handlers/LoginHandlers';
import { SignUpHandlers } from './handlers/SignUpHandlers';
import { bookmarkHandlers } from './handlers/bookmarkHandlers';

export const worker = setupWorker(
  ...chatHandlers,
  ...loginHandlers,
  ...SignUpHandlers,
  ...bookmarkHandlers
);

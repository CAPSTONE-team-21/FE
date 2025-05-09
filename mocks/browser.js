import { setupWorker } from 'msw/browser';
import { chatHandlers } from './handlers/chatHandlers';
import { loginHandlers } from './handlers/LoginHandlers';

export const worker = setupWorker(...chatHandlers, ...loginHandlers);

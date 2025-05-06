import { setupWorker } from 'msw/browser';
import { handlers } from './handlers/chatHandlers';

export const worker = setupWorker(...handlers);

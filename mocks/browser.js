import { setupWorker } from 'msw/browser';
import { chatHandlers } from './handlers/chatHandlers';
import { loginHandlers } from './handlers/LoginHandlers';
import { SignUpHandlers } from './handlers/SignUpHandlers';

export const worker = setupWorker(...chatHandlers, ...loginHandlers, ...SignUpHandlers);

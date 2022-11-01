// utils/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@trpc-poc/api';
export const trpc = createTRPCReact<AppRouter>();

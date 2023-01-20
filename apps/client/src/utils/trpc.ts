import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "@trpc-poc/api";

export const trpc = createTRPCReact<AppRouter>();

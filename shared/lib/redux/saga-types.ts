// shared/lib/redux/saga-types.ts
import { Effect } from "redux-saga/effects";

/** Redux-saga worker; `any` is the yield-result channel (matches redux-saga Effect typing). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- saga middleware yield results
export type SagaGenerator = Generator<Effect, void, any>;

// features/auth/sagas/auth.saga.ts
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  registerRequest,
  registerSuccess,
  registerFailure,
  checkAuthStatus,
  authStatusSuccess,
  authStatusFailure,
} from "../model/slice";
import { mockAuthService } from "../../../shared/api/mock/auth-service";
import { PayloadAction } from "@reduxjs/toolkit";
import { SagaGenerator } from "../../../shared/lib/redux/saga-types";

// Handle login
function* handleLogin(
  action: PayloadAction<{ email: string; password: string }>
): SagaGenerator {
  try {
    const user = yield call(mockAuthService.login, action.payload);

    yield put(loginSuccess(user));
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Login failed";
    yield put(loginFailure(message || "Login failed"));
  }
}

// Handle logout
function* handleLogout(): SagaGenerator {
  try {
    yield call(mockAuthService.logout);
  } catch (error) {
    console.error("Logout error:", error);
  }
}

// Handle registration
function* handleRegister(
  action: PayloadAction<{ email: string; password: string; name: string }>
): SagaGenerator {
  try {
    const user = yield call(mockAuthService.register, action.payload);
    yield put(registerSuccess(user));
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Registration failed";
    yield put(registerFailure(message || "Registration failed"));
  }
}

// Handle auth status check
function* handleCheckAuthStatus(): SagaGenerator {
  try {
    const user = yield call(mockAuthService.getCurrentUser);

    if (user) {
      yield put(authStatusSuccess(user));
    } else {
      yield put(authStatusFailure());
    }
  } catch {
    yield put(authStatusFailure());
  }
}

// Watcher Saga
export function* authSagas(): SagaGenerator {
  yield takeEvery(loginRequest.type, handleLogin);
  yield takeLatest(logout.type, handleLogout);
  yield takeLatest(registerRequest.type, handleRegister);
  yield takeLatest(checkAuthStatus.type, handleCheckAuthStatus);
}

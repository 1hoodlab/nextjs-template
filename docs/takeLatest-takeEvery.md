# Key Differences:

## **takeEvery**

1. Handles every action dispatched
2. Processes all requests in parallel

### **Use Cases:**

- Logging actions
- Analytics tracking
- Independent operations that all need to complete

### **Pros:**

- No requests are dropped
- All operations complete

### **Cons:**

- Can overwhelm resources
- May cause race conditions
- Multiple responses may conflict

---

## **takeLatest**

1. Only processes the most recent action
2. Cancels any previous ongoing operations

### **Use Cases:**

- Search/autocomplete
- Form submissions
- API requests where only the latest result matters

### **Pros:**

- Prevents race conditions
- Saves resources
- Clear latest-wins semantics

### **Cons:**

- Previous operations are cancelled
- May drop important requests

---

## **When to Use Each**

### **Use `takeEvery` when:**

```typescript
// Example: Logging user actions
function* logActionsSaga() {
  yield takeEvery("*", function* (action) {
    yield call(analyticsService.logAction, action);
  });
}
```

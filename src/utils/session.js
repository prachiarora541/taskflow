const SESSION_KEY = "taskflowSession";
const SESSION_LENGTH = 30 * 60 * 1000;

function readSession() {
     try {
          const saved = localStorage.getItem(SESSION_KEY);
          return saved ? JSON.parse(saved) : null;
     } catch {
          return null;
     }
}

export function startSession(user) {
     const now = Date.now();
     const session = {
          email: user.email,
          startedAt: now,
          lastActiveAt: now,
          expiresAt: now + SESSION_LENGTH,
     };
     localStorage.setItem(SESSION_KEY, JSON.stringify(session));
     localStorage.setItem("isLoggedIn", "true");
     localStorage.setItem("currentUser", JSON.stringify(user));
}

export function getActiveSession() {
     const session = readSession();
     if (!session || session.expiresAt <= Date.now()) {
          clearSession();
          return null;
     }
     return session;
}

export function hasActiveSession() {
     return Boolean(getActiveSession());
}

export function touchSession() {
     const session = getActiveSession();
     if (!session) return false;
     const updated = {
          ...session,
          lastActiveAt: Date.now(),
          expiresAt: Date.now() + SESSION_LENGTH,
     };
     localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
     return true;
}

export function clearSession() {
     localStorage.removeItem(SESSION_KEY);
     localStorage.removeItem("isLoggedIn");
     localStorage.removeItem("currentUser");
}

export function getSessionTimeRemaining() {
     const session = getActiveSession();
     return session ? Math.max(0, session.expiresAt - Date.now()) : 0;
}

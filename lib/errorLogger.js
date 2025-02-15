// lib/errorLogger.js
// A simple error logger that currently logs to the console.
// You can extend this to integrate with services like Sentry, LogRocket, etc.
export function logError(error, errorInfo) {
    console.error("Logged Error:", error, errorInfo);
  }
  
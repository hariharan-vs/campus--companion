export async function requestNotificationPermission(): Promise<boolean> {
  if (!("Notification" in window)) {
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission === "denied") {
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === "granted";
}

export function sendNotification(title: string, options?: NotificationOptions) {
  if (Notification.permission === "granted") {
    new Notification(title, {
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      ...options,
    });
  }
}

export function scheduleClassReminder(courseName: string, room: string, minutesBefore: number = 10) {
  sendNotification(`${courseName} in ${minutesBefore} min`, {
    body: `Room ${room} — Time to head out!`,
    tag: `class-${courseName}`,
  });
}

export function notifyTicketUpdate(ticketId: string, status: string) {
  sendNotification(`Ticket ${ticketId} Updated`, {
    body: `Status changed to ${status}`,
    tag: `ticket-${ticketId}`,
  });
}

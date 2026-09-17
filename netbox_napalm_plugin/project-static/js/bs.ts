import type { Toast as ToastType } from 'bootstrap';

declare global {
  interface Window { Toast: typeof ToastType }
}

type ToastLevel = 'danger' | 'warning' | 'success' | 'info';

export function createToast(
  level: ToastLevel,
  title: string,
  message: string,
  extra?: string,
): ToastType {
  let iconName = 'mdi-alert';
  switch (level) {
    case 'warning':
      iconName = 'mdi-alert';
      break;
    case 'success':
      iconName = 'mdi-check-circle';
      break;
    case 'info':
      iconName = 'mdi-information';
      break;
    case 'danger':
      iconName = 'mdi-alert';
      break;
  }

  // bg-danger/bg-success are dark; bg-warning/bg-info are light. Pick text color for contrast
  // against each, rather than a single color that only works for half of them.
  const textClass = level === 'warning' || level === 'info' ? 'text-dark' : 'text-white';
  const closeClass = level === 'warning' || level === 'info' ? 'btn-close' : 'btn-close-white';

  const container = document.createElement('div');
  container.setAttribute('class', 'toast-container position-fixed bottom-0 end-0 m-3');

  const main = document.createElement('div');
  main.setAttribute('class', `toast bg-${level}`);
  main.setAttribute('role', 'alert');
  main.setAttribute('aria-live', 'assertive');
  main.setAttribute('aria-atomic', 'true');

  const header = document.createElement('div');
  header.setAttribute('class', `toast-header bg-${level} ${textClass}`);

  const icon = document.createElement('i');
  icon.setAttribute('class', `mdi ${iconName}`);

  const titleElement = document.createElement('strong');
  titleElement.setAttribute('class', 'me-auto ms-1');
  titleElement.innerText = title;

  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.setAttribute('class', closeClass);
  button.setAttribute('data-bs-dismiss', 'toast');
  button.setAttribute('aria-label', 'Close');

  const body = document.createElement('div');
  body.setAttribute('class', `toast-body ${textClass}`);

  header.appendChild(icon);
  header.appendChild(titleElement);

  if (typeof extra !== 'undefined') {
    const extraElement = document.createElement('small');
    extraElement.setAttribute('class', 'text-muted');
    header.appendChild(extraElement);
  }

  header.appendChild(button);

  body.innerText = message.trim();

  main.appendChild(header);
  main.appendChild(body);
  container.appendChild(main);
  document.body.appendChild(container);

  // NetBox core already loads Bootstrap's JS and exposes its components as globals (e.g.
  // `window.Toast`, not a `window.bootstrap` namespace as of NetBox 4.7). Importing the
  // 'bootstrap' package here instead would bundle a second copy into this script, which
  // re-registers Bootstrap's document-level data-api click handlers (collapse, tab, etc.) and
  // conflicts with NetBox's own, breaking things like the sidebar menu's expand/collapse toggle.
  const toast = new window.Toast(main);
  return toast;
}


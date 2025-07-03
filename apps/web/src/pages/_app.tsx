import type { AppProps } from 'next/app';
import { ToastProvider } from 'ui/components/toast-provider';
import { isFeatureEnabled } from 'config/features'; // Import feature flags

function MyApp({ Component, pageProps }: AppProps) {
  // TODO: Implement more granular conditional rendering based on feature flags
  // For example, if a feature is disabled, redirect or show a disabled message.
  if (!isFeatureEnabled('isNotificationsEnabled')) {
    console.log('Notifications are disabled.');
    // You might render a different component or redirect here
  }

  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  );
}

export default MyApp;

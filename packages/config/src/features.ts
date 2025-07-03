// TODO: Implement a more robust way to load these from environment variables or a database
export const features = {
  isBillingEnabled: true,
  isMultiTenancyEnabled: true,
  isTwoFactorAuthEnabled: false,
  isNotificationsEnabled: true,
  isBackgroundJobsEnabled: true,
  isWebhooksEnabled: true,
  isAdminPanelEnabled: true, // Enabled for basic implementation
};

export type FeatureFlag = keyof typeof features;

export function isFeatureEnabled(feature: FeatureFlag): boolean {
  return features[feature];
}

/** Who provides pencil case, as the legal texts name them. */
export const PROVIDER = {
  name: 'Henrik Fricke',
  street: 'Boxhagener Str. 36',
  city: '10245 Berlin',
  country: 'Germany',
} as const;

export const PROVIDER_ADDRESS = `${PROVIDER.name}, ${PROVIDER.street}, ${PROVIDER.city}, ${PROVIDER.country}`;

/** The versions of the legal texts, shown at their top. */
export const PRIVACY_POLICY_UPDATED_AT = '2026-11-02';
export const TERMS_OF_USE_UPDATED_AT = '2026-11-02';

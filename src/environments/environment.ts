import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Whatch',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44394/',
    redirectUri: baseUrl,
    clientId: 'Whatch_App',
    responseType: 'code',
    scope: 'offline_access Whatch',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://localhost:44394',
      rootNamespace: 'Whatch',
    },
  },
} as Environment;

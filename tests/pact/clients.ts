import { DefaultApi } from '@matthewmurphy/pact-example-client';

export function createClients(serviceUrl: string) {
  const client = new DefaultApi({}, serviceUrl);

  return { client };
}

import { PactV3, SpecificationVersion } from '@pact-foundation/pact';
import { consumerName, providerName } from 'pact/constants';
import path from 'path';

export const mockProvider = new PactV3({
  consumer: consumerName,
  provider: providerName,
  logLevel: 'warn',
  dir: path.resolve(__dirname, '..', 'gen', 'pacts'),
  spec: SpecificationVersion.SPECIFICATION_VERSION_V3,
  host: '127.0.0.1',
});

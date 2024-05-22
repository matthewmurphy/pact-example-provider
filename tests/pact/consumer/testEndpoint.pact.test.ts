import { describe, expect, it } from "vitest";

import { mockProvider } from "./pactMockProvider.pact";
import { createClients } from '../clients';

describe("consumer pact test - GET test endpoints", () => {
  describe("request GET on test endpoints", () => {
    it("test01 returns { foo: 'bar' }", async () => {
      expect.assertions(1);

      const endpointPath = "/test01";
      const responseBody = { foo: "bar" };

      await mockProvider
        .uponReceiving(`a request to GET ${endpointPath}`)
        .withRequest({
          method: "GET",
          path: endpointPath,
        })
        .willRespondWith({
          status: 200,
          body: responseBody,
        })
        .executeTest(async (mockService) => {
          const { client } = createClients(mockService.url);
          const response = await client.getTest01();

          expect(response.data).toStrictEqual(responseBody);
        });
    });
  });
});

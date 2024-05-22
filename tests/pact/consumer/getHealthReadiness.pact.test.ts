import { describe, expect, it } from "vitest";

import { mockProvider } from "./pactMockProvider.pact";
import { createClients } from '../clients';

describe("consumer pact test - GET /health/readiness", () => {
  describe("request GET on health readiness endpoint", () => {
    it("health readiness returns { healthy: true }", async () => {
      expect.assertions(1);

      await mockProvider
        .uponReceiving("a request to get health readiness")
        .withRequest({
          method: "GET",
          path: "/health/readiness",
        })
        .willRespondWith({
          status: 200,
          body: { healthy: true },
          headers: {
            "Content-Type": "application/json",
          },
        })
        .executeTest(async (mockService) => {
          const { client } = createClients(mockService.url);
          const response = await client.getHealthReadiness();

          expect(response.data).toStrictEqual({ healthy: true });
        });
    });
  });
});

import child_process from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";

import type { VerifierOptions } from "@pact-foundation/pact";
import { Verifier } from "@pact-foundation/pact";
import { providerName, pactBrokerUrl } from "pact/constants";

import runServer from "../../../src/server";

// eslint-disable-next-line node/no-sync
const exists = fs.existsSync;
const exec = promisify(child_process.exec);

async function getBranchNameFromGit() {
  const { stdout } = await exec("git rev-parse --abbrev-ref HEAD");
  return stdout.trim();
}

async function getCommitHashFromGit() {
  const { stdout } = await exec("git rev-parse --short HEAD");
  return stdout.trim();
}

void (async function main() {
  const server = runServer();

  try {
    const branchName =
      process.env.BRANCH_NAME ?? (await getBranchNameFromGit());
    const commitHash = process.env.PROVIDER_VERSION ?? await getCommitHashFromGit();

    const opts: VerifierOptions = {
      logLevel: "info",
      providerBaseUrl: "http://localhost:3333",
      provider: providerName,
      providerVersion: commitHash,
      providerVersionBranch: branchName,
      publishVerificationResult: !!process.env.PUBLISH_VERIFICATION_RESULTS,
      enablePending: true,
    };

    if (process.env.USE_PACTFLOW) {
      console.log("--- Running tests using PactFlow...");
      opts.pactBrokerUrl = pactBrokerUrl;
      opts.pactBrokerToken = process.env.PACT_BROKER_TOKEN;

      if (process.env.PACT_URL) {
        console.log("--- Testing pact provided by webhook...");
        console.log(`--- Pact URL: ${process.env.PACT_URL}`);
        opts.pactUrls = [process.env.PACT_URL];
      } else {
        console.log(`--- Testing pacts matching: 
          { mainBranch: true },
          { matchingBranch: true },
          { deployedOrReleased: true, environment: "mainline" },`);
        opts.consumerVersionSelectors = [
          { mainBranch: true },
          { matchingBranch: true },
          { deployedOrReleased: true, environment: "mainline" },
        ];
      }
    } else {
      const pactsDir = path.resolve(__dirname, "..", "gen", "pacts");
      console.log(`Running tests locally using pacts in ${pactsDir}...`);
      if (!exists(pactsDir)) {
        throw new Error(`Pacts directory not found: ${pactsDir}`);
      }
      opts.pactUrls = [pactsDir];
    }

    const verifyOutput = await new Verifier(opts).verifyProvider();
    console.log(verifyOutput);
  } finally {
    server.close();
  }
})();

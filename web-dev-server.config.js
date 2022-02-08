/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { legacyPlugin } from "@web/dev-server-legacy";

const mode = process.env.MODE || "dev";
if (!["dev", "prod"].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}

export default {
  port: 8085,
  watch: true,
  appIndex: "index.html",
  nodeResolve: { exportConditions: mode === "dev" ? ["development"] : [] },
  preserveSymlinks: true,
  plugins: [
    legacyPlugin({
      polyfills: {
        // Manually imported in index.html file
        webcomponents: false,
      },
    }),
  ],
};

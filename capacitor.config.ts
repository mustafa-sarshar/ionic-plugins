import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.app.plugins",
  appName: "Ionic App Plugins",
  webDir: "www",
  cordova: {
    preferences: {
      bluetooth_restore_state: "true",
      accessBackgroundLocation: "false",
    },
  },
};

export default config;

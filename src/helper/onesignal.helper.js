import OneSignal from "react-onesignal";

export default async function runOneSignal() {
  await OneSignal.init({
    appId: import.meta.env.VITE_APP_ONE_SINGAL_APP_ID,
    allowLocalhostAsSecureOrigin:
      import.meta.env.VITE_APP_NODE_ENV?.toUpperCase() == "DEV",
  });
  OneSignal.Slidedown.promptPush();
}

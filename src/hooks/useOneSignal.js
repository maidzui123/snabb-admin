import { useEffect, useState } from "react";
import OneSignal from "react-onesignal";

const useOneSignal = () => {
  const [oneSignalId, setOneSignalId] = useState("");
  useEffect(() => {
    (async () => {
      await OneSignal.init({
        appId: import.meta.env.VITE_APP_ONE_SINGAL_APP_ID,
        allowLocalhostAsSecureOrigin:
          import.meta.env.VITE_APP_NODE_ENV?.toUpperCase() == "DEV",
      });

      OneSignal.Slidedown.promptPush();
      setOneSignalId(OneSignal.User.PushSubscription.id);
      OneSignal.Notifications.addEventListener("permissionChange", (obj) => {
        console.log("permissionChange", obj);
        setOneSignalId(OneSignal.User.PushSubscription.id);
      });
    })();

    return () => {};
  }, []);
  return { oneSignalId };
};

export default useOneSignal;

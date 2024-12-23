import { store } from "@/store/store";

export const hasPermission = (code) => {
  return store?.getState()?.appState?.permissions?.some((e) => e?.code === code && e?.status === "allow");
};

export const isDisabledComponent = (code) => {
  return store?.getState()?.appState?.permissions?.some((e) => e?.code === code && e?.status === "deny");
};

export const checkTypeCompany = (name) => {
  return store?.getState()?.appState?.auth?.type === name
}
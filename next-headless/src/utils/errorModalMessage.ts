import { store } from "store";
import { unsetAllModal, messageModal } from "slices/modal.slice";

export const errorModalMessage = (error: any) => {
  const message =
    (typeof error === "string" && error) ||
    (error?.response?.data?.message ?? "Unexpected Error!");

  const msgString = Array.isArray(message)
    ? message.map((i: any) => i?.msg ?? i).join(", ")
    : message;
  store.dispatch(unsetAllModal());
  store.dispatch(messageModal(msgString));
  console.error("errorModalMessage: ", error?.response?.data);
};

import { toast as reactToast } from "react-toastify";
import { ActionProps } from "./shared/toast.interface";
import Title from "./title";

interface ToastProps {
  title?: React.ReactNode;
  action?: ActionProps;
}

const toast = {
  success: ({ title, action }: ToastProps) => {
    reactToast.success(<Title action={action}>{title}</Title>, {
      position: "bottom-left",
      autoClose: 50000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      icon: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  },
  error: ({ title, action }: ToastProps) => {
    reactToast.error(<Title action={action}>{title}</Title>, {
      position: "bottom-left",
      autoClose: 50000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      icon: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  },
  info: ({ title, action }: ToastProps) => {
    reactToast.info(<Title action={action}>{title}</Title>, {
      position: "bottom-left",
      autoClose: 50000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      icon: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  },
  warning: ({ title, action }: ToastProps) => {
    reactToast.warning(<Title action={action}>{title}</Title>, {
      position: "bottom-left",
      autoClose: 50000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      icon: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  },
};

export default toast;

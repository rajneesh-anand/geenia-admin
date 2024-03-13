import cn from "classnames";
import CloseIcon from "@components/icons/close-icon";

const variantClasses = {
  info: "bg-blue-100 text-blue-600",
  warning: "bg-yellow-100 text-yellow-600",
  error: "bg-rose-500 text-white",
  success: "bg-green-600 text-white",
  infoOutline: "border border-blue-200 text-blue-600",
  warningOutline: "border border-yellow-200 text-yellow-600",
  errorOutline: "border border-red-200 text-red-600",
  successOutline: "border border-green-200 text-green-600",
};

const Alert = ({
  message,
  closeable = false,
  variant = "info",
  className,
  onClose,
}) => {
  if (!message) return null;
  return (
    <div
      className={cn(
        "relative flex items-center justify-between rounded px-5 py-4 shadow-sm",
        variantClasses[variant],
        className
      )}
      role="alert"
    >
      <p className="mr-4 text-sm">{message}</p>
      {closeable && (
        <button
          data-dismiss="alert"
          aria-label="Close"
          onClick={onClose}
          title="Close alert"
          className={`absolute right-2 top-1/2 -mr-0.5 -mt-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors duration-200 hover:bg-gray-300 hover:bg-opacity-25 focus:bg-gray-300 focus:bg-opacity-25 focus:outline-none `}
        >
          <span aria-hidden="true">
            <CloseIcon className="text-xl lg:text-2xl" color="#ffffff" />
          </span>
        </button>
      )}
    </div>
  );
};

export default Alert;

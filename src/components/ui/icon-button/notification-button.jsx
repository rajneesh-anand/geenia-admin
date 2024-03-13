import NotificationIcon from "@components/icons/notification-icon";
import cn from "classnames";

const NotificationButton = ({ className, onClick, color }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Notification Button"
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-full text-base text-opacity-50 transition duration-200  hover:text-opacity-100 focus:outline-none",
        className
      )}
    >
      <NotificationIcon className="text-xl lg:text-2xl" color={color} />
    </button>
  );
};

export default NotificationButton;

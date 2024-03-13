import CloseIcon from "@components/icons/close-icon";
import cn from "classnames";

const CloseButton = ({ className, onClick, color }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Close Button"
      className={cn(
        "absolute -right-3 -top-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 transition duration-200 hover:bg-opacity-100 focus:outline-none",
        className
      )}
    >
      <CloseIcon className="text-xl lg:text-2xl" color={color} />
    </button>
  );
};

export default CloseButton;

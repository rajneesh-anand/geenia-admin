import CloseIcon from "@components/icons/close-icon";
import cn from "classnames";

const EditButton = ({ className, onClick, color }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Edit Button"
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-full text-base text-opacity-50 transition duration-200  hover:text-opacity-100 focus:outline-none",
        className
      )}
    >
      <CloseIcon className="text-xl lg:text-2xl" color={color} />
    </button>
  );
};

export default EditButton;

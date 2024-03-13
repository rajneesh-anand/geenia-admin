import { useState, useEffect } from "react";
import Input from "@components/ui/form/input";
import TextArea from "@components/ui/form/text-area";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useModalAction } from "@components/modal/modal.context";
import CloseButton from "@components/ui/close-button";
import cn from "classnames";

const MessageForm = ({ isPopup = true, className, mobile }) => {
  const { closeModal, openModal } = useModalAction();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (error === "success") {
      toast.error("message delivered ", {
        progressClassName: "fancy-progress-bar",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [error]);

  async function onSubmit({ msgTitle, msgDescription }) {
    setProcessing(true);
    const bodyData = {
      title: msgTitle,
      description: msgDescription,
      mobile: mobile,
    };
    console.log(bodyData);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/user/message`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(bodyData),
        }
      );

      const result = await res.json();

      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        setProcessing(false);
        setError("success");
        closeModal();
      }
    } catch (error) {
      setError("failed");
      closeModal();
      console.log(error.message);
      setProcessing(false);
    }
  }

  return (
    <div className="relative flex w-full flex-col justify-center rounded-sm bg-white px-4 py-6 sm:px-8 sm:py-10 lg:min-w-[400px] xl:px-12">
      {isPopup === true && <CloseButton onClick={closeModal} color="#000000" />}

      <div className="my-2 text-center text-[12.5px] font-medium lg:text-[14px]">
        <p className="px-0 py-2 text-[14px] font-medium text-rose-700">
          Send Push Notification
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-4">
        <div className="grid grid-cols-12 ">
          <Input
            label="Message Title"
            type="text"
            placeholder="title of the message"
            className="col-span-12 mb-2"
            variant="outline"
            {...register("msgTitle", {
              required: "message title is required ! ",
            })}
            error={errors.msgTitle?.message}
          />
          <TextArea
            label="Message Description"
            placeholder="message details description"
            className="col-span-12  mb-2"
            variant="outline"
            {...register("msgDescription", {
              required: "message description is required ! ",
            })}
            error={errors.msgDescription?.message}
          />
        </div>

        <div className="relative">
          <button
            type="submit"
            className="whitespace-no-wrap inline-flex w-full items-center justify-center rounded-sm bg-orange-500 px-4 py-1  font-medium leading-6 text-white shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            {processing ? "Sending... " : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;

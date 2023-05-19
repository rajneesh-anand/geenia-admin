import { Fragment, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { Listbox, Transition } from "@headlessui/react";
import { HiOutlineSelector, HiCheck } from "react-icons/hi";
import Input from "@components/ui/input";
import TextArea from "@components/ui/text-area";
import { slugify } from "@utils/helper";

const statusOptions = ["Active", "Inactive"];

interface FormValues {
  name: string;
  statusValue: string;
  description: string;
  price: string;
  discountedPrice: string;
}

export default function CreateServiceForm() {
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState("");
  const [selectedStatusOption, setSelectedStatusOption] = useState(
    statusOptions[0]
  );
  const [profilePhoto, setProfilePhoto] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onDrop = (acceptedFiles: any) => {
    setProfilePhoto(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  useEffect(() => {
    if (status === "failed") {
      toast.error(" Oops something went wrong !", {
        progressClassName: "fancy-progress-bar",
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    if (status === "success") {
      toast.success(" Service Saved Successfully !", {
        progressClassName: "fancy-progress-bar",
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [status]);

  async function onSubmit(data: FormValues) {
    setProcessing(true);
    setStatus("");
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("slug", slugify(data.name));
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("discountedPrice", data.discountedPrice);
    formData.append(
      "status",
      data.statusValue ? data.statusValue : statusOptions[0]
    );
    formData.append("photo", profilePhoto!);
    try {
      const res = await fetch(`${process.env.API_URL}/service`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        setProcessing(false);
        setStatus("success");
        reset();
      }
    } catch (error: any) {
      console.log(error.message);

      setProcessing(false);
      setStatus("failed");
    }
  }

  return (
    <div className="px-4 py-2">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
        <div className="text-center mb-3">
          <img
            className="inline object-cover w-28 h-28  rounded-full overflow-hidden border"
            src={
              profilePhoto
                ? URL.createObjectURL(profilePhoto)
                : "/image/default-profile.svg"
            }
            alt="Profile Photo"
          />
        </div>

        <div {...getRootProps()}>
          <input
            className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...getInputProps()}
          />
          <div className="flex justify-center mb-4">
            <div className="w-[184px] px-6 py-2 border cursor-pointer border-dashed border-gray-900 bg-gray-100 ">
              <p className=" text-[12px] uppercase ">Select Service Photo </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-between mb-3">
          <div className="w-full  mb-3">
            <Input
              variant="outline"
              type="text"
              label="Service Name"
              placeholder="Service Name"
              {...register("name", {
                required: "You must provide service name !",
              })}
              error={errors.name?.message}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between mb-3">
          <div className="w-full  mb-3">
            <Input
              variant="outline"
              type="text"
              label="Service Fee"
              placeholder="Service Fee"
              {...register("price", {
                required: "You must enter service price !",
                pattern: {
                  value: /^([\d]{0,6})(\.[\d]{1,2})?$/,
                  message: "Accept only decimal numbers",
                },
              })}
              error={errors.price?.message}
            />
          </div>

          <div className="w-full mb-3 lg:ml-[4px]">
            <Input
              variant="outline"
              type="text"
              label="Discounted Fee"
              placeholder="Discounted Fee"
              {...register("discountedPrice", {
                pattern: {
                  value: /^([\d]{0,6})(\.[\d]{1,2})?$/,
                  message: "Accept only decimal numbers",
                },
              })}
              error={errors.discountedPrice?.message}
            />
          </div>
          <div className="w-full   mb-3 lg:ml-[4px]">
            <Controller
              name="statusValue"
              control={control}
              render={({ field: { onChange } }) => (
                <Listbox
                  value={selectedStatusOption}
                  onChange={(e) => {
                    onChange(e);
                    setSelectedStatusOption(e);
                  }}
                >
                  {({ open }) => (
                    <div className="relative lg:ms-0 z-10 min-w-[180px]">
                      <Listbox.Label className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
                        Status
                      </Listbox.Label>

                      <Listbox.Button className="border border-gray-300  text-heading text-[13px] md:text-sm font-semibold  relative w-full py-2 ps-3 pe-10 text-start bg-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm cursor-pointer ">
                        <span className="block truncate">
                          {selectedStatusOption}
                        </span>
                        <span className="absolute inset-y-0 end-0 flex items-center pe-2 pointer-events-none">
                          <HiOutlineSelector
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options
                          static
                          className="absolute w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none text-sm"
                        >
                          {statusOptions?.map((option, idx) => (
                            <Listbox.Option
                              key={idx}
                              className={({ active }) =>
                                `${
                                  active
                                    ? "text-amber-900 bg-gray-100"
                                    : "text-gray-900"
                                }
                          cursor-default select-none relative py-2 ps-10 pe-4`
                              }
                              value={option}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={`${
                                      selected ? "font-medium" : "font-normal"
                                    } block truncate`}
                                  >
                                    {option}
                                  </span>
                                  {selected ? (
                                    <span
                                      className={`${
                                        active ? "text-amber-600" : ""
                                      }
                                check-icon absolute inset-y-0 start-0 flex items-center ps-3`}
                                    >
                                      <HiCheck
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  )}
                </Listbox>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="w-full ">
            <TextArea
              variant="solid"
              label="Description"
              {...register("description")}
              placeholder=" Write description here ..."
            />
          </div>
        </div>

        <div className="text-center mt-8 mb-8">
          <button
            className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            data-rounded="rounded-md"
            data-primary="blue-600"
            data-primary-reset="{}"
          >
            {processing ? "Saving... " : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

import dynamic from "next/dynamic";
import React, { useState } from "react";
import slugify from "slugify";
import UploadIcon from "@components/icons/upload-icon";
import Dropzone from "react-dropzone";
import Alert from "@components/ui/alert";
import Input from "@components/ui/form/input";
import Select from "@components/ui/form/select/select";
import Spinner from "@components/ui/spinner";
import { useForm } from "react-hook-form";
import { blogCategory, blogSubCategory } from "@data/constant";
import { useSession } from "next-auth/react";

const Editor = dynamic(() => import("@components/common/rteditor"), {
  ssr: false,
});

export default function AddBlogForm() {
  const { data: session, status } = useSession();
  const [processingStatus, setProcessingStatus] = useState(false);
  const [content, setContent] = useState("");
  const [alertType, setAlertType] = useState(null);
  const [message, setMessage] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [subCategory, setSubCategory] = useState(blogSubCategory[0]);
  const [category, setCategory] = useState(blogCategory[0]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit({ title, description }) {
    setProcessingStatus(true);
    try {
      const cat = category.map((item) => item.label);
      const subCat = subCategory.map((item) => item.label);

      const formData = new FormData();
      formData.append("image", blogImage);
      formData.append("title", title);
      formData.append("description", description);

      formData.append(
        "slug",
        slugify(title, {
          remove: /[*+~.()'"!:@&$#%,]/g,
          lower: true,
        })
      );
      formData.append("category", JSON.stringify(cat));
      formData.append("subCategory", JSON.stringify(subCat));
      formData.append("content", content);
      formData.append("author", session?.user?.email);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/post/create`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await res.json();
      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        setProcessingStatus(false);
        setAlertType("success");
        setMessage("Blog Saved !");
      }
    } catch (error) {
      setProcessingStatus(false);
      setAlertType("error");
      setMessage(error.message);
      console.log(error.message);
    }
  }

  return (
    <div className="my-8 py-8">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3  md:pr-5">
            Blog Image
          </p>
          <div className="flex w-full md:w-2/3 ">
            <Dropzone
              onDrop={(acceptedFiles) => setBlogImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <section className="w-2/3">
                  <div
                    {...getRootProps({
                      className:
                        "border-dashed border-2 border-border-base h-36 px-4 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none",
                    })}
                  >
                    <input {...getInputProps()} />
                    <UploadIcon className="text-slate-400" color="#7f7777" />
                    <p className="mt-4 text-center text-[12px] font-semibold lg:text-sm ">
                      <span className=" text-blue-700">
                        Click here to upload blog image
                      </span>{" "}
                      <br />
                      Or <br />
                      Drag and Drop Image here
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
            <div className="flex h-36 w-1/3 flex-col">
              <img
                className="min-h-0 w-full overflow-hidden rounded object-contain "
                src={
                  blogImage
                    ? URL.createObjectURL(blogImage)
                    : "/images/placeholder/product.svg"
                }
                alt="blog photo"
              />
            </div>
          </div>
        </div>
        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3  md:pr-5">
            Blog Title
          </p>
          <Input
            type="text"
            variant="outline"
            className="w-full md:w-2/3"
            placeholder="Blog Title"
            {...register("title", {
              required: "blog title is required !",
            })}
            error={errors.title?.message}
          />
        </div>
        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3  md:pr-5">
            Blog Description
          </p>
          <Input
            type="text"
            variant="outline"
            className="w-full md:w-2/3"
            placeholder="Blog Description"
            {...register("description", {
              required: "blog description is required !",
            })}
            error={errors.description?.message}
          />
        </div>

        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3 md:pr-5">
            Blog Category
          </p>
          <Select
            className=" w-full md:w-2/3"
            defaultValue={category}
            options={blogCategory}
            isSearchable={false}
            onChange={(value) => setCategory(value)}
            isMulti={true}
          />
        </div>
        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3 md:pr-5">
            Blog Sub Category
          </p>
          <Select
            className=" w-full md:w-2/3"
            defaultValue={subCategory}
            options={blogSubCategory}
            isSearchable={false}
            onChange={(value) => setSubCategory(value)}
            isMulti={true}
          />
        </div>

        <div className="mb-2 flex flex-col justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3 md:pr-5">
            Blog Content
          </p>
          <div className=" w-full md:w-2/3">
            <Editor name="content" content={content} onChange={setContent} />
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <button
            type="submit"
            className="whitespace-no-wrap flex items-center rounded-sm bg-orange-500 px-4 py-1 font-medium leading-6 text-white hover:bg-opacity-90 focus:outline-none"
          >
            {processingStatus ? (
              <>
                Saving ..{" "}
                <span>
                  <Spinner
                    simple={true}
                    className="-mr-1 ml-3 h-4 w-4 animate-spin "
                  />
                </span>
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
      {alertType && (
        <Alert
          message={message}
          variant={alertType}
          closeable={true}
          className="mt-5"
          onClose={() => setMessage(null)}
        />
      )}
    </div>
  );
}

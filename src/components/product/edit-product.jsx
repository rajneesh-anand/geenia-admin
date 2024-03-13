import Image from "next/image";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import UploadIcon from "@components/icons/upload-icon";
import CloseButton from "@components/ui/close-button";
import slugify from "slugify";
import Alert from "@components/ui/alert";
import Input from "@components/ui/form/input";
import Select from "@components/ui/form/select/select";
import Spinner from "@components/ui/spinner";
import { useForm } from "react-hook-form";
import {
  productStatusOptions,
  productCategoryOptions,
  productSubCategoryOptions,
  productTypeOptions,
} from "@data/constant";

const Editor = dynamic(() => import("@components/common/rteditor"), {
  ssr: false,
});

export default function EditProductForm({ data }) {
  const [processingStatus, setProcessingStatus] = useState(false);
  const [content, setContent] = useState(data.content);
  const [files, setFiles] = useState([]);
  const [alertType, setAlertType] = useState(null);
  const [message, setMessage] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [imageGallery, setImagegallery] = useState(data.gallery);
  const [status, setStatus] = useState({
    label: data.status,
    value: data.status,
  });

  const [productType, setProductType] = useState(
    data.type.reduce((acc, currentValue) => {
      acc.push({ label: currentValue, value: currentValue });
      return acc;
    }, [])
  );
  const [category, setCategory] = useState(
    data.category.reduce((acc, currentValue) => {
      acc.push({ label: currentValue, value: currentValue });
      return acc;
    }, [])
  );
  const [subCategory, setSubCategory] = useState(
    data.subCategory.reduce((acc, currentValue) => {
      acc.push({ label: currentValue, value: currentValue });
      return acc;
    }, [])
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: data.name,
      description: data.description,
      unit: data.unit,
      price: data.price,
      sprice: data.salePrice,
      stock: data.inStock,
    },
  });

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000,
    onDrop,
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeFileFromGallery = (name) => {
    setImagegallery((imageGallery) =>
      imageGallery.filter((file) => file !== name)
    );
  };

  async function onSubmit({ name, description, unit, price, sprice, stock }) {
    setProcessingStatus(true);

    if (productType.length == 0) {
      setAlertType("error");
      setMessage("Product Type is empty !");
      setProcessingStatus(false);
      return;
    }
    if (category.length == 0) {
      setAlertType("error");
      setMessage("Product Category is empty  !");
      setProcessingStatus(false);
      return;
    }

    if (subCategory.length == 0) {
      setAlertType("error");
      setMessage("Product Sub-Category is empty !");
      setProcessingStatus(false);
      return;
    }

    try {
      const cat = category.map((item) => item.label);
      const subCat = subCategory.map((item) => item.label);
      const type = productType.map((item) => item.label);
      const formData = new FormData();
      formData.append("image", productImage);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("unit", unit);
      formData.append("price", price);
      formData.append("salePrice", sprice);
      formData.append("status", status.label);
      formData.append("category", JSON.stringify(cat));
      formData.append("subCategory", JSON.stringify(subCat));
      formData.append("type", JSON.stringify(type));
      formData.append("content", content);
      formData.append("inStock", stock);
      formData.append("imageGalley", JSON.stringify(imageGallery));
      formData.append("imageThumb", data.image);
      files.length > 0
        ? files.forEach((file) => formData.append("gallery", file))
        : formData.append("gallery", null);
      formData.append(
        "slug",
        slugify(name, {
          remove: /[*+~.()'"!:@&$#%,]/g,
          lower: true,
        })
      );

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/product/edit/${data.id}`,
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
        setMessage("Product Updated !");
      }
    } catch (error) {
      setProcessingStatus(false);
      setAlertType("error");
      setMessage(error.message);
      console.log(error.message);
    }
  }

  return (
    <div className="pb-16 pt-8">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3  md:pr-5">
            Product Image
          </p>
          <div className="flex w-full md:w-2/3 ">
            <Dropzone
              onDrop={(acceptedFiles) => setProductImage(acceptedFiles[0])}
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
                        Click here to upload item image
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
                  productImage ? URL.createObjectURL(productImage) : data.image
                }
                alt="product photo"
              />
            </div>
          </div>
        </div>

        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3  md:pr-5">
            Product Image Gallery
          </p>
          <div className="flex w-full md:w-2/3 ">
            <div
              {...getRootProps({
                className:
                  "border-dashed border-2 border-border-base w-full py-4 px-4 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none",
              })}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center gap-4">
                <UploadIcon className="text-slate-400" color="#7f7777" />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag & drop files here, or click to select files</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 text-[10px] font-medium italic text-blue-700 sm:pr-4 md:w-1/3  md:pr-5">
            Gallery Image Preview
          </p>
          <div className=" flex w-full justify-center md:w-2/3 ">
            <ul className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {imageGallery.length > 0 &&
                imageGallery.map((item, idx) => (
                  <li key={idx} className="relative h-32 rounded-md shadow-lg">
                    <Image
                      src={item}
                      alt={`image-${idx}`}
                      width={100}
                      height={100}
                      className="relative h-full w-full rounded-md object-contain"
                    />
                    <CloseButton
                      onClick={() => removeFileFromGallery(item)}
                      color="#FF0000"
                    />
                  </li>
                ))}

              {files.map((file) => (
                <li
                  key={file.name}
                  className="relative h-32 rounded-md shadow-lg"
                >
                  <Image
                    src={file.preview}
                    alt={file.name}
                    width={100}
                    height={100}
                    onLoad={() => {
                      URL.revokeObjectURL(file.preview);
                    }}
                    className="relative h-full w-full rounded-md object-contain"
                  />
                  <CloseButton
                    onClick={() => removeFile(file.name)}
                    color="#FF0000"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3  md:pr-5">
            Product Name
          </p>
          <Input
            type="text"
            variant="outline"
            className="w-full md:w-2/3"
            placeholder="Product Name"
            {...register("name", {
              required: "product name is required !",
            })}
            error={errors.name?.message}
          />
        </div>

        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3  md:pr-5">
            Product Description
          </p>
          <Input
            type="text"
            variant="outline"
            className="w-full md:w-2/3"
            placeholder="Product Description"
            {...register("description", {
              required: "product description is required !",
            })}
            error={errors.description?.message}
          />
        </div>

        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3 md:pr-5">
            Product Type
          </p>
          <Select
            className=" w-full md:w-2/3"
            defaultValue={productType}
            options={productTypeOptions}
            isSearchable={false}
            onChange={(value) => setProductType(value)}
            isMulti={true}
          />
        </div>

        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3 md:pr-5">
            Product Category
          </p>
          <Select
            className=" w-full md:w-2/3"
            defaultValue={category}
            options={productCategoryOptions}
            isSearchable={false}
            onChange={(value) => setCategory(value)}
            isMulti={true}
          />
        </div>

        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3 md:pr-5">
            Product Sub-Category
          </p>
          <Select
            className=" w-full md:w-2/3"
            defaultValue={subCategory}
            options={productSubCategoryOptions}
            isSearchable={false}
            onChange={(value) => setSubCategory(value)}
            isMulti={true}
          />
        </div>

        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3 md:pr-5">
            Price
          </p>
          <Input
            type="text"
            variant="outline"
            className="w-full md:w-2/3"
            placeholder="Product M.R.P"
            {...register("price", {
              required: "product price is required !",
              pattern: {
                value: /^\d+$/,
                message: "Invalid Input",
              },
            })}
            error={errors.price?.message}
          />
        </div>
        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3 md:pr-5">
            Sale Price
          </p>
          <Input
            type="text"
            variant="outline"
            className="w-full md:w-2/3"
            placeholder="Product Sale Price"
            {...register("sprice", {
              required: "product sale price is required !",
              pattern: {
                value: /^\d+$/,
                message: "Invalid Input",
              },
            })}
            error={errors.sprice?.message}
          />
        </div>
        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3 md:pr-5">
            Quantity In Stock
          </p>
          <Input
            type="text"
            variant="outline"
            className="w-full md:w-2/3"
            placeholder="Product Stock Quantity"
            {...register("stock", {
              required: "stock value is required !",
              pattern: {
                value: /^\d+$/,
                message: "Invalid Input",
              },
            })}
            error={errors.stock?.message}
          />
        </div>

        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3  md:pr-5">
            Product Unit
          </p>
          <Input
            type="text"
            variant="outline"
            className="w-full md:w-2/3"
            placeholder="e.g. 100 Ml , 1 Pcs .."
            {...register("unit", {
              required: "product unit is required !",
            })}
            error={errors.unit?.message}
          />
        </div>

        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3 md:pr-5">
            Product Status
          </p>
          <Select
            className=" w-full md:w-2/3"
            defaultValue={status}
            options={productStatusOptions}
            isSearchable={false}
            onChange={(value) => setStatus(value)}
          />
        </div>

        <div className="mb-2 flex flex-col justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3 md:pr-5">
            Product Detailed Description
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
                Updating ..{" "}
                <span>
                  <Spinner
                    simple={true}
                    className="-mr-1 ml-3 h-4 w-4 animate-spin "
                  />
                </span>
              </>
            ) : (
              "Update"
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

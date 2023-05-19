import React, { useState, useEffect, useRef } from "react";
import download from "js-file-download";
import { toast } from "react-toastify";

const FilesPage: React.FC = () => {
  const [planInfo, setPlanInfo] = useState<Blob | null>();
  const [planPricing, setPlanPricing] = useState<Blob | null>();
  const refPlanInfo = useRef<HTMLInputElement>(null);
  const refPlanPricing = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    if (message === "failed") {
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

    if (message === "success") {
      toast.success("File uploaded successfully !", {
        progressClassName: "fancy-progress-bar",
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [message]);

  const downloadPlanInfo = async () => {
    const res = await fetch(`${process.env.API_URL}/plans`);
    const data = await res.json();
    download(JSON.stringify(data), "plans-information.json");
  };

  const downloadPlanPricing = async () => {
    const res = await fetch(`${process.env.API_URL}/pricing`);
    const data = await res.json();
    download(JSON.stringify(data), "plans-pricing.json");
  };

  const uploadPlanInfo = async () => {
    setMessage("");
    if (!planInfo) {
      alert("Please select json file with plans detailed information !");
      return;
    }

    const formData = new FormData();
    formData.append("uploadedFile", planInfo);
    try {
      const res = await fetch(`${process.env.API_URL}/plans`, {
        method: "POST",
        body: formData,
      });

      if (res.status >= 400 && res.status < 600) {
        throw new Error("Bad response from server");
      } else {
        setPlanInfo(null);
        refPlanInfo.current!.value = "";
        setMessage("success");
      }
    } catch (error) {
      setMessage("failed");
    }
  };

  const uploadPlanPricing = async () => {
    setMessage("");
    if (!planPricing) {
      alert("Please select json file with plans pricing information !");
      return;
    }

    const formData = new FormData();
    formData.append("uploadedFile", planPricing);
    try {
      const res = await fetch(`${process.env.API_URL}/pricing`, {
        method: "POST",
        body: formData,
      });

      if (res.status >= 400 && res.status < 600) {
        throw new Error("Bad response from server");
      } else {
        setPlanPricing(null);
        refPlanPricing.current!.value = "";
        setMessage("success");
      }
    } catch (error) {
      setMessage("failed");
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center lg:justify-between mb-2">
        <table>
          <tr>
            <td>
              <input
                type="file"
                ref={refPlanInfo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const target = e.target as HTMLInputElement;
                  const file = target.files![0];
                  setPlanInfo(file);
                }}
                className="w-[264px] px-2 py-1 text-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </td>
            <td>
              <button
                onClick={uploadPlanInfo}
                className="px-5 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Upload Plans Detailed Information
              </button>
            </td>
            <td>
              <button
                onClick={downloadPlanInfo}
                className="px-5 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Download Plans Detailed Information
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="file"
                ref={refPlanPricing}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const target = e.target as HTMLInputElement;
                  const file = target.files![0];
                  setPlanPricing(file);
                }}
                className="w-[264px] px-2 py-1 text-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </td>
            <td>
              <button
                onClick={uploadPlanPricing}
                className="px-5 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Upload Plans Pricing Information
              </button>
            </td>
            <td>
              <button
                onClick={downloadPlanPricing}
                className="px-5 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Download Plans Pricing Information
              </button>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default FilesPage;

import React, { useState, useEffect, useRef } from "react";
import download from "js-file-download";
import { toast } from "react-toastify";

const FilesPage: React.FC = () => {
  const refSixEnglish = useRef<HTMLInputElement>(null);
  const refSixHindi = useRef<HTMLInputElement>(null);
  const refSevenEnglish = useRef<HTMLInputElement>(null);
  const refSevenHindi = useRef<HTMLInputElement>(null);
  const refEightEnglish = useRef<HTMLInputElement>(null);
  const refEightHindi = useRef<HTMLInputElement>(null);
  const refNineEnglish = useRef<HTMLInputElement>(null);
  const refNineHindi = useRef<HTMLInputElement>(null);
  const refTenEnglish = useRef<HTMLInputElement>(null);
  const refTenHindi = useRef<HTMLInputElement>(null);
  const refElevenEnglish = useRef<HTMLInputElement>(null);
  const refElevenHindi = useRef<HTMLInputElement>(null);
  const refTwelveEnglish = useRef<HTMLInputElement>(null);
  const refTwelveHindi = useRef<HTMLInputElement>(null);

  const [classSixEnglish, setClassSixEnglish] = useState<Blob | null>();
  const [classSixHindi, setClassSixHindi] = useState<Blob | null>();
  const [classSevenEnglish, setClassSevenEnglish] = useState<Blob | null>();
  const [classSevenHindi, setClassSevenHindi] = useState<Blob | null>();
  const [classEightEnglish, setClassEightEnglish] = useState<Blob | null>();
  const [classEightHindi, setClassEightHindi] = useState<Blob | null>();
  const [classNineEnglish, setClassNineEnglish] = useState<Blob | null>();
  const [classNineHindi, setClassNineHindi] = useState<Blob | null>();
  const [classTenEnglish, setClassTenEnglish] = useState<Blob | null>();
  const [classTenHindi, setClassTenHindi] = useState<Blob | null>();
  const [classElevenEnglish, setClassElevenEnglish] = useState<Blob | null>();
  const [classElevenHindi, setClassElevenHindi] = useState<Blob | null>();
  const [classTwelveEnglish, setClassTwelveEnglish] = useState<Blob | null>();
  const [classTwelveHindi, setClassTwelveHindi] = useState<Blob | null>();

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

  const downloadSixEnglish = async () => {
    const res = await fetch(`${process.env.API_URL}/subject/six/english`);
    const data = await res.json();
    download(JSON.stringify(data), "six-english.json");
  };

  const downloadSixHindi = async () => {
    const res = await fetch(`${process.env.API_URL}/subject/six/hindi`);
    const data = await res.json();
    download(JSON.stringify(data), "six-hindi.json");
  };

  const downloadSevenEnglish = async () => {
    const res = await fetch(`${process.env.API_URL}/subject/seven/english`);
    const data = await res.json();
    download(JSON.stringify(data), "seven-english.json");
  };
  const downloadSevenHindi = async () => {
    const res = await fetch(`${process.env.API_URL}/subject/seven/hindi`);
    const data = await res.json();
    download(JSON.stringify(data), "seven-hindi.json");
  };

  const downloadEightEnglish = async () => {
    const res = await fetch(`${process.env.API_URL}/subject/eight/english`);
    const data = await res.json();
    download(JSON.stringify(data), "eight-english.json");
  };
  const downloadEightHindi = async () => {
    const res = await fetch(`${process.env.API_URL}/subject/eight/hindi`);
    const data = await res.json();
    download(JSON.stringify(data), "eight-hindi.json");
  };
  const downloadNineEnglish = async () => {
    const res = await fetch(`${process.env.API_URL}/subject/nine/english`);
    const data = await res.json();
    download(JSON.stringify(data), "nine-english.json");
  };
  const downloadNineHindi = async () => {
    const res = await fetch(`${process.env.API_URL}/subject/nine/hindi`);
    const data = await res.json();
    download(JSON.stringify(data), "nine-hindi.json");
  };

  const downloadTenEnglish = async () => {
    const res = await fetch(`${process.env.API_URL}/subject/ten/english`);
    const data = await res.json();
    download(JSON.stringify(data), "ten-english.json");
  };
  const downloadTenHindi = async () => {
    const res = await fetch(`${process.env.API_URL}/subject/ten/hindi`);
    const data = await res.json();
    download(JSON.stringify(data), "ten-hindi.json");
  };

  const downloadElevenEnglish = async () => {
    const res = await fetch(`${process.env.API_URL}/subject/eleven/english`);
    const data = await res.json();
    download(JSON.stringify(data), "eleven-english.json");
  };
  const downloadElevenHindi = async () => {
    const res = await fetch(`${process.env.API_URL}/subject/eleven/hindi`);
    const data = await res.json();
    download(JSON.stringify(data), "eleven-hindi.json");
  };

  const downloadTwelveEnglish = async () => {
    const res = await fetch(`${process.env.API_URL}/subject/twelve/english`);
    const data = await res.json();
    download(JSON.stringify(data), "twelve-english.json");
  };
  const downloadtwelveHindi = async () => {
    const res = await fetch(`${process.env.API_URL}/subject/twelve/hindi`);
    const data = await res.json();
    download(JSON.stringify(data), "twelve-hindi.json");
  };

  const uploadSixEnglish = async () => {
    setMessage("");
    if (!classSixEnglish) {
      alert("Please select json file for class six -  english medium !");
      return;
    }

    const formData = new FormData();
    formData.append("uploadedFile", classSixEnglish);
    try {
      const res = await fetch(`${process.env.API_URL}/subject/six/english`, {
        method: "POST",
        body: formData,
      });

      if (res.status >= 400 && res.status < 600) {
        throw new Error("Bad response from server");
      } else {
        setClassSixEnglish(null);
        refSixEnglish.current!.value = "";
        setMessage("success");
      }
    } catch (error) {
      setMessage("failed");
    }
  };

  const uploadSixHindi = async () => {
    setMessage("");
    if (!classSixHindi) {
      alert("Please select json file for class six -  hindi medium !");
      return;
    }

    const formData = new FormData();
    formData.append("uploadedFile", classSixHindi);
    try {
      const res = await fetch(`${process.env.API_URL}/subject/six/hindi`, {
        method: "POST",
        body: formData,
      });

      if (res.status >= 400 && res.status < 600) {
        throw new Error("Bad response from server");
      } else {
        setClassSixHindi(null);
        refSixHindi.current!.value = "";
        setMessage("success");
      }
    } catch (error) {
      setMessage("failed");
    }
  };

  const uploadSevenEnglish = async () => {
    setMessage("");
    if (!classSevenEnglish) {
      alert("Please select json file for class seven -  english medium !");
      return;
    }

    const formData = new FormData();
    formData.append("uploadedFile", classSevenEnglish);
    try {
      const res = await fetch(`${process.env.API_URL}/subject/seven/english`, {
        method: "POST",
        body: formData,
      });

      if (res.status >= 400 && res.status < 600) {
        throw new Error("Bad response from server");
      } else {
        setClassSevenEnglish(null);
        refSevenEnglish.current!.value = "";
        setMessage("success");
      }
    } catch (error) {
      setMessage("failed");
    }
  };

  const uploadSevenHindi = async () => {
    setMessage("");
    if (!classSevenHindi) {
      alert("Please select json file for class seven -  hindi medium !");
      return;
    }

    const formData = new FormData();
    formData.append("uploadedFile", classSevenHindi);
    try {
      const res = await fetch(`${process.env.API_URL}/subject/seven/hindi`, {
        method: "POST",
        body: formData,
      });

      if (res.status >= 400 && res.status < 600) {
        throw new Error("Bad response from server");
      } else {
        setClassSevenHindi(null);
        refSevenHindi.current!.value = "";
        setMessage("success");
      }
    } catch (error) {
      setMessage("failed");
    }
  };

  const uploadEightEnglish = async () => {
    setMessage("");
    if (!classEightEnglish) {
      alert("Please select json file for class eight-  english medium !");
      return;
    }

    const formData = new FormData();
    formData.append("uploadedFile", classEightEnglish);
    try {
      const res = await fetch(`${process.env.API_URL}/subject/eight/english`, {
        method: "POST",
        body: formData,
      });

      if (res.status >= 400 && res.status < 600) {
        throw new Error("Bad response from server");
      } else {
        setClassEightEnglish(null);
        refEightEnglish.current!.value = "";
        setMessage("success");
      }
    } catch (error) {
      setMessage("failed");
    }
  };

  const uploadEightHindi = async () => {
    setMessage("");
    if (!classEightHindi) {
      alert("Please select json file for class eight -  hindi medium !");
      return;
    }

    const formData = new FormData();
    formData.append("uploadedFile", classEightHindi);
    try {
      const res = await fetch(`${process.env.API_URL}/subject/eight/hindi`, {
        method: "POST",
        body: formData,
      });

      if (res.status >= 400 && res.status < 600) {
        throw new Error("Bad response from server");
      } else {
        setClassEightHindi(null);
        refEightHindi.current!.value = "";
        setMessage("success");
      }
    } catch (error) {
      setMessage("failed");
    }
  };

  const uploadNineEnglish = async () => {
    setMessage("");
    if (!classNineEnglish) {
      alert("Please select json file for class nine -  english medium !");
      return;
    }

    const formData = new FormData();
    formData.append("uploadedFile", classNineEnglish);
    try {
      const res = await fetch(`${process.env.API_URL}/subject/nine/english`, {
        method: "POST",
        body: formData,
      });

      if (res.status >= 400 && res.status < 600) {
        throw new Error("Bad response from server");
      } else {
        setClassNineEnglish(null);
        refNineEnglish.current!.value = "";
        setMessage("success");
      }
    } catch (error) {
      setMessage("failed");
    }
  };

  const uploadNineHindi = async () => {
    setMessage("");
    if (!classNineHindi) {
      alert("Please select json file for class nine -  hindi medium !");
      return;
    }

    const formData = new FormData();
    formData.append("uploadedFile", classNineHindi);
    try {
      const res = await fetch(`${process.env.API_URL}/subject/nine/hindi`, {
        method: "POST",
        body: formData,
      });

      if (res.status >= 400 && res.status < 600) {
        throw new Error("Bad response from server");
      } else {
        setClassNineHindi(null);
        refNineHindi.current!.value = "";
        setMessage("success");
      }
    } catch (error) {
      setMessage("failed");
    }
  };

  const uploadTenEnglish = async () => {
    setMessage("");
    if (!classTenEnglish) {
      alert("Please select json file for class nine -  english medium !");
      return;
    }

    const formData = new FormData();
    formData.append("uploadedFile", classTenEnglish);
    try {
      const res = await fetch(`${process.env.API_URL}/subject/ten/english`, {
        method: "POST",
        body: formData,
      });

      if (res.status >= 400 && res.status < 600) {
        throw new Error("Bad response from server");
      } else {
        setClassTenEnglish(null);
        refTenEnglish.current!.value = "";
        setMessage("success");
      }
    } catch (error) {
      setMessage("failed");
    }
  };

  const uploadTenHindi = async () => {
    setMessage("");
    if (!classTenHindi) {
      alert("Please select json file for class ten -  hindi medium !");
      return;
    }

    const formData = new FormData();
    formData.append("uploadedFile", classTenHindi);
    try {
      const res = await fetch(`${process.env.API_URL}/subject/ten/hindi`, {
        method: "POST",
        body: formData,
      });

      if (res.status >= 400 && res.status < 600) {
        throw new Error("Bad response from server");
      } else {
        setClassTenHindi(null);
        refTenHindi.current!.value = "";
        setMessage("success");
      }
    } catch (error) {
      setMessage("failed");
    }
  };

  const uploadElevenEnglish = async () => {
    setMessage("");
    if (!classElevenEnglish) {
      alert("Please select json file for class eleven -  english medium !");
      return;
    }

    const formData = new FormData();
    formData.append("uploadedFile", classElevenEnglish);
    try {
      const res = await fetch(`${process.env.API_URL}/subject/eleven/english`, {
        method: "POST",
        body: formData,
      });

      if (res.status >= 400 && res.status < 600) {
        throw new Error("Bad response from server");
      } else {
        setClassElevenEnglish(null);
        refElevenEnglish.current!.value = "";
        setMessage("success");
      }
    } catch (error) {
      setMessage("failed");
    }
  };

  const uploadElevenHindi = async () => {
    setMessage("");
    if (!classElevenHindi) {
      alert("Please select json file for class eleven -  hindi medium !");
      return;
    }

    const formData = new FormData();
    formData.append("uploadedFile", classElevenHindi);
    try {
      const res = await fetch(`${process.env.API_URL}/subject/eleven/hindi`, {
        method: "POST",
        body: formData,
      });

      if (res.status >= 400 && res.status < 600) {
        throw new Error("Bad response from server");
      } else {
        setClassElevenHindi(null);
        refElevenHindi.current!.value = "";
        setMessage("success");
      }
    } catch (error) {
      setMessage("failed");
    }
  };

  const uploadTwelveEnglish = async () => {
    setMessage("");
    if (!classTwelveEnglish) {
      alert("Please select json file for class twelve -  english medium !");
      return;
    }

    const formData = new FormData();
    formData.append("uploadedFile", classTwelveEnglish);
    try {
      const res = await fetch(`${process.env.API_URL}/subject/twelve/english`, {
        method: "POST",
        body: formData,
      });

      if (res.status >= 400 && res.status < 600) {
        throw new Error("Bad response from server");
      } else {
        setClassTwelveEnglish(null);
        refTwelveEnglish.current!.value = "";
        setMessage("success");
      }
    } catch (error) {
      setMessage("failed");
    }
  };

  const uploadTwelveHindi = async () => {
    setMessage("");
    if (!classTwelveHindi) {
      alert("Please select json file for class twelve -  hindi medium !");
      return;
    }

    const formData = new FormData();
    formData.append("uploadedFile", classTwelveHindi);
    try {
      const res = await fetch(`${process.env.API_URL}/subject/twelve/hindi`, {
        method: "POST",
        body: formData,
      });

      if (res.status >= 400 && res.status < 600) {
        throw new Error("Bad response from server");
      } else {
        setClassTwelveHindi(null);
        refTwelveHindi.current!.value = "";
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
                ref={refSixEnglish}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const target = e.target as HTMLInputElement;
                  const file = target.files![0];
                  setClassSixEnglish(file);
                }}
                className="w-[264px] px-2 py-1 text-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </td>
            <td>
              <button
                onClick={uploadSixEnglish}
                className="px-5 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Upload Class VI English Medium Subjects
              </button>
            </td>
            <td>
              <button
                onClick={downloadSixEnglish}
                className="px-5 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Download Class VI English Medium Subjects
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="file"
                ref={refSixHindi}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const target = e.target as HTMLInputElement;
                  const file = target.files![0];
                  setClassSixHindi(file);
                }}
                className="w-[240px] px-2 py-1 text-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </td>
            <td>
              <button
                onClick={uploadSixHindi}
                className="px-5 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Upload Class VI Hindi Medium Subjects
              </button>
            </td>
            <td>
              <button
                onClick={downloadSixHindi}
                className="px-5 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Download Class VI Hindi Medium Subjects
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="file"
                ref={refSevenEnglish}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const target = e.target as HTMLInputElement;
                  const file = target.files![0];
                  setClassSevenEnglish(file);
                }}
                className="w-[240px] px-2 py-1 text-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </td>
            <td>
              <button
                onClick={uploadSevenEnglish}
                className="px-5 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Upload Class VII English Medium Subjects
              </button>
            </td>
            <td>
              <button
                onClick={downloadSevenEnglish}
                className="px-4 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Download Class VII English Medium Subjects
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="file"
                ref={refSevenHindi}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const target = e.target as HTMLInputElement;
                  const file = target.files![0];
                  setClassSevenHindi(file);
                }}
                className="w-[240px] px-2 py-1 text-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </td>
            <td>
              <button
                onClick={uploadSevenHindi}
                className="px-5 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Upload Class VII Hindi Medium Subjects
              </button>
            </td>
            <td>
              <button
                onClick={downloadSevenHindi}
                className="px-4 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Download Class VII Hindi Medium Subjects
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="file"
                ref={refEightEnglish}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const target = e.target as HTMLInputElement;
                  const file = target.files![0];
                  setClassEightEnglish(file);
                }}
                className="w-[240px] px-2 py-1 text-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </td>
            <td>
              <button
                onClick={uploadEightEnglish}
                className="px-4 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Upload Class VIII English Medium Subjects
              </button>
            </td>
            <td>
              <button
                onClick={downloadEightEnglish}
                className="px-4 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Download Class VIII English Medium Subjects
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="file"
                ref={refEightHindi}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const target = e.target as HTMLInputElement;
                  const file = target.files![0];
                  setClassEightHindi(file);
                }}
                className="w-[240px] px-2 py-1 text-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </td>
            <td>
              <button
                onClick={uploadEightHindi}
                className="px-4 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Upload Class VIII Hindi Medium Subjects
              </button>
            </td>
            <td>
              <button
                onClick={downloadEightHindi}
                className="px-4 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Download Class VIII Hindi Medium Subjects
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="file"
                ref={refNineEnglish}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const target = e.target as HTMLInputElement;
                  const file = target.files![0];
                  setClassNineEnglish(file);
                }}
                className="w-[240px] px-2 py-1 text-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </td>
            <td>
              <button
                onClick={uploadNineEnglish}
                className="px-4 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Upload Class IX English Medium Subjects
              </button>
            </td>
            <td>
              <button
                onClick={downloadNineEnglish}
                className="px-4 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Download Class IX English Medium Subjects
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="file"
                ref={refNineHindi}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const target = e.target as HTMLInputElement;
                  const file = target.files![0];
                  setClassNineHindi(file);
                }}
                className="w-[240px] px-2 py-1 text-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </td>
            <td>
              <button
                onClick={uploadNineHindi}
                className="px-4 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Upload Class IX Hindi Medium Subjects
              </button>
            </td>
            <td>
              <button
                onClick={downloadNineHindi}
                className="px-4 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Download Class IX Hindi Medium Subjects
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="file"
                ref={refTenEnglish}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const target = e.target as HTMLInputElement;
                  const file = target.files![0];
                  setClassTenEnglish(file);
                }}
                className="w-[240px] px-2 py-1 text-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </td>
            <td>
              <button
                onClick={uploadTenEnglish}
                className="px-4 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Upload Class X English Medium Subjects
              </button>
            </td>
            <td>
              <button
                onClick={downloadTenEnglish}
                className="px-4 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Download Class X English Medium Subjects
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="file"
                ref={refTenHindi}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const target = e.target as HTMLInputElement;
                  const file = target.files![0];
                  setClassTenHindi(file);
                }}
                className="w-[240px] px-2 py-1 text-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </td>
            <td>
              <button
                onClick={uploadTenHindi}
                className="px-4 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Upload Class X Hindi Medium Subjects
              </button>
            </td>
            <td>
              <button
                onClick={downloadTenHindi}
                className="px-4 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Download Class X Hindi Medium Subjects
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="file"
                ref={refElevenEnglish}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const target = e.target as HTMLInputElement;
                  const file = target.files![0];
                  setClassElevenEnglish(file);
                }}
                className="w-[240px] px-2 py-1 text-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </td>
            <td>
              <button
                onClick={uploadElevenEnglish}
                className="px-4 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Upload Class XI English Medium Subjects
              </button>
            </td>
            <td>
              <button
                onClick={downloadElevenEnglish}
                className="px-4 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Download Class XI English Medium Subjects
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="file"
                ref={refElevenHindi}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const target = e.target as HTMLInputElement;
                  const file = target.files![0];
                  setClassElevenHindi(file);
                }}
                className="w-[240px] px-2 py-1 text-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </td>
            <td>
              <button
                onClick={uploadElevenHindi}
                className="px-4 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Upload Class XI Hindi Medium Subjects
              </button>
            </td>
            <td>
              <button
                onClick={downloadElevenHindi}
                className="px-4 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Download Class XI Hindi Medium Subjects
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="file"
                ref={refTwelveEnglish}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const target = e.target as HTMLInputElement;
                  const file = target.files![0];
                  setClassTwelveEnglish(file);
                }}
                className="w-[240px] px-2 py-1 text-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </td>
            <td>
              <button
                onClick={uploadTwelveEnglish}
                className="px-4 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Upload Class XII English Medium Subjects
              </button>
            </td>
            <td>
              <button
                onClick={downloadTwelveEnglish}
                className="px-4 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Download Class XII English Medium Subjects
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="file"
                ref={refTwelveHindi}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const target = e.target as HTMLInputElement;
                  const file = target.files![0];
                  setClassTwelveHindi(file);
                }}
                className="w-[240px] px-2 py-1 text-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </td>
            <td>
              <button
                onClick={uploadTwelveHindi}
                className="px-4 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Upload Class XII Hindi Medium Subjects
              </button>
            </td>
            <td>
              <button
                onClick={downloadtwelveHindi}
                className="px-4 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 border text-sm w-[324px]"
              >
                Download Class XII Hindi Medium Subjects
              </button>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default FilesPage;

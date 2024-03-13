import React, { useState } from "react";
import dayjs from "dayjs";
import Alert from "@components/ui/alert";

const FeedbackDetail = ({ data }) => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const updateFeedbackStatus = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/feedback/status`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            id: data.id,
            mobile: data.mobile,
            status: data.status === "Published" ? "Un-Published" : "Published",
          }),
        }
      );

      const result = await res.json();

      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        setMessage("success");
        setError(
          data.status === "Published"
            ? "Feedback un-published successfully !"
            : "Feedback published successfully !"
        );
      }
    } catch (error) {
      setMessage("failed");
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1>{data.name}</h1>
      <h1>{data.mobile}</h1>
      <h3>{data.category}</h3>
      <h4>{data.message}</h4>
      <h1>{dayjs(data.createdAt).format("DD/MM/YYYY")}</h1>
      {data.messagePhoto && (
        <img
          className="rounded-md"
          src={data.messagePhoto}
          width={320}
          height={320}
          alt={data.name}
        />
      )}
      <button
        onClick={updateFeedbackStatus}
        className="bg-orange-500 px-8 py-1.5 font-medium text-white hover:bg-opacity-90"
      >
        {data.status === "Published"
          ? "Un-Publish Feedback"
          : "Publish Feedback"}
      </button>

      {message === "failed" && (
        <Alert
          message={error}
          variant="error"
          closeable={true}
          className="my-2"
          onClose={() => setError(null)}
        />
      )}
      {message === "success" && (
        <Alert
          message={error}
          variant="success"
          closeable={true}
          className="my-2"
          onClose={() => setError(null)}
        />
      )}
    </div>
  );
};

export default FeedbackDetail;

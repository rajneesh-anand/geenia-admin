import React, { useState } from "react";
import dayjs from "dayjs";
import Alert from "@components/ui/alert";

const GiftDetail = ({ data }) => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const updateOrderStatus = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/coin/order/status`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ mobile: data.mobile, code: data.redeemCode }),
        }
      );

      const result = await res.json();

      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        setMessage("success");
        setError("Order status updated successfully !");
      }
    } catch (error) {
      setMessage("failed");
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <h1>{data.product}</h1>
        <h1>{dayjs(data.createdAt).format("DD/MM/YYYY")}</h1>
        <h1>{data.redeemStatus}</h1>

        <button onClick={updateOrderStatus}>Send Order</button>

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
    </>
  );
};

export default GiftDetail;

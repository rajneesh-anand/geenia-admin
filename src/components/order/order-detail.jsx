import React, { useState } from "react";
import dayjs from "dayjs";
import Alert from "@components/ui/alert";
import Image from "next/image";

const OrderDetail = ({ data }) => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const updateOrderStatus = async (orderStatus) => {
    console.log(orderStatus);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/order/status`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            orderNumber: data.orderNumber,
            status: orderStatus,
          }),
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
      <div className="flex">
        <div className="w-1/2">
          <div className="flex">
            <h3>Order Number</h3>
            <h3>{data.orderNumber}</h3>
          </div>
          <div className="flex">
            <h3>Customer Name</h3>
            <h3>{data.name}</h3>
          </div>
          <div className="flex">
            <h3>Customer Mobile</h3>
            <h3>{data.mobile}</h3>
          </div>
          <div className="flex">
            <h3>Customer Email</h3>
            <h3>{data.email}</h3>
          </div>
          <div className="flex">
            <h3>Customer Address</h3>
            <h3>{data.address}</h3>
          </div>
          <div className="flex">
            <h3>City</h3>
            <h3>{data.city}</h3>
          </div>
          <div className="flex">
            <h3>State</h3>
            <h3>{data.state}</h3>
          </div>
          <div className="flex">
            <h3>PIN Code</h3>
            <h3>{data.pincode}</h3>
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex">
            <h3>Order Date</h3>
            <h3> {dayjs(data.orderDate).format("DD/MM/YYYY")}</h3>
          </div>
          <div className="flex">
            <h3>Shipping AMount</h3>
            <h3>{data.shipping}</h3>
          </div>
          <div className="flex">
            <h3>Total Amount</h3>
            <h3>{data.totalAmount}</h3>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                Product Image
              </th>
              <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                Product Name
              </th>
              <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                Unit Price
              </th>
              <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                Qnty
              </th>
              <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {JSON.parse(data.orderItem).map((item, index) => (
              <tr>
                <td>
                  <Image
                    src={item?.image ?? "/images/placeholder/product.svg"}
                    width={100}
                    height={100}
                    loading="eager"
                    alt={item.name || "Product Image"}
                    className="object-cover"
                  />
                </td>
                <td className="font-medium text-left text-[12px] lg:text-[14px]">
                  {item.name}
                </td>
                <td className="font-medium text-center text-[12px] lg:text-[14px]">
                  {item.price}
                </td>
                <td className="font-medium text-center text-[12px] lg:text-[14px]">
                  {item.quantity}
                </td>
                <td className="font-medium text-center text-[12px] lg:text-[14px]">
                  {item.itemTotal}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => updateOrderStatus("Cancel")}
          className="px-8 py-1.5 bg-yellow text-white hover:bg-yellow/70"
        >
          Cancel Order
        </button>
        <button
          onClick={() => updateOrderStatus("Shipped")}
          className="px-8 py-1.5 ml-2 bg-green-600 text-white hover:bg-green-500"
        >
          Dispatch Order
        </button>
      </div>
      <div className="text-center">
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

export default OrderDetail;

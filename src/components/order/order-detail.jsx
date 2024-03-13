import React, { useState } from "react";
import dayjs from "dayjs";
import Alert from "@components/ui/alert";
import Image from "next/image";

function maskMobileNumber(number) {
  return (
    "+91" +
    " " +
    number.slice(0, 3) +
    " " +
    number.slice(3, 6) +
    "-" +
    number.slice(6, 10)
  );
}

const OrderDetail = ({ data }) => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const updateOrderStatus = async (orderStatus) => {
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
      <div className="flex pb-8">
        <table className="w-3/4">
          <tbody>
            <tr>
              <td>
                <h3 className="font-semibold">Order Number</h3>
              </td>
              <td>
                <h3>{data.orderNumber}</h3>
              </td>
            </tr>
            <tr>
              <td>
                <h3 className="font-semibold">Order Date</h3>
              </td>
              <td>
                <h3> {dayjs(data.orderDate).format("DD/MM/YYYY")}</h3>
              </td>
            </tr>
            <tr>
              <td>
                <h3 className="font-semibold">Customer Name</h3>
              </td>
              <td>
                <h3>{data.name}</h3>
              </td>
            </tr>
            <tr>
              <td>
                <h3 className="font-semibold">Customer Mobile</h3>
              </td>
              <td>
                <h3>{maskMobileNumber(data.mobile)}</h3>
              </td>
            </tr>
            <tr>
              <td>
                <h3 className="font-semibold">Customer Email</h3>
              </td>
              <td>
                <h3>{data.email}</h3>
              </td>
            </tr>
            <tr>
              <td>
                <h3 className="font-semibold">Customer Address</h3>
              </td>
              <td>
                <h3>{data.address}</h3>
              </td>
            </tr>
            <tr>
              <td>
                <h3 className="font-semibold">City</h3>
              </td>
              <td>
                <h3>{data.city}</h3>
              </td>
            </tr>
            <tr>
              <td>
                <h3 className="font-semibold">State</h3>
              </td>
              <td>
                <h3>{data.state}</h3>
              </td>
            </tr>
            <tr>
              <td>
                <h3 className="font-semibold">Pincode</h3>
              </td>
              <td>
                <h3>{data.pincode}</h3>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col py-8 lg:flex-row">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="border-b border-gray-200 bg-gray-50 px-3 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-blue-600">
                Photo
              </th>
              <th className="border-b border-gray-200 bg-gray-50 px-3 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-blue-600">
                Product Name
              </th>
              <th className="border-b border-gray-200 bg-gray-50 px-3 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-blue-600">
                Unit Price
              </th>
              <th className="border-b border-gray-200 bg-gray-50 px-3 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-blue-600">
                Qnty
              </th>
              <th className="border-b border-gray-200 bg-gray-50 px-3 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-blue-600">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {JSON.parse(data.orderItem).map((item, index) => (
              <tr key={index}>
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
                <td className="text-left text-[12px] font-medium lg:text-[14px]">
                  {item.name}
                </td>
                <td className="text-center text-[12px] font-medium lg:text-[14px]">
                  {item.price}
                </td>
                <td className="text-center text-[12px] font-medium lg:text-[14px]">
                  {item.quantity}
                </td>
                <td className="text-center text-[12px] font-medium lg:text-[14px]">
                  {item.itemTotal}
                </td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td className="text-right text-[12px] font-bold lg:text-[14px]">
                Shipping
              </td>
              <td className="text-center text-[12px]  lg:text-[14px]">
                {data.shipping}
              </td>
              <td className="text-right text-[12px] font-bold lg:text-[14px]">
                Total
              </td>
              <td className="text-center text-[12px]  lg:text-[14px]">
                {data.totalAmount}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {message === "failed" && (
        <div className="pt-8 text-center">
          <Alert
            message={error}
            variant="error"
            closeable={true}
            className="my-2"
            onClose={() => setError(null)}
          />
        </div>
      )}
      {message === "success" && (
        <div className="pt-8 text-center">
          <Alert
            message={error}
            variant="success"
            closeable={true}
            className="my-2"
            onClose={() => setError(null)}
          />
        </div>
      )}

      <div className="flex justify-end pb-8">
        <button
          onClick={() => updateOrderStatus("Cancel")}
          className="bg-yellow-500 px-8 py-1.5 text-white hover:bg-opacity-90"
        >
          Cancel Order
        </button>
        <button
          onClick={() => updateOrderStatus("Shipped")}
          className="ml-2 bg-green-600 px-8 py-1.5 text-white hover:bg-green-500"
        >
          Dispatch Order
        </button>
      </div>
    </>
  );
};

export default OrderDetail;

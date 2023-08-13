import React, { useState } from "react";
import dayjs from "dayjs";
import Alert from "@components/ui/alert";
import Image from "next/image";

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
      <div className="flex px-4 py-8">
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
                <h3>{data.mobile}</h3>
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

        <table className="w-1/4">
          <tbody>
            <tr>
              <td className="text-right">
                <h3 className="font-semibold">Order Date</h3>
              </td>
              <td className="text-right">
                <h3> {dayjs(data.orderDate).format("DD/MM/YYYY")}</h3>
              </td>
            </tr>
            <tr>
              <td className="text-right">
                <h3 className="font-semibold">Shipping Amount</h3>
              </td>
              <td className="text-right">
                <h3>{data.shipping}</h3>
              </td>
            </tr>
            <tr>
              <td className="text-right">
                <h3 className="font-semibold">Total Amount</h3>
              </td>
              <td className="text-right">
                <h3>{data.totalAmount}</h3>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col lg:flex-row py-8">
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

      {message === "failed" && (
        <div className="text-center pt-8">
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
        <div className="text-center pt-8">
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
    </>
  );
};

export default OrderDetail;

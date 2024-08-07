import Image from "next/image";
import React, { useRef, useEffect } from "react";
import { generatePDF } from "@/lib/utils";

interface BillProps {
  date: string;
  orderId: string;
  customerName: string;
  customerPhoneNumber: string;
  phoneModel: string;
  phoneBrand: string;
  problemDescription: string;
  totalAmount: number;
  amountPaid: number;
  amountDue: number;
  autoDownload?: boolean;
}

const Bill: React.FC<BillProps> = ({
  date,
  orderId,
  customerName,
  customerPhoneNumber,
  phoneModel,
  phoneBrand,
  problemDescription,
  totalAmount,
  amountPaid,
  amountDue,
  autoDownload = false,
}) => {
  const billRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoDownload && billRef.current) {
      generatePDF(billRef.current);
    }
  }, [autoDownload]);

  return (
    <div
      id="bill"
      className="p-4 w-full max-w-3xl mx-auto min-h-screen bg-white border rounded-lg shadow"
    >
      <div
        ref={billRef}
        className="bg-[#F3F6FF] shadow-md rounded p-8 max-w-3xl w-full"
      >
        <div className="flex justify-between items-center mb-8">
          <Image
            alt="facebook icon"
            width={200}
            height={200}
            className="bg-gray-900 rounded-full object-contain size-32"
            src="https://ucarecdn.com/5f0c61d8-e60b-4fb6-b33d-430f625c02a7/zophix__com2__pdfio_removebgpreview.png"
          />
          <div className="text-right">
            <h2 className="text-xl font-bold">INVOICE</h2>
            <p>{date}</p>
            <p>Order ID: {orderId}</p>
          </div>
        </div>
        <div className="mb-8 flex justify-between">
          <div>
            <h3 className="text-lg font-bold">{customerName}</h3>
            <p>{customerPhoneNumber}</p>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-bold">zophix.com</h3>
            <p>Jaipalpatti Chowk Madhepura</p>
            <p>8877882500</p>
          </div>
        </div>
        <table className="w-full mb-8">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">MODEL</th>
              <th className="p-2 text-left">PROBLEM</th>
              <th className="p-2 text-left">PRICE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">
                {phoneBrand} - {phoneModel}
              </td>
              <td className="p-2">{problemDescription}</td>
              <td className="p-2">{totalAmount}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-between mb-4">
          <div>
            <p className="font-bold">TOTAL AMOUNT</p>
            <p>{totalAmount}</p>
          </div>
          <div>
            <p className="font-bold">PAID</p>
            <p>{amountPaid}</p>
          </div>
          <div>
            <p className="font-bold">AMOUNT DUE</p>
            <p>{amountDue}</p>
          </div>
        </div>
        <p className="text-green-500 font-bold">100 days warranty</p>
        <p className="mt-4 text-center text-sm">Thank you!</p>
        <p className="mt-2 text-center text-xs">
          1-We will not have any responsibility if you do not collect the mobile
          within 10 days. 2-Physical / Water Damaged phone will not be
          considered under any type of warranty or if the repair is attempted at
          home/by any other vendor.
        </p>
      </div>
    </div>
  );
};

export default Bill;

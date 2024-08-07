"use client";
import Bill from "@/components/shared/Bill";
import axios from "axios";
import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
export interface Customer {
  _id: string;
  name: string;
  email: string;
}

export interface Order {
  _id: string;
  issue: string;
  price: number;
  description: string;
  phoneCompany: string;
  phoneModel: string;
  phoneNumber: string;
  customerName: Customer;
  status: string;
  orderAt: string;
  __v: number;
}

const Page = ({ params }: { params: { orderId: string } }) => {
  const [orderData, setOrderData] = useState<Order | null>(null);
  const { orderId } = params;

  const getOrderByid = () => {
    axios
      .get(`/api/get-order-by-id?orderId=${orderId}`)
      .then((response) => {
        setOrderData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getOrderByid();
  }, [orderId]);

  const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString().split("T")[0];
  };
  const downloadPDF = () => {
    const input = document.getElementById("bill");
    if (input) {
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = 210; // A4 width in mm
        const pdfHeight = 297; // A4 height in mm
        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = pdfWidth; // Fit to A4 width
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width; // Maintain aspect ratio

        // If the image height exceeds the page height, fit to page height
        if (imgHeight > pdfHeight) {
          const scaleFactor = pdfHeight / imgHeight;
          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth * scaleFactor, pdfHeight);
        } else {
          const y = (pdfHeight - imgHeight) / 2; // Center the image vertically
          pdf.addImage(imgData, "PNG", 0, y, imgWidth, imgHeight);
        }

        pdf.save("bill.pdf");
      });
    }
  };

  return (
    <div>
      {orderData ? (
        <div className="flex flex-col justify-center items-center gap-4">
          <Bill
            amountDue={0}
            amountPaid={orderData.price} // Assuming no amount is paid yet
            customerName={orderData.customerName.name}
            orderId={orderData._id}
            customerPhoneNumber={orderData.phoneNumber}
            date={getCurrentDate()}
            phoneModel={orderData.phoneModel}
            phoneBrand={orderData.phoneCompany}
            problemDescription={orderData.issue}
            totalAmount={orderData.price}
          />
          <Button variant={"update"} onClick={downloadPDF}>
            Download Bill
          </Button>
        </div>
      ) : (
        <p>Loading order data...</p>
      )}
    </div>
  );
};

export default Page;

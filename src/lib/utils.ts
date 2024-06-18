import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const generatePDF = async (element: HTMLDivElement) => {
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF();
  pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // A4 size
  pdf.save("bill.pdf");
};

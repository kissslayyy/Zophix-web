"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
type BrandName = {
  _id: string;
  phoneCompany: string;
  phoneModal: string;
  serviceName: string;
};

type PricingData = {
  id: string;
  phoneCompany: string;
  phoneModal: string;
  serviceType: string;
  price: number;
};

const Page = () => {
  const [brandNames, setBrandNames] = useState<BrandName[]>([]);
  const [modalNames, setModalNames] = useState<BrandName[]>([]);
  const [service, setService] = useState("");
  const [serviceData, setServiceData] = useState<BrandName[]>([]);
  const [selectedModal, setSelectedModal] = useState("");
  const [selectedModalId, setSelectedModalId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBill, setIsLoadingBill] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [pricingData, setPricingData] = useState<PricingData[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");

  const getBrandNames = () => {
    axios
      .get("/api/phone-company")
      .then((response) => {
        setBrandNames(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getPhoneModal = (id: string) => {
    setIsLoading(true);
    axios
      .get(`/api/phone-modal/?brand=${id}`)
      .then((response) => {
        setSelectedBrand(response.data.data[0]?.phonecompanies || "");
        setModalNames(response.data.data || []);
      })
      .catch((error) => {
        console.log(error);
        setModalNames([]); // Set modalNames to an empty array on error
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const getService = () => {
    setIsLoading(true);
    axios
      .get(
        `/api/get-services-price?phoneCompanyId=${selectedBrandId}&phoneModal=${selectedModalId}
`
      )
      .then((response) => {
        setServiceData(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  console.log(serviceData, "44");
  useEffect(() => {
    getBrandNames();
    getPhoneModal;
  }, []);
  useEffect(() => {
    getService();
  }, [selectedBrandId, selectedModal]);
  return (
    <div className="flex gap-2">
      <select
        name="phoneCompany"
        id="phoneCompany"
        className="inline-flex h-12 w-full items-center justify-center gap-[5px] rounded bg-white px-[15px] text-xl leading-none text-black shadow-[0_2px_10px] shadow-black/10 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
        onChange={(e) => {
          const selectedBrand = brandNames.find(
            (b) => b._id === e.target.value
          );
          if (selectedBrand) {
            setSelectedBrand(selectedBrand.phoneCompany);
            setSelectedBrandId(selectedBrand._id);
            getPhoneModal(selectedBrand._id);
          }
        }}
      >
        <option className="py-4 text-base" value="">
          Select a Your Brand
        </option>
        {brandNames &&
          brandNames.map((e) => (
            <option key={e._id} className="w-full text-xl" value={e._id}>
              {e.phoneCompany}
            </option>
          ))}
      </select>
      <select
        name="phoneModel"
        id="phoneModel"
        className="inline-flex h-12 w-full items-center justify-center gap-[5px] rounded bg-white px-[15px] text-xl leading-none text-black shadow-[0_2px_10px] shadow-black/10 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
        onChange={(e) => {
          const selectedModal = modalNames.find(
            (m) => m.phoneModal === e.target.value
          );
          if (selectedModal) {
            setSelectedModal(selectedModal.phoneModal);
            setSelectedModalId(selectedModal._id);
          }
        }}
      >
        <option className="py-4 text-base" value="">
          Select a Your Model
        </option>
        {modalNames &&
          modalNames.map((e) => (
            <option key={e._id} className="w-full text-xl" value={e.phoneModal}>
              {e.phoneModal}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Page;

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

import { Loader2, Loader2Icon } from "lucide-react";
import EmptySearch from "@/components/shared/EmptySearch";
const FindPrice = () => {
  const [brandNames, setBrandNames] = useState<BrandName[]>([]);
  const [modalNames, setModalNames] = useState<BrandName[]>([]);
  const [serviceData, setServiceData] = useState<PricingData[]>([]);
  const [selectedModal, setSelectedModal] = useState("");
  const [selectedModalId, setSelectedModalId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);

  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState("");

  const getBrandNames = () => {
    setIsLoading(true);
    axios
      .get("/api/phone-company")
      .then((response) => {
        setBrandNames(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        setBrandNames([]);
        setModalNames([]);
        setServiceData([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const getPhoneModal = (id: string) => {
    setIsLoadingModal(true);
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
        setIsLoadingModal(false);
      });
  };
  const getService = () => {
    setIsLoadingPrice(true);
    axios
      .get(
        `/api/get-services-price?phoneCompanyId=${selectedBrandId}&phoneModal=${selectedModalId}
`
      )
      .then((response) => {
        setServiceData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        setServiceData([]);
      })
      .finally(() => {
        setIsLoadingPrice(false);
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
    <section className=" md:min-h-screen">
      <div className=" text-black mt-8  mx-auto rounded-lg border p-4 flex justify-center w-full max-w-7xl items-center">
        <div className="w-full md:w-1/2  min-h-[70vh] h-full ">
          <h1 className="text-2xl font-semibold text-center my-4">
            Select your product model
          </h1>

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
              disabled={isLoading}
            >
              <option className="py-4 text-base" value="">
                {isLoading ? (
                  <>
                    <Loader2Icon className="w-6 h-6 text-black animate-spin" />{" "}
                    Loading...
                  </>
                ) : (
                  " Select a Your Brand"
                )}
              </option>
              {brandNames &&
                brandNames.map((e) => (
                  <option
                    key={e._id}
                    className="w-full capitalize text-xl"
                    value={e._id}
                  >
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
              disabled={isLoadingModal}
            >
              <option className="py-4 text-base" value="">
                {isLoadingModal ? (
                  <>
                    <Loader2Icon className=" text-black animate-spin" />{" "}
                    Loading...
                  </>
                ) : (
                  "Select a Your Model"
                )}
              </option>
              {modalNames &&
                modalNames.map((e) => (
                  <option
                    key={e._id}
                    className="w-full text-xl capitalize"
                    value={e.phoneModal}
                  >
                    {e.phoneModal}
                  </option>
                ))}
            </select>
          </div>
          {serviceData.length > 0 ? (
            <div className="mt-4 overflow-hidden border border-gray-300 rounded-lg">
              <div className="flex justify-between bg-gray-100 p-2 font-medium">
                <span>Parts&Accessories</span>
                <span>
                  Maximum Retail Price <br /> (Inclusive of all taxes)
                </span>
              </div>

              <div className=" ">
                {serviceData.map((repair, index) => (
                  <div
                    key={index}
                    className="flex capitalize border-y border-gray-200 justify-between p-4"
                  >
                    <span> {repair.serviceType}</span>
                    <span>Rs. {repair.price}</span>
                  </div>
                ))}

                {/* Add more items as needed */}
              </div>
            </div>
          ) : (
            <EmptySearch />
          )}
        </div>
      </div>
    </section>
  );
};

export default FindPrice;

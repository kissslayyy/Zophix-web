import axios from "axios";
import { User2 } from "lucide-react";
import { useEffect, useState } from "react";

export const TotalUser = () => {
  const [userData, setUserData] = useState<string[] | number[] | undefined>();

  const data = () => {
    axios
      .get("/api/get-user")
      .then((response) => {
        setUserData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <div>
      <div className="relative overflow-hidden bg-[#EEBBC2] rounded-lg shadow w-60 md:w-72">
        <User2 className="absolute  w-24 h-24 rounded-full opacity-50 -bottom-6 -right-6 md:-right-4" />
        <div className="px-4 py-5 sm:p-6">
          <dl>
            <dt className="text-2xl font-medium leading-5 text-gray-900 truncate">
              Total user
            </dt>
            <dd className="mt-1 text-3xl font-semibold leading-9 text-gray-900">
              {userData ? userData.length : "Loading..."}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

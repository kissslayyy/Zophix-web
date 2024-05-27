import { User2Icon } from "lucide-react";

const UserProfileCard = () => {
  return (
    <div className="bg-gray-50 flex flex-col items-center text-black p-6 rounded-lg">
      <div className=" space-x-4">
        <User2Icon className="w-16 h-16 rounded-full" />
      </div>
      <div>
        <h2 className="text-lg font-semibold">Daisy Patterson</h2>
      </div>

      <div className="mt-4 space-y-1">
        <p>
          <strong>Username:</strong> @gslixby0
        </p>
        <p>
          <strong>Email:</strong> gslixby0@abc.net.au
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className="text-green-500">Active</span>
        </p>
        <p>
          <strong>Role:</strong> Admin
        </p>
      </div>
    </div>
  );
};

export default UserProfileCard;

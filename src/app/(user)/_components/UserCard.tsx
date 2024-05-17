import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const UserCard = ({ user }: { user: any }) => {
  return (
    <Card className="w-full max-w-[480px] bg-[#F2C94D] justify-between px-4 flex">
      <div>
        <CardHeader>
          <CardTitle>
            Hello <span className="capitalize"> {user.name} </span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Button variant="secondary" asChild>
            <Link href="/user/dashboard/request-service">Request Service</Link>
          </Button>
        </CardContent>
      </div>
      <div className="my-auto">
        <Image
          alt="logo"
          src="/avatar.svg"
          className="object-cover bg-white rounded-full overflow-hidden"
          width={100}
          height={100}
        />
      </div>
    </Card>
  );
};

export default UserCard;

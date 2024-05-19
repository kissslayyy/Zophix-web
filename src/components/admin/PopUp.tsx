"use client";
import React, { useState } from "react";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const PopUp = ({ blog, oderResult }: { blog: any; oderResult: any }) => {
  console.log(blog, "blog");
  const router = useRouter();
  const [state, setState] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");

  const updateStatus = () => {
    setState(true);
    axios
      .put(`/api/update-order`, {
        orderId: blog._id, // Example order ID
        status: status, // Example status
      })
      .then((response) => {
        setState(false);
        toast.success(response.data.message);
        router.replace("/admin/dashboard");
        oderResult();
        setOpen(false);
      })
      .catch((error) => {
        setState(false);
        toast.warning(error.message);
        setOpen(false);

        console.error(error);
      });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-white" asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white" align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <>
              <DropdownMenuItem>
                <Link href={`/dashboard/edit-blog/${blog._id}`}>Edit</Link>
              </DropdownMenuItem>
            </>
            <DropdownMenuSeparator />
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <span>Delete</span>
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent className="grid grid-cols-1 bg-white text-slate-500 justify-items-center ">
          <DialogHeader>
            <DialogTitle>
              <svg
                className="mx-auto h-20 w-20 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <h1 className="text-center text-2xl">
                Current Status - {blog.status}
              </h1>
            </div>
            <div className="grid  items-center gap-4">
              <select
                name="HeadlineAct"
                id="HeadlineAct"
                className=" inline-flex h-12 w-full items-center justify-center gap-[5px] rounded bg-white px-[15px] text-xl   leading-none text-black shadow-[0_2px_10px]  shadow-black/10 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option className="py-4 text-base  " value="">
                  Change your status
                </option>
                <option className="py-4 text-base  " value="pending">
                  Pending
                </option>
                <option className="py-4 text-base  " value="working">
                  Working
                </option>
                <option className="py-4 text-base  " value="completed">
                  Completed
                </option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="update"
              className="text-white"
              onClick={updateStatus}
              disabled={state}
            >
              Update
            </Button>

            <DialogClose asChild>
              <Button className="text-black" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopUp;

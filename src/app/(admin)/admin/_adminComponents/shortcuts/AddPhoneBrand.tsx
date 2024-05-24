import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { APiResponse } from "@/types/apiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Building2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { infer, z } from "zod";
const FormSchema = z.object({
  phoneCompany: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
export function AddPhoneBrand() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phoneCompany: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<APiResponse>(
        `/api/phone-company`,
        values
      );
      toast.success(response.data.message);
      setOpen(false);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error while adding service", error);
      setIsSubmitting(false);
      toast.error("Adding service failed");
    }
  };

  return (
    <div>
      <div className="relative overflow-hidden bg-[#BBEBEF] rounded-lg shadow w-60 md:w-72">
        <Building2 className="absolute w-24 h-24 rounded-full opacity-50 -bottom-6 -right-6 md:-right-4" />
        <div className="px-4 py-5 sm:p-6">
          <dl>
            <dt className="text-2xl my-2 font-medium leading-5 text-gray-900 truncate">
              Add Phone Brand
            </dt>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="update">Add</Button>
              </DialogTrigger>
              <DialogContent className="bg-white text-black">
                <DialogHeader>
                  <DialogTitle>Add phone Company</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="phoneCompany"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel></FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Add phone Company"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        disabled={isSubmitting}
                        variant="update"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </form>
                  </Form>
                </div>
              </DialogContent>
            </Dialog>
            <dd className="mt-1 text-3xl font-semibold leading-9 text-gray-900"></dd>
          </dl>
        </div>
      </div>
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <div className="space-y-4 bg-white">
      <Skeleton className="mx-auto  px-4 py-8 sm:px-6 sm:py-6 lg:px-8  bg-neutral-500 " />
      <div className="flex  gap-5">
        <Skeleton className="bg-neutral-500 light-border custom-scrollbar sticky left-0 top-0 flex h-screen shrink  flex-col  justify-between  overflow-y-auto border-r p-6 pt-36  shadow-light-300 max-sm:hidden lg:w-[266px] dark:shadow-none" />

        <div className="flex min-h-screen mx-auto flex-col gap-2 ">
          {[0, 0, 0].map((i) => (
            <div className="flex flex-col space-y-2" key={i}>
              <Skeleton className="h-[125px] bg-neutral-500 w-[750px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-neutral-500 " />
                <Skeleton className="h-4 w-[200px] bg-neutral-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

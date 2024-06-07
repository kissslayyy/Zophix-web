import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
interface OrderProps {
  _id: string;

  name: string;
  email: string;
  issue: string;
  status: string;
  phoneCompany: string;
  phoneModel: string;
}
export default function BillCard({
  _id,
  name,
  email,
  phoneCompany,
  phoneModel,
  status,
  issue,
}: OrderProps) {
  return (
    <Card className="flex px-4 bg-orange-300 w-max">
      <CardHeader className="">
        <CardTitle>{name}</CardTitle>
        <CardDescription className="max-w-lg  text-balance leading-relaxed">
          <p>
            <strong>Phone-</strong>
            {phoneCompany} {phoneModel}
          </p>
          <p>
            <strong>Issue</strong>- {issue}
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="my-auto"></CardContent>
      <div className="m-auto">
        <Button>Create New Order</Button>
      </div>
    </Card>
  );
}

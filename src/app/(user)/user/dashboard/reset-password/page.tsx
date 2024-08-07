import PasswordResetForm from "@/components/forms/PasswordResetForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const ResetPasswordPage = () => {
  return (
    <div className="container mx-auto p-4">
      <Card className="mt-4 mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="text-xl">Change your password</CardTitle>
        </CardHeader>
        <CardContent>
          <PasswordResetForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;

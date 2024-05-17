import dbConnect from "@/lib/dbConnect";
import User from "@/model/User.model";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { email, code } = await request.json();
    // const decodedEmail = decodeURIComponent(email);
    const user = await User.findOne({ email: email });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "user not found",
        },
        {
          status: 404,
        }
      );
    }
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpire) > new Date();
    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        {
          success: true,
          message: "Account verified successfully",
        },
        {
          status: 200,
        }
      );
    } else if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message:
            "verification code has expired, please signup again to get a new code",
        },
        {
          status: 400,
        }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Incorrect  Verification code",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.error("Error while verifying user", error);
    return Response.json(
      {
        success: false,
        message: "Error while verifying user",
      },
      {
        status: 500,
      }
    );
  }
}

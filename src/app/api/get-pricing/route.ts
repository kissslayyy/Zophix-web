import dbConnect from "@/lib/dbConnect";
import PhoneCompany from "@/model/PhoneCompany.model";
import PhoneModal from "@/model/PhoneModal.model";
import Price from "@/model/Pricing.model";
import Service from "@/model/Service.model";

export async function GET(request: Request) {
  await dbConnect();

  const url = new URL(request.url);
  const phoneCompanyId = url.searchParams.get("phoneCompanyId");
  const phoneModal = url.searchParams.get("phoneModal");
  const serviceTypeName = url.searchParams.get("servicietype");

  if (!phoneCompanyId || !phoneModal) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "phoneCompanyId and phoneModal are required",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const query: any = {
      phoneCompany: phoneCompanyId,
      phoneModal: phoneModal,
    };

    if (serviceTypeName) {
      const service = await Service.findOne({
        serviceName: serviceTypeName,
      }).select("_id");
      if (service) {
        query.serviceType = service._id;
      } else {
        return new Response(
          JSON.stringify({
            success: false,
            message: "Invalid servicietype",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    const prices = await Price.find(query)
      .populate({
        path: "phoneCompany",
        model: PhoneCompany,
        select: "phoneCompany",
      })
      .populate({
        path: "phoneModal",
        model: PhoneModal,
        select: "phoneModal",
      })
      .populate({
        path: "serviceType",
        model: Service,
        select: "serviceName",
      });

    // Transform the data to include the names directly in the output
    const transformedPrices = prices.map((price) => ({
      id: price._id,
      phoneCompany: price.phoneCompany.phoneCompany,
      phoneModal: price.phoneModal.phoneModal,
      serviceType: price.serviceType.serviceName,
      price: price.price,
    }));

    return new Response(
      JSON.stringify({
        success: true,
        data: transformedPrices,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.log("Error fetching prices", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Error fetching prices",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

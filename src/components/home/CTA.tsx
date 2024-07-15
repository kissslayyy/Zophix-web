import React from "react";

const CTA = () => {
  return (
    <div className="relative mx-auto w-full mt-4 ">
      <div className="py-16 sm:py-28 px-4 flex justify-center items-center bg-gradient-to-br from-gray-700 to-gray-900">
        {/* :IMAGE BACKGROUND */}
        <img
          src="https://fancytailwind.com/static/tablets1-2159571f573820dadb76416114b85465.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter mix-blend-overlay"
        />

        {/* :PROMO */}
        <div className="relative max-w-2xl flex flex-col justify-center items-center text-center">
          {/* ::Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-extrabold tracking-wide">
            Professional Mobile Repair Services
          </h2>
          {/* ::Text */}
          <p className="mt-3 text-sm sm:text-base text-white font-medium">
            Get your mobile devices repaired by experts. We offer fast,
            reliable, and affordable repair services for all types of mobile
            phones. Your satisfaction is our priority.
          </p>
          {/* ::Button */}
          <a
            href="/sign-up"
            target="_blank"
            className="mt-6 py-2.5 px-6 shadow rounded bg-gray-50 text-sm sm:text-base text-gray-700 font-semibold hover:shadow-lg hover:bg-white hover:text-gray-900"
          >
            Fix Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default CTA;

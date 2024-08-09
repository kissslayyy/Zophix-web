function Page() {
  return (
    <div className="">
      <title>About Us</title>
      <div className="mt-24"></div>
      <div className="m-4  rounded-lg  p-4 shadow-2xl md:m-16">
        <div className="rounded-lg p-1">
          <div className="flex flex-col items-center rounded-lg  p-2 md:p-4">
            <h1 className=" text-4xl text-black">Behind the Brand: Zophix</h1>
            <p className="m-4 text-base font-light  text-black md:text-justify">
              At Zophix, we are dedicated to transforming the mobile and
              electronic gadget repair industry in India.
              <br />
              We offer a seamless, trustworthy, and efficient repair service
              that prioritizes convenience and quality. Whether you need
              in-store, pick-up, drop-off, or doorstep repair services, Zophix
              is your one-stop solution. We bridge the gap between consumers and
              certified repair professionals through our comprehensive platform,
              ensuring high-quality repairs with genuine parts.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-4 my-12 flex flex-1 flex-col items-center gap-8 md:m-16 md:flex-row md:gap-4">
        <div className=" flex flex-col items-center gap-4 bg-primary p-4 text-black">
          <h3 className="mt-2 rounded-xl  p-3  text-black">
            WHO WE ARE, WHAT WE DO
          </h3>
          <h1 className=" text-3xl font-semibold">Our Story</h1>
          <p className="m-4 mt-0 font-medium  md:m-8  md:text-justify">
            The idea for Zophix was born out of the frustration of dealing with
            inconvenient, unreliable, and non-transparent repair services in
            India. Our founders recognized the challenges faced by consumers,
            such as limited access to trustworthy repair shops, the risk of
            unauthorized repairs, and the hassle of physically visiting service
            centers. To address these pain points, Zophix was created to provide
            a reliable and convenient solution, offering direct-to-door premium
            repair services backed by a network of vetted repair partners. Our
            story is one of innovation and dedication, as we strive to make
            gadget repairs as hassle-free as possible for our customers.
          </p>
        </div>
        <div className=" flex flex-col items-center gap-4 bg-primary p-4 text-black">
          <h3 className="mt-2 rounded-xl  p-3  text-black">
            WHAT WE ASPIRE TO BE
          </h3>
          <h1 className=" text-3xl font-semibold">Our Vision</h1>
          <p className="m-4 mt-0 font-medium  md:m-8  md:text-justify">
            Our vision is to become the leading platform for gadget repairs in
            India, known for our commitment to quality, convenience, and
            customer satisfaction. We aspire to expand our network across the
            country, making trustworthy repair services accessible to everyone,
            and setting new standards in the industry for transparency and
            efficiency.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center">
        <h1 className="-z-50 hidden mb-12 font-serif text-4xl font-semibold">
          Meet Our <span className="text-primary">Team</span>
        </h1>
      </div>
    </div>
  );
}

export default Page;

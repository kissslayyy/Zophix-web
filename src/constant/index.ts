export type SidebarLink = {
  imgURL: string;
  route: string;
  label: string;
  subLinks?: { label: string; route: string }[];
};

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/home.svg",
    route: "/user/dashboard",
    label: "Home",
  },
  {
    imgURL: "/shopping-cart.svg",
    route: "/user/dashboard/order",
    label: "Order",
  },
  
  {
    imgURL: "/settings.svg",
    route: "/user/dashboard/setting",
    label: "Setting",
  },
];

export const adminSidebarLinks: SidebarLink[] = [
  {
    imgURL: "/home.svg",
    route: "/admin/dashboard",
    label: "Home",
  },
  {
    imgURL: "/wrench.svg",
    route: "/admin/dashboard/add-service",
    label: "Add Service",
  },
  {
    imgURL: "/building-2.svg",
    route: "/admin/dashboard/add-phone-brand",
    label: "Add Phone Brand",
  },
  {
    imgURL: "/smartphone.svg",
    route: "/admin/dashboard/add-phone-modal",
    label: "Add Phone Modal",
  },
  {
    imgURL: "/smartphone.svg",
    route: "/admin/dashboard/add-pricing",
    label: "Add Pricing",
  },

  {
    imgURL: "/shopping-cart.svg",
    route: "/admin/dashboard/order",
    label: "Order",
    subLinks: [
      { label: "Total Orders", route: "/admin/dashboard/total-order" },
      { label: "New Orders", route: "/admin/dashboard/new-order" },
      { label: "Working Orders", route: "/admin/dashboard/working-order" },
      { label: "Completed Orders", route: "/admin/dashboard/completed-order" },
    ],
  },
  {
    imgURL: "/user.svg",
    route: "/admin/dashboard/profile",
    label: "Profile",
  },
  {
    imgURL: "/settings.svg",
    route: "/admin/dashboard/setting",
    label: "Setting",
  },
];

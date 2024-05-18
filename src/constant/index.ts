export interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/home.svg",
    route: "/user/dashboard",
    label: "Home",
  },
  {
    imgURL: "/shopping-cart.svg",
    route: "/user/track-order",
    label: "Order",
  },
  {
    imgURL: "/user.svg",
    route: "/user/profile",
    label: "Profile",
  },
  {
    imgURL: "/settings.svg",
    route: "/user/setting",
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
    imgURL: "/shopping-cart.svg",
    route: "/admin/dashboard/track-order",
    label: "Add Service",
  },
  {
    imgURL: "/shopping-cart.svg",
    route: "/admin/dashboard/track-order",
    label: "Add Phone Brand",
  },
  {
    imgURL: "/shopping-cart.svg",
    route: "/admin/dashboard/track-order",
    label: "Add Phone Modal",
  },
  {
    imgURL: "/shopping-cart.svg",
    route: "/admin/dashboard/track-order",
    label: "New Order",
  },
  {
    imgURL: "/shopping-cart.svg",
    route: "/admin/dashboard/track-order",
    label: "Total Order",
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

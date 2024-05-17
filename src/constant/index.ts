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

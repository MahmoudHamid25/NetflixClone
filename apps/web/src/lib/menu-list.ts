import {
  Users,
  SquarePen,
  LayoutGrid,
  LucideIcon, User, Globe, DollarSign,
} from 'lucide-react';

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};
export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Content",
          icon: SquarePen,
          submenus: [
            { href: "/dashboard/contents/all", label: "All Content" },
            { href: "/dashboard/contents/new", label: "New Content" },
            { href: "/dashboard/contents/genres", label: "Genres" },
          ]
        }
      ]
    },
    {
      groupLabel: "Users",
      menus: [
        {
          href: "/dashboard/users",
          label: "Users",
          icon: Users,
          submenus: [
            { href: "/dashboard/users", label: "All Users" },
            { href: "/dashboard/users/profiles", label: "Profiles" }
          ]
        }
      ]
    },
    {
      groupLabel: "Subscriptions",
      menus: [
        {
          href: "/dashboard/subscriptions",
          label: "Subscriptions",
          icon: DollarSign,
          submenus: [
            { href: "/dashboard/subscriptions/plans", label: "Plans" },
            { href: "/dashboard/subscriptions/active", label: "Active Subscribers" },
            { href: "/dashboard/subscriptions/analytics", label: "Analytics" }
          ]
        }
      ]
    },
    {
      groupLabel: "Languages",
      menus: [
        {
          href: "/dashboard/languages",
          label: "Languages",
          icon: Globe,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Account",
      menus: [
        {
          href: "/dashboard/account",
          label: "Account",
          icon: User,
          submenus: []
        }
      ]
    }
  ];
}

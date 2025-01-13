import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon, User, Globe, DollarSign, Sliders,
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
            { href: "/contents", label: "All Content" },
            { href: "/contents/new", label: "New Content" },
            { href: "/contents/genres", label: "Genres" },
            { href: "/contents/tags", label: "Tags" }
          ]
        }
      ]
    },
    {
      groupLabel: "Users",
      menus: [
        {
          href: "/users",
          label: "Users",
          icon: Users,
          submenus: [
            { href: "/users", label: "All Users" },
            { href: "/users/profiles", label: "Profiles" }
          ]
        }
      ]
    },
    {
      groupLabel: "Subscriptions",
      menus: [
        {
          href: "/subscriptions",
          label: "Subscriptions",
          icon: DollarSign,
          submenus: [
            { href: "/subscriptions/plans", label: "Plans" },
            { href: "/subscriptions/active", label: "Active Subscribers" },
            { href: "/subscriptions/analytics", label: "Analytics" }
          ]
        }
      ]
    },
    {
      groupLabel: "Languages",
      menus: [
        {
          href: "/languages",
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
          href: "/account",
          label: "Account",
          icon: User,
          submenus: []
        }
      ]
    }
  ];
}

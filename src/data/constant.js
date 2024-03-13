import IconMenuUsers from "@components/icons/menu-users";
import IconMenuChat from "@components/icons/menu-chat";
import IconDollar from "@components/icons/dollar-icon";
import IconMenuForms from "@components/icons/form-icon";
import IconMenuWidgets from "@components/icons/widget-icon";
import IconMenuNotes from "@components/icons/notes-icon";
import IconMenuComponents from "@components/icons/component-icon";

export const sidebarNavItems = [
  {
    title: "Users",
    href: "/",
    icon: <IconMenuUsers className="shrink-0 group-hover:!text-blue-400" />,
  },
  {
    title: "Gifts",
    href: "/gifts",
    icon: <IconMenuWidgets className="shrink-0 group-hover:!text-primary" />,
  },
  {
    title: "Push Notification",
    href: "/notification",
    icon: <IconMenuChat className="shrink-0 group-hover:!text-primary" />,
  },
  {
    title: "Reward Calculation",
    href: "/calculation",
    icon: <IconDollar className="shrink-0 group-hover:!text-primary" />,
  },

  {
    title: "Feedbacks",
    href: "/feedbacks",
    icon: <IconMenuNotes className="shrink-0 group-hover:!text-primary" />,
  },
  {
    title: "Blogs",
    href: "/blogs",
    icon: <IconMenuForms className="shrink-0 group-hover:!text-primary" />,
    subMenu: [
      {
        title: "New Blog",
        href: "/blogs/create",
      },
      {
        title: "Blogs List",
        href: "/blogs",
      },
    ],
  },
  {
    title: "Products",
    href: "/products",
    icon: <IconMenuComponents className="shrink-0 group-hover:!text-primary" />,
    subMenu: [
      {
        title: "Add Product",
        href: "/products/create",
      },
      {
        title: "Product List",
        href: "/products",
      },
    ],
  },
];

export const statusOptions = [
  { value: "Created", label: "Created" },
  { value: "Ready", label: "Ready" },
  { value: "Received", label: "Received" },
];

export const productStatusOptions = [
  {
    label: "Active",
    value: "Active",
  },
  {
    label: "Disable",
    value: "Disable",
  },
];

export const productCategoryOptions = [
  {
    label: "Bodycare",
    value: "Bodycare",
  },
  {
    label: "Skincare",
    value: "Skincare",
  },
  {
    label: "Haircare",
    value: "Haircare",
  },
  {
    label: "Makeup",
    value: "Makeup",
  },
  {
    label: "Fragrance",
    value: "Fragrance",
  },
];

export const productSubCategoryOptions = [
  {
    label: "All",
    value: "All",
  },
  {
    label: "Toys",
    value: "Toys",
  },
  {
    label: "Beauty & Fashion",
    value: "Beauty & Fashion",
  },
  {
    label: "Electronics & Electrical",
    value: "Electronics & Electrical",
  },
];

export const productTypeOptions = [
  {
    label: "New Arrival",
    value: "New Arrival",
  },
  {
    label: "Deals",
    value: "Deals",
  },
];

export const blogCategory = [
  {
    label: "All",
    value: "All",
  },
  {
    label: "Toys",
    value: "Toys",
  },
  {
    label: "Beauty & Fashion",
    value: "Beauty & Fashion",
  },
  {
    label: "Electronics & Electrical",
    value: "Electronics & Electrical",
  },
];

export const blogSubCategory = [
  {
    label: "Toys",
    value: "Toys",
  },
  {
    label: "Beauty & Fashion",
    value: "Beauty & Fashion",
  },
  {
    label: "Electronics & Electrical",
    value: "Electronics & Electrical",
  },
];

export const marketPlaceOptions = [
  {
    label: "Yandex Market",
    value: "Yandex Market",
  },
  {
    label: "Ozon",
    value: "Ozon",
  },
];

export const ACCEPTED_FILE_TYPES =
  "image/*,application/pdf,application/zip,application/vnd.rar,application/epub+zip,.psd";

import IconMenuUsers from "@components/icons/menu-users";
import IconSettings from "@components/icons/settings-icon";
import IconDollar from "@components/icons/dollar-icon";
import IconMenuForms from "@components/icons/form-icon";
import IconMenuWidgets from "@components/icons/widget-icon";
import IconMenuNotes from "@components/icons/notes-icon";
import IconMenuComponents from "@components/icons/component-icon";

export const sidebarNavItems = [
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
    title: "Feedbacks",
    href: "/feedbacks",
    icon: <IconMenuNotes className="shrink-0 group-hover:!text-primary" />,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: <IconMenuWidgets className="shrink-0 group-hover:!text-primary" />,
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
  {
    title: "Users",
    href: "/",
    icon: <IconMenuUsers className="shrink-0 group-hover:!text-blue-400" />,
  },

  {
    title: "Settings",
    href: "/settings",
    icon: <IconSettings className="shrink-0 group-hover:!text-primary" />,
    subMenu: [
      {
        title: "Add Account",
        href: "/accounts/create",
      },
      {
        title: "Account List",
        href: "/accounts",
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

export const productSubCategoryOptions = [
  {
    label: "Body Butter",
    value: "Body Butter",
  },
  {
    label: "Body Cleaners",
    value: "Body Cleaners",
  },
  {
    label: "Body Lotion",
    value: "Body Lotion",
  },
  {
    label: "Body Mist",
    value: "Body Mist",
  },
  {
    label: "Body Oils",
    value: "Body Oils",
  },
  {
    label: "Body Scrubs",
    value: "Body Scrubs",
  },
  {
    label: "Body Yogurts",
    value: "Body Yogurts",
  },
  {
    label: "Conditioners",
    value: "Conditioners",
  },
  {
    label: "Deo Pi Cream",
    value: "Deo Pi Cream",
  },
  {
    label: "Damaged Hair",
    value: "Damaged Hair",
  },
  {
    label: "Dandruff",
    value: "Dandruff",
  },
  {
    label: "Eau De Perfumes",
    value: "Eau De Perfumes",
  },
  {
    label: "Eyeliner",
    value: "Eyeliner",
  },
  {
    label: "Eyebrow Definer",
    value: "Eyebrow Definer",
  },
  {
    label: "Face Mask",
    value: "Face Mask",
  },
  {
    label: "Face Moisturizer",
    value: "Face Moisturizer",
  },
  {
    label: "Face Scrub",
    value: "Face Scrub",
  },
  {
    label: "Face Wash",
    value: "Face Wash",
  },
  {
    label: "Foot Cream",
    value: "Foot Cream",
  },
  {
    label: "Frizz",
    value: "Frizz",
  },
  {
    label: "Gift Sets",
    value: "Gift Sets",
  },
  {
    label: "Hand Cream",
    value: "Hand Cream",
  },
  {
    label: "Hair fall",
    value: "Hair fall",
  },
  {
    label: "Hair Mask",
    value: "Hair Mask",
  },
  {
    label: "Hair Serum",
    value: "Hair Serum",
  },
  {
    label: "Kajals",
    value: "Kajals",
  },

  {
    label: "Lipstick",
    value: "Lipstick",
  },
  {
    label: "Lip Balm",
    value: "Lip Balm",
  },
  {
    label: "Lip Care",
    value: "Lip Care",
  },

  {
    label: "Lip & Cheek Tint",
    value: "Lip & Cheek Tint",
  },
  {
    label: "Lip Scrub",
    value: "Lip Scrub",
  },
  {
    label: "Mascara",
    value: "Mascara",
  },
  {
    label: "Nail Polish",
    value: "Nail Polish",
  },

  {
    label: "Serum Face Oil",
    value: "Serum Face Oil",
  },

  {
    label: "Sunscreen",
    value: "Sunscreen",
  },
  {
    label: "Shampoo",
    value: "Shampoo",
  },
  {
    label: "Scalp Serum",
    value: "Scalp Serum",
  },
];

export const ACCEPTED_FILE_TYPES =
  "image/*,application/pdf,application/zip,application/vnd.rar,application/epub+zip,.psd";

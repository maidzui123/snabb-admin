import ReportServices from "@/services/ReportServices";
import {
  FiBook,
  FiBox,
  FiFileText,
  FiGrid,
  FiHome,
  FiLayers,
  FiList,
  FiPieChart,
  FiSettings,
  FiTool,
  FiTrendingUp,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import { IoNotificationsSharp } from "react-icons/io5";

/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const sidebar = [
  {
    path: "/dashboard", // the url
    icon: FiPieChart, // icon
    name: "Dashboard", // name that appear in Sidebar
    public: true,
  },

  {
    icon: FiFileText,
    name: "Job Card",
    path: "/job",
    permission: "job.list",
  },
  {
    path: "/task",
    icon: FiList,
    name: "Task",
    public: true,
    permission: "task.list",
  },
  {
    icon: FiUsers,
    name: "Client",
    routes: [
      {
        path: "/client",
        name: "Client",
        permission: "client.list",
      },

      {
        path: "/policy",
        name: "Policy",
        permission: "policy.list",
      },
    ],
  },

  {
    icon: FiHome,
    name: "Nhà cung cấp BH",
    routes: [
      {
        path: "/provider",
        name: "Nhà cung cấp",
        permission: "provider.list",
      },
      {
        path: "/program",
        name: "Program",
        permission: "program.list",
      },

      {
        path: "/product",
        name: "Product",
        permission: "product.list",
      },
    ],
  },
  {
    icon: FiTool,
    name: "Agency",
    routes: [
      {
        path: "/agency",
        name: "Agency",
        permission: "agency.list",
      },
      {
        path: "/accessory",
        name: "Accessory",
        permission: "accessory.list",
      },
      {
        path: "/importHistory",
        icon: FiSettings,
        name: "Lịch sử nhập linh kiện",
        permission: "import.list",
      },
    ],
  },
  {
    icon: FiBox,
    name: "Retailer",
    permission: "retailer.list",
    routes: [
      {
        path: "/retailer",
        name: "Retailer",
        permission: "retailer.list",
      },
      {
        path: "/brand",
        name: "Brand",
        permission: "brand.list",
      },
    ],
  },
  {
    icon: FiLayers,
    name: "Quản lý nhóm",
    permission: "retailer.list",
    public: true,
    routes: [
      {
        path: "/groupCategory?type=agency",
        icon: FiSettings,
        name: "TT sửa chữa",
        public: true,
        permission: "groupCategory.list",
      },
      {
        path: "/groupCategory?type=provider",
        icon: FiSettings,
        name: "Nhà cung cấp",
        public: true,
        permission: "groupCategory.list",
      },
      {
        path: "/groupCategory?type=retailer",
        icon: FiSettings,
        name: "TT bán hàng",
        public: true,
        permission: "groupCategory.list",
      },
    ],
  },
  {
    icon: FiGrid,
    name: "Category",
    routes: [
      // {
      //   path: "/groupCategory",
      //   icon: FiSettings,
      //   name: "Quản lý nhóm",
      //   permission: "groupCategory.list",
      // },
      {
        path: "/industry",
        name: "Industry",
        permission: "industry.list",
      },
      {
        path: "/agencyCategory",
        name: "AgencyCategory",
        permission: "agencyCategory.list",
      },

      {
        path: "/accessoryCategory",
        name: "AccessoryCategory",
        permission: "accessoryCategory.list",
      },

      {
        path: "/brandCategory",
        name: "BrandCategory",
        permission: "brandCategory.list",
      },

      {
        path: "/providerCategory",
        name: "ProviderCategory",
        permission: "providerCategory.list",
      },

      {
        path: "/productCategory",
        name: "ProductCategory",
        permission: "productCategory.list",
      },

      {
        path: "/programCategory",
        name: "ProgramCategory",
        permission: "programCategory.list",
      },

      {
        path: "/retailerCategory",
        name: "RetailerCategory",
        permission: "retailerCategory.list",
      },
    ],
  },

  {
    icon: FiUser,
    name: "Admin",
    routes: [
      // {
      //   path: "/user",
      //   name: "User",
      // },
      {
        path: "/our-staff",
        icon: FiUser,
        name: "Account",
        permission: "ourstaff.list",
      },
      {
        path: "/role",
        name: "Vai trò",
        permission: "role.list",
      },
      {
        path: "/module",
        name: "Module",
        permission: "module.list",
      },
      {
        path: "/permission",
        icon: FiSettings,
        name: "Permission",
        permission: "permission.list",
      },

      {
        path: "/adminActivity",
        name: "Quản lý hoạt động tài khoản",
        permission: "adminActivity.list",
      },
      {
        path: "/jobHistories",
        name: "Lịch sử công việc",
      },
    ],
  },
  // {
  //   path: "/notification",
  //   icon: IoNotificationsSharp,
  //   name: "Thông báo",
  //   permission: "notification.list",
  //   public: true,
  // },

  {
    icon: FiTrendingUp,
    path: "/report",
    name: "Báo cáo",
    dynamic: true,
    service: ReportServices,
    routes: [
      {
        path: "/report",
        name: "Danh sách báo cáo",
        permission: "report.list",
      },
    ],
  },
  {
    path: "/contact",
    icon: FiSettings,
    name: "Danh sách liên hệ",
    permission: "contact.list",
  },

  {
    path: "/jobActivity",
    icon: FiSettings,
    name: "Hoạt động Job Card",
    permission: "jobActivity.list",
  },
  // {
  //   path: "/customers",
  //   icon: FiUsers,
  //   name: "Customers",
  // },
  // {
  //   path: "/orders",
  //   icon: FiCompass,
  //   name: "Orders",
  // },

  {
    path: "/settings",
    icon: FiSettings,
    name: "Cài đặt",
    public: true,
  },
  // {
  //   path: "/accessoryimport",
  //   icon: FiSettings,
  //   name: "Import linh kiện",
  // },
  // {
  //   icon: FiGlobe,
  //   name: "International",
  //   routes: [
  //     {
  //       path: "/languages",
  //       name: "Languages",
  //     },
  //     {
  //       path: "/currencies",
  //       name: "Currencies",
  //     },
  //   ],
  // },

  {
    icon: FiBook,
    name: "Hướng dẫn sử dụng",
    path: "https://snabbs-organization.gitbook.io/snabb/",
    outside: true,
  },

  /** TODO: SIDEBAR */
];

export default sidebar;

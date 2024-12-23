import { lazy } from "react";

// use lazy for better code splitting
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Attributes = lazy(() => import("@/pages/Attributes"));
const ChildAttributes = lazy(() => import("@/pages/ChildAttributes"));
// const Products = lazy(() => import("@/pages/Products"));
const ProductDetails = lazy(() => import("@/pages/ProductDetails"));
const Category = lazy(() => import("@/pages/Category"));
const ChildCategory = lazy(() => import("@/pages/ChildCategory"));
const Staff = lazy(() => import("@/pages/Staff"));
const Customers = lazy(() => import("@/pages/Customers"));
const CustomerOrder = lazy(() => import("@/pages/CustomerOrder"));
const Orders = lazy(() => import("@/pages/Orders"));
const OrderInvoice = lazy(() => import("@/pages/OrderInvoice"));
const Coupons = lazy(() => import("@/pages/Coupons"));
// const Setting = lazy(() => import("@/pages/Setting"));
const Page404 = lazy(() => import("@/pages/404"));
const ComingSoon = lazy(() => import("@/pages/ComingSoon"));
const EditProfile = lazy(() => import("@/pages/EditProfile"));
const Languages = lazy(() => import("@/pages/Languages"));
const Currencies = lazy(() => import("@/pages/Currencies"));
const Setting = lazy(() => import("@/pages/Setting"));

const User = lazy(() => import("../pages/User"));

const Provider = lazy(() => import("../pages/Provider"));

const Agency = lazy(() => import("../pages/Agency"));

const Retailer = lazy(() => import("../pages/Retailer"));

const Program = lazy(() => import("../pages/Program"));

const Job = lazy(() => import("../pages/Job"));

const JobDetailed = lazy(() => import("../pages/JobDetailed"));

const JobAddEdit = lazy(() => import("../pages/JobAddEdit"));

const Product = lazy(() => import("../pages/Product"));

const Brand = lazy(() => import("../pages/Brand"));

const Module = lazy(() => import("../pages/Module"));

const Accessory = lazy(() => import("../pages/Accessory"));

const ProviderHistory = lazy(() => import("../pages/ProviderHistory"));

const AgencyHistory = lazy(() => import("../pages/AgencyHistory"));

const BrandHistory = lazy(() => import("../pages/BrandHistory"));

const RetailerHistory = lazy(() => import("../pages/RetailerHistory"));

const AccessoryHistory = lazy(() => import("../pages/AccessoryHistory"));

const ProgramHistory = lazy(() => import("../pages/ProgramHistory"));

const ProductHistory = lazy(() => import("../pages/ProductHistory"));

const AgencyCategory = lazy(() => import("../pages/AgencyCategory"));

const AccessoryCategory = lazy(() => import("../pages/AccessoryCategory"));

const BrandCategory = lazy(() => import("../pages/BrandCategory"));

const ProviderCategory = lazy(() => import("../pages/ProviderCategory"));

const ProductCategory = lazy(() => import("../pages/ProductCategory"));

const ProgramCategory = lazy(() => import("../pages/ProgramCategory"));

const RetailerCategory = lazy(() => import("../pages/RetailerCategory"));

const JobHistories = lazy(() => import("../pages/JobHistories"));

const Client = lazy(() => import("../pages/Client"));

const ClientContract = lazy(() => import("../pages/ClientContract"));

const AdminRole = lazy(() => import("../pages/AdminRole"));

const AdminActivity = lazy(() => import("../pages/AdminActivity"));

const Permission = lazy(() => import("../pages/Permission"));

const RoleHasPermission = lazy(() => import("../pages/RoleHasPermission"));

const Role = lazy(() => import("../pages/Role"));

const AdminHasPermission = lazy(() => import("../pages/AdminHasPermission"));

const Log = lazy(() => import("../pages/Log"));

const Industry = lazy(() => import("../pages/Industry"));

const Policy = lazy(() => import("../pages/Policy"));

const AccessoryImport = lazy(() => import("../pages/AccessoryImport"));

const RetailerImport = lazy(() => import("../pages/RetailerImport"));

const JobActivity = lazy(() => import("../pages/JobActivity"));

const GroupCategory = lazy(() => import("../pages/GroupCategory"));

const Notification = lazy(() => import("../pages/Notification"));

const Task = lazy(() => import("../pages/Task"));

const Report = lazy(() => import("../pages/Report"));

const ReportDetailed = lazy(() => import("../pages/ReportDetailed"));
const Contact = lazy(() => import('../pages/Contact'));

const ImportHistory = lazy(() => import('../pages/ImportHistory'));

/** TODO: CLIENT ROUTE IMPORT */

//  * ⚠ These are internal routes!
//  * They will be rendered inside the app, using the default `containers/Layout`.
//  * If you want to add a route to, let's say, a landing page, you should add
//  * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
//  * are routed.
//  *
//  * If you're looking for the links rendered in the SidebarContent, go to
//  * `routes/sidebar.js`

const routes = [
  {
    path: "/user",
    component: User,
  },

  {
    path: "/provider",
    component: Provider,
    permission: "provider.list",
  },

  {
    path: "/agency",
    component: Agency,
    permission: "agency.list",
  },

  {
    path: "/retailer",
    component: Retailer,
    permission: "retailer.list",
  },

  {
    path: "/retailer/:importId",
    component: Retailer,
    permission: "retailer.list",
  },

  {
    path: "/program",
    component: Program,
    permission: "program.list",
  },

  {
    path: "/job",
    component: Job,
    permission: "job.list",
  },
  // {
  //   path: "/jobAdd/",
  //   component: JobAddEdit,
  // },
  // {
  //   path: "/jobAdd/:id",
  //   component: JobAddEdit,
  // },
  {
    path: "/jobDetailed/",
    component: JobAddEdit,
  },
  {
    path: "/jobDetailed/:id",
    component: JobDetailed,
  },

  {
    path: "/product",
    component: Product,
    permission: "product.list",
  },

  {
    path: "/brand",
    component: Brand,
    permission: "brand.list",
  },

  // {
  //   path: '/module',
  //   component: Module,
  // },

  {
    path: "/accessory",
    component: Accessory,
    permission: "accessory.list",
  },

  {
    path: "/accessory/:importId",
    component: Accessory,
    permission: "accessory.list",
  },

  {
    path: "/providerHistory",
    component: ProviderHistory,
  },

  {
    path: "/agencyHistory",
    component: AgencyHistory,
  },

  {
    path: "/brandHistory",
    component: BrandHistory,
  },

  {
    path: "/retailerHistory",
    component: RetailerHistory,
  },

  {
    path: "/accessoryHistory",
    component: AccessoryHistory,
  },

  {
    path: "/programHistory",
    component: ProgramHistory,
  },

  {
    path: "/productHistory",
    component: ProductHistory,
  },

  {
    path: "/agencyCategory",
    component: AgencyCategory,
    permission: "agencyCategory.list",
  },
  {
    path: "/accessoryCategory",
    component: AccessoryCategory,
    permission: "accessoryCategory.list",
  },

  {
    path: "/brandCategory",
    component: BrandCategory,
    permission: "brandCategory.list",
  },

  {
    path: "/providerCategory",
    component: ProviderCategory,
    permission: "providerCategory.list",
  },

  {
    path: "/productCategory",
    component: ProductCategory,
    permission: "productCategory.list",
  },
  {
    path: "/programCategory",
    component: ProgramCategory,
    permission: "programCategory.list",
  },
  {
    path: "/retailerCategory",
    component: RetailerCategory,
    permission: "retailerCategory.list",
  },
  {
    path: "/jobHistories",
    component: JobHistories,
  },

  {
    path: "/client",
    component: Client,
    permission: "client.list",
  },

  {
    path: "/clientContract",
    component: ClientContract,
  },

  {
    path: "/adminRole",
    component: AdminRole,
  },

  {
    path: "/adminActivity",
    component: AdminActivity,
    permission: "adminActivity.list",
  },

  // {
  //   path: "/permission",
  //   component: Permission,
  // },

  // {
  //   path: "/rolePermission",
  //   component: RolePermission,
  // },

  // {
  //   path: "/roleHasPermission",
  //   component: RoleHasPermission,
  // },

  {
    path: "/role",
    component: Role,
    permission: "role.list",
  },

  {
    path: "/permission",
    component: Permission,
    permission: "permission.list",
  },

  {
    path: "/module",
    component: Module,
    permission: "module.list",
  },

  // {
  //   path: "/usersRole",
  //   component: UsersRole,
  // },

  {
    path: "/roleHasPermission",
    component: RoleHasPermission,
  },

  {
    path: "/adminHasPermission",
    component: AdminHasPermission,
  },

  {
    path: "/log",
    component: Log,
  },

  {
    path: "/industry",
    component: Industry,
    permission: "industry.list",
  },
  
  {
    path: "/policy",
    component: Policy,
    permission: "policy.list",
  },

  {
    path: "/jobActivity",
    component: JobActivity,
  },

  {
    path: "/groupCategory",
    component: GroupCategory,
  },

  {
    path: "/notification",
    component: Notification,
  },

  {
    path: "/task",
    component: Task,
  },

  {
    path: "/report",
    component: Report,
  },
  {
    path: "/report/:id",
    component: ReportDetailed,
  },
    {
        path: '/contact',
        component: Contact,
    },

    {
        path: '/importHistory',
        component: ImportHistory,
    },

/** TODO: CLIENT ROUTE */

  {
    path: "/dashboard",
    component: Dashboard,
  },
  // {
  //   path: "/products",
  //   component: Products,
  // },
  {
    path: "/attributes",
    component: Attributes,
  },
  {
    path: "/attributes/:id",
    component: ChildAttributes,
  },
  {
    path: "/product/:id",
    component: ProductDetails,
  },
  {
    path: "/categories",
    component: Category,
  },
  {
    path: "/languages",
    component: Languages,
  },
  {
    path: "/currencies",
    component: Currencies,
  },

  {
    path: "/categories/:id",
    component: ChildCategory,
  },
  {
    path: "/customers",
    component: Customers,
  },
  {
    path: "/customer-order/:id",
    component: CustomerOrder,
  },
  {
    path: "/our-staff",
    component: Staff,
    permission: "ourstaff.list",
  },
  {
    path: "/orders",
    component: Orders,
  },
  {
    path: "/order/:id",
    component: OrderInvoice,
  },

  {
    path: "/coupons",
    component: Coupons,
  },
  { path: "/settings", component: Setting },
  {
    path: "/accessoryimport",
    component: AccessoryImport,
  },
  {
    path: "/retailerimport",
    component: RetailerImport,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/coming-soon",
    component: ComingSoon,
  },
  {
    path: "/edit-profile",
    component: EditProfile,
  },
];

export default routes;

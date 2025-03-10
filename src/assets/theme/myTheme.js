const myTheme = {
  // Alert
  alert: {
    base: 'p-4 pl-12 relative rounded-lg leading-5',
    withClose: 'pr-12',
    success: 'bg-blue-50 text-blue-900 dark:bg-blue-600 dark:text-white',
    danger: 'bg-red-50 text-red-900 dark:bg-red-600 dark:text-white',
    warning: 'bg-yellow-50 text-yellow-900 dark:bg-yellow-600 dark:text-white',
    neutral: 'bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    info: 'bg-blue-50 text-blue-900 dark:bg-blue-600 dark:text-white',
    icon: {
      base: 'h-5 w-5',
      success: 'text-blue-400 dark:text-blue-300',
      danger: 'text-red-400 dark:text-red-300',
      warning: 'text-yellow-400 dark:text-yellow-100',
      neutral: 'text-gray-400 dark:text-gray-500',
      info: 'text-blue-400 dark:text-blue-300',
    },
  },
  // Pagination
  pagination: {
    base: 'flex flex-col justify-between text-xs sm:flex-row text-gray-600 dark:text-gray-400',
  },
  // TableFooter
  tableFooter: {
    base: 'px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white text-gray-500 dark:text-gray-400 dark:bg-gray-800',
  },
  // TableRow
  tableRow: {
    base: '',
  },
  // TableHeader
  tableHeader: {
    base: 'text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800',
  },
  // TableContainer
  tableContainer: {
    base: 'w-full overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5',
  },
  // TableCell
  tableCell: {
    base: 'px-4 py-3',
  },
  // TableBody
  tableBody: {
    base: 'bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400',
  },
  // DropdownItem
  // this is the <li> that lives inside the Dropdown <ul>
  // you're probably looking for the dropdownItem style inside button
  dropdownItem: {
    base: 'mb-2 last:mb-0',
  },
  // Dropdown
  dropdown: {
    base: 'absolute w-56 p-2 mt-2 text-gray-600 bg-white dark:bg-gray-800 dark:border-gray-700 border border-gray-100 rounded-lg shadow-md min-w-max-content',
    align: {
      left: 'left-0',
      right: 'right-0',
    },
  },
  // Avatar
  avatar: {
    base: 'relative rounded-full inline-block',
    size: {
      large: 'w-10 h-10',
      regular: 'w-8 h-8',
      small: 'w-6 h-6',
    },
  },
  // Modal
  modal: {
    base: 'w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 max-w-4xl min-w-xl custom-modal',
  },
  // ModalBody
  modalBody: {
    base: 'mb-6 text-sm text-gray-700 dark:text-gray-400',
  },
  // ModalFooter
  modalFooter: {
    base: 'flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-3 sm:space-y-0 sm:space-x-4 sm:flex-row bg-gray-50 dark:bg-gray-800',
  },
  // ModalHeader
  modalHeader: {
    base: 'mt-4 mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300',
  },
  // Badge
  badge: {
    base: 'inline-flex px-2 text-xs font-medium leading-5 rounded-full',
    success:
      'text-green-500 bg-green-100 dark:bg-green-800 dark:text-blue-100',
    danger: 'text-red-500 bg-red-100 dark:text-red-100 dark:bg-red-800',
    warning: 'text-yellow-500 bg-yellow-100 dark:text-white dark:bg-yellow-600',
    neutral: 'text-gray-500 bg-gray-100 dark:text-gray-100 dark:bg-gray-800',
    primary: 'text-blue-500 bg-blue-100 dark:text-white dark:bg-blue-800',
  },
  // Backdrop
  backdrop: {
    base: 'fixed inset-0 custom-modal z-40 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center enter enter-active',
  },
  // Textarea
  textarea: {
    base: 'rounded-md peer w-full px-3 leading-5 py-2 border-b border-blue-gray-200 bg-transparent text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 form-textarea',
    active:
      'focus:border-purple-400 border-gray-300 dark:border-gray-600 dark:focus:border-gray-600 dark:bg-gray-700 dark:focus:ring-gray-300 focus:ring focus:ring-purple-300',
    disabled: 'border border-gray-300 peer w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50',
    readOnly: 'cursor-not-allowed opacity-70 bg-gray-200 dark:bg-gray-700',
    valid:
      'border-blue-600 dark:bg-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring focus:ring-blue-200 dark:focus:ring-blue-200',
    invalid:
      'border-red-600 dark:bg-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-200',
  },
  // Select
  select: {
    base: 'rounded-md peer px-3 leading-5 py-2 border-b border-blue-gray-200 bg-transparent text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50',
    active:
      'focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-blue-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700',
    select: 'leading-5',
    disabled: 'border border-gray-300 peer w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50',
    valid:
      'border-blue-600 dark:bg-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring focus:ring-blue-200 dark:focus:ring-blue-200',
    invalid:
      'border-red-600 dark:bg-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-200',
  },
  // Label
  label: {
    base: 'block text-sm text-gray-700 dark:text-gray-400',
    // check and radio get this same style
    check: 'inline-flex items-center',
    disabled: 'opacity-50 cursor-not-allowed',
  },
  // Input
  input: {
    // base: 'block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md',
    base: 'border border-gray-300 rounded-md peer w-full px-3 leading-5 py-2 bg-white text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50',
    active:
      'focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-blue-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700',
    disabled: 'cursor-not-allowed border border-gray-300 peer w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50',
    readOnly: 'cursor-not-allowed opacity-80 bg-gray-200 dark:bg-gray-700',
    valid:
      'border-blue-600 dark:bg-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring focus:ring-blue-200 dark:focus:ring-blue-200',
    invalid:
      'border-red-600 dark:bg-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-200',
    radio:
      'text-blue-500 form-radio focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-0 dark:focus:ring-gray-300',
    checkbox:
      'text-blue-500 form-checkbox focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-0 rounded dark:focus:ring-gray-300',
  },
  // HelperText
  helperText: {
    base: 'text-xs',
    valid: 'text-blue-600 dark:text-blue-400',
    invalid: 'text-red-600 dark:text-red-400',
  },
  // Card
  card: {
    base: 'min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden',
    default: 'bg-white dark:bg-gray-800',
  },
  cardBody: {
    base: 'p-1',
  },
  // Button
  button: {
    base: 'select-none align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none',
    block: 'w-full',
    size: {
      larger: 'px-10 py-4 rounded-lg',
      large: 'px-5 py-3 rounded-lg',
      regular: 'px-4 py-2 rounded-lg text-sm',
      small: 'px-3 py-1 rounded-md text-sm',
      icon: {
        larger: 'p-4 rounded-lg',
        large: 'p-3 rounded-lg',
        regular: 'p-2 rounded-lg',
        small: 'p-2 rounded-md',
      },
      pagination: 'px-3 py-1 rounded-md text-xs',
    },
    // styles applied to the SVG icon
    icon: {
      larger: 'h-5 w-5',
      large: 'h-5 w-5',
      regular: 'h-5 w-5',
      small: 'h-3 w-3',
      left: 'mr-2 -ml-1',
      right: 'ml-2 -mr-1',
    },
    primary: {
      base: 'text-white bg-blue-500 border border-transparent',
      active:
        'active:bg-blue-600 hover:bg-blue-600 focus:ring focus:ring-purple-300',
      disabled: 'opacity-50 cursor-not-allowed',
    },
    outline: {
      base: 'text-gray-600 border-gray-200 border dark:text-gray-400 focus:outline-none',
      active:
        'rounded-lg border border-gray-200 px-4 w-full mr-3 flex items-center justify-center cursor-pointer bg-gray-200',
      disabled: 'opacity-50 cursor-not-allowed bg-gray-300',
    },
    link: {
      base: 'text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent',
      active:
        'active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10',
      disabled: 'opacity-50 cursor-not-allowed',
    },
    // this is the button that lives inside the DropdownItem
    dropdownItem: {
      base: 'inline-flex items-center cursor-pointer w-full px-2 py-1 text-sm font-medium transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200',
    },
  },
};
export default myTheme;

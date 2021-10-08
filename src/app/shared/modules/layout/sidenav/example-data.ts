/** Example file/folder data. */
export const files = [
  // {
  //   name: 'Auth',
  //   type: 'folder',
  //   children: [
  //     { name: 'Login', type: 'file' },
  //     { name: 'Forgot Password', type: 'file' },
  //     { name: 'Menu', type: 'file' },
  //     { name: 'Constant', type: 'file' },
  //   ]
  // },
  {
    name: 'Admin',
    type: 'folder',
    children: [
      { name: 'User', type: 'file', url: 'main/admin/user' },
      { name: 'RBAC', type: 'file', url: 'main/admin/rbac' },
      { name: 'Menu', type: 'file' },
      { name: 'Constant', type: 'file' },
    ]
  },
  {
    name: 'Form Builder',
    type: 'folder',
    children: [
        { name: 'Forms', type: 'file' },
        { name: 'Fields', type: 'file' }
    ]
  },
  {
    name: 'Tracker',
    type: 'folder',
    children: [
      { name: 'Visitor', type: 'file' },
      { name: 'Vendor', type: 'file' },
      { name: 'Vehicle', type: 'file' },
      { name: 'Parking', type: 'file' },
    ]
  },
  {
    name: 'Communication',
    type: 'folder',
    children: [
      { name: 'Email', type: 'file' },
      { name: 'Sms', type: 'file' },
      { name: 'Notification', type: 'file' },
      { name: 'Discussion Forum', type: 'file' },
      { name: 'Opinion Poll', type: 'file' },
      { name: 'Meets Of Meeting', type: 'file' },
      { name: 'Chat', type: 'file' }
    ]
  },
  {
    name: 'Accounts',
    type: 'folder',
    children: [
      { name: 'Ledger', type: 'file' },
      { name: 'Income', type: 'file' },
      { name: 'Expense', type: 'file' },
      { name: 'Voucher', type: 'file' }
    ]
  },
  {
    name: 'Pathology',
    type: 'folder',
    children: [
      
      {
        name: 'Labs',
        type: 'folder',
        children: [
          { name: 'Add', type: 'file' },
          { name: 'Test', type: 'file' },
          { name: 'Rates', type: 'file' },
          { name: 'Component', type: 'file' }
        ]
      },
      {
        name: 'Doctors',
        type: 'folder',
        children: [
          { name: 'Add', type: 'file' },
        ]
      },
      {
        name: 'Patients',
        type: 'folder',
        children: [
          { name: 'Add', type: 'file' },
        ]
      }
    ]
  }
];
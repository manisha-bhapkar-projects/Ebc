export const Scope_Listing = [
  {
    id: "1",
    value: "My Bids",
  },
  {
    id: "2",
    value: "Other Bids",
  },
  {
    id: "3",
    value: "All Bids",
  },
];

export const Scope_Listing_Status = (id) => {
  switch (id) {
    case "1":
      return "My Bids";
    case "2":
      return "Other Bids";
    case "3":
      return "All Bids";
    default:
      return id;
  }
};

export const Scope_Listing_For_Trade = [
  {
    id: "1",
    value: "My Trade",
  },
  {
    id: "2",
    value: "Other Trade",
  },
  {
    id: "3",
    value: "All Trade",
  },
];

export const Scope_Listing_Status_Trade = (id) => {
  switch (id) {
    case "1":
      return "My Trade";
    case "2":
      return "Other Trade";
    case "3":
      return "All Trade";
    default:
      return id;
  }
};

export const Scope_Listing_For_Offers = [
  {
    id: "1",
    value: "My Offers",
  },
  {
    id: "2",
    value: "Other Offers",
  },
  {
    id: "3",
    value: "All Offers",
  },
];

export const Scope_Listing_Offers = (id) => {
  switch (id) {
    case "1":
      return "My Offers";
    case "2":
      return "Other Offers";
    case "3":
      return "All Offers";
    default:
      return id;
  }
};

export const status = [
  {
    id: "1",
    value: "open",
  },
  {
    id: "2",
    value: "cancelled",
  },
  {
    id: "3",
    value: "fulfilled",
  },
];

export const Status_List = (id) => {
  switch (id) {
    case "1":
      return "open";
    case "2":
      return "cancelled";
    case "3":
      return "fulfilled";
    default:
      return id;
  }
};

export const role = [
  {
    id: "1",
    value: "User",
  },
  {
    id: "2",
    value: "Approver",
  },
];

export const role_list = (id) => {
  switch (id) {
    case "1":
      return "User";
    case "2":
      return "Approver";
    default:
      return id;
  }
};

export const status_for_trade = [
  {
    id: "1",
    value: "created",
  },
];

export const Status_List_for_trade = (id) => {
  switch (id) {
    case "1":
      return "created";
    default:
      return id;
  }
};
export const Listing = [
  {
    id: "1",
    value: "EBC",
  },
  {
    id: "2",
    value: "APS",
  },
  {
    id: "3",
    value: "SunSales",
  },
  {
    id: "4",
    value: "DERAnalytics",
  },
];

export const Listing_Status = (id) => {
  switch (id) {
    case "1":
      return "EBC";
    case "2":
      return "APS";
    case "3":
      return "SunSales";
    case "4":
      return "DERAnalytics";

    default:
      return id;
  }
};

export const bids_action = [
  {
    id: "1",
    value: "Add Bids",
  },
  {
    id: "2",
    value: "View List",
  },
  {
    id: "3",
    value: "View Chart",
  },
];

export const bids_action_data = (id) => {
  switch (id) {
    case "1":
      return "Add Bids";
    case "2":
      return "View List";
    case "3":
      return "View Chart";
    default:
      return id;
  }
};

export const offer_action = [
  {
    id: "1",
    value: "Add Offer",
  },
  {
    id: "2",
    value: "View List",
  },
  {
    id: "3",
    value: "View Chart",
  },
];

export const offer_action_data = (id) => {
  switch (id) {
    case "1":
      return "Add Offer";
    case "2":
      return "View List";
    case "3":
      return "View Chart";
    default:
      return id;
  }
};

export const trade_action = [
  {
    id: "1",
    value: "View List",
  },
  {
    id: "2",
    value: "View Chart",
  },
];

export const trade_action_data = (id) => {
  switch (id) {
    case "1":
      return "View List";
    case "2":
      return "View Chart";
    default:
      return id;
  }
};

export const chart_title = [
  {
    id: 1,
    title: "Total Units",
  },
  {
    id: 2,
    title: "Mean",
  },
  {
    id: 3,
    title: "Median",
  },
  {
    id: 4,
    title: "Mode",
  },
  {
    id: 5,
    title: "High Price",
  },
  {
    id: 6,
    title: "Low Price",
  },
];


// export const chart_title = [
//   {
//     title: "Total Units",
//     title: "Mean",
//     title: "Median",
//     title: "Mode",
//     title: "High Price",
//     title: "Low Price",
//   }

// ];

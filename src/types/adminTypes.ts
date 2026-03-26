export type AdminLoginPayload = {
  email: string;
};

export type AdminVerifyPayload = {
  code: string;
};

export type AdminLoginResponse = {
  accessToken: string;
};

export type Order = {
  id: string;
  userId: string;
  pairId: string;
  networkId: string;
  depositAddress: string;
  fiatAmount: string;
  cryptoAmount: string;
  paymentMethod: string;
  status: string;
  createdAt: string;
  updatedAt: string;

  user: {
    id: string;
    email: string;
    phone: string;
    language: string;
    createdAt: string;
    updatedAt: string;
  };

  pair: {
    id: string;
    rate: string;

    fiatAsset: {
      symbol: string;
      name: string;
    };

    cryptoAsset: {
      symbol: string;
      name: string;
    };
  };

  network: {
    name: string;
    label: string;
  };
};

export type Account = {
  id: string;
  email: string;
  language: string;
  createdAt: string;
  updatedAt: string;
  country: string | null;
  name: string | null;
  totalSum: string;
  types: string[];
  transactionsCount: number;
  registration: {
    id: string;
    userId: string;
    userType: "INDIVIDUAL" | "COMPANY";
    fullName: string | null;
    companyName: string | null;
    registrationNumber: string | null;
    contactPerson: string | null;
    phone: string | null;
    country: string | null;
  } | null;
};

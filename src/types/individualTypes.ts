export type IndividualOrder = {
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

  pair: {
    rate: string;
    fiatAsset: {
      symbol: string;
    };
    cryptoAsset: {
      symbol: string;
    };
  };

  network: {
    name: string;
  };
};

export type IndividualProfile = {
  id: string;
  userId: string;
  email: string;
  userType: "INDIVIDUAL";
  fullName: string | null;
  phone: string | null;
  country: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateIndividualProfilePayload = {
  email: string;
  phone: string;
  fullName: string;
  country: string;
};

export type UpdateIndividualProfilePayload = {
  email: string;
  phone: string;
  fullName: string;
  country: string;
};

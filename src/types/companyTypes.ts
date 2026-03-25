export type CompanyProfile = {
  id: string;
  userId: string;
  email: string;
  userType: "COMPANY";
  phone: string | null;
  companyName: string | null;
  registrationNumber: string | null;
  country: string | null;
  contactPerson: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateCompanyProfilePayload = {
  email: string;
  phone: string;
  companyName: string;
  registrationNumber: string;
  country: string;
  contactPerson: string;
};

export type UpdateCompanyProfilePayload = {
  email: string;
  phone: string;
  companyName: string;
  registrationNumber: string;
  country: string;
  contactPerson: string;
};

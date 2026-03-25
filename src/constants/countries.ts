import italy from "@/assets/images/coutries/italy.png";
import france from "@/assets/images/coutries/france.png";
import greatBritain from "@/assets/images/coutries/great-britain.png";
import spain from "@/assets/images/coutries/spain.png";
import poland from "@/assets/images/coutries/poland.png";
import finland from "@/assets/images/coutries/finland.png";

export const CountryEnum = {
  ITALY: "ITALY",
  FRANCE: "FRANCE",
  GREAT_BRITAIN: "GREAT_BRITAIN",
  SPAIN: "SPAIN",
  POLAND: "POLAND",
  FINLAND: "FINLAND",
} as const;

export type CountryEnum = (typeof CountryEnum)[keyof typeof CountryEnum];

export const availableCountries = [
  {
    id: CountryEnum.ITALY,
    name: "Italy",
    flag: italy,
    phoneCode: "+39",
    phonePlaceholder: "344 5146586",
  },
  {
    id: CountryEnum.FRANCE,
    name: "France",
    flag: france,
    phoneCode: "+33",
    phonePlaceholder: "6 12 34 56 78",
  },
  {
    id: CountryEnum.GREAT_BRITAIN,
    name: "Great Britain",
    flag: greatBritain,
    phoneCode: "+44",
    phonePlaceholder: "7911 123456",
  },
  {
    id: CountryEnum.SPAIN,
    name: "Spain",
    flag: spain,
    phoneCode: "+34",
    phonePlaceholder: "612 345 678",
  },
  {
    id: CountryEnum.POLAND,
    name: "Poland",
    flag: poland,
    phoneCode: "+48",
    phonePlaceholder: "512 345 678",
  },
  {
    id: CountryEnum.FINLAND,
    name: "Finland",
    flag: finland,
    phoneCode: "+358",
    phonePlaceholder: "50 123 4567",
  },
];

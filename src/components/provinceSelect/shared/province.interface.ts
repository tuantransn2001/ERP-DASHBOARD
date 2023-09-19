export interface IProvince {
  name: string;
  codename: string;
  division_type: string;
  phone_code: number;
  code: number;
  districts: IDistrict[];
}

export interface IDistrict {
  code: number;
  name: string;
  codename: string;
  division_type: string;
  short_codename: string;
  wards: IWard[];
}

export interface IWard {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  short_codename: string;
}

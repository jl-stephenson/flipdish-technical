export type MenuType = {
  MenuId: number;
  MenuVersionNumber: number;
  VersionGuid: string;
  MenuSections: MenuSection[];
  MenuSectionBehaviour: number;
  DisplaySectionLinks: boolean;
  ConcessionStores: unknown[];
};

export type TransformedMenu = Pick<MenuType, "MenuId"> & {
  MenuSection: TransformedMenuSection[];
};

export type MenuSection = {
  MenuSectionId: number;
  Name: string;
  Description: string | null;
  DisplayOrder: number;
  MenuItems: MenuItem[];
  PublicId: string;
  IsDeleted: boolean;
  IsAvailable: boolean;
  IsHiddenFromUsers: boolean;
  ImageName: string | null;
  ImageUrl: string | null;
  CellAspectRatio: number;
  CellLayoutType: number;
  MenuSectionAvailability: MenuSectionAvailability;
  ConcessionStoreId?: unknown;
  MenuSectionMetadata: unknown[];
};

export type TransformedMenuSection = Pick<
  MenuSection,
  "MenuSectionId" | "Name" | "Description" | "ImageName" | "ImageUrl"
> & {
  MenuItems: TransformedMenuItem[];
};

export type MenuItem = {
  MenuItemId: number;
  Name: string;
  Description: string | null;
  SpicinessRating: number | null;
  Price: number;
  DisplayOrder: number;
  IsDeleted: boolean;
  Alcohol: boolean;
  Tags: unknown[];
  PublicId: string;
  IsAvailable: boolean;
  MenuItemOptionSets: MenuItemOptionSet[];
  TaxRate?: unknown;
  TaxRateId: unknown;
  TaxValue: number;
  MenuSectionId: number;
  ImageName: string | null;
  ImageUrl: string | null;
  CellAspectRatio: number;
  CellLayoutType: number;
  ActualPrice: number;
  DisableVouchers: boolean;
  ExcludeFromVoucherDiscounting: boolean;
  DailySpecialHours: unknown[];
  PriceCanIncrease: boolean;
  MenuItemMetadata: unknown[];
};

export type TransformedMenuItem = {
  ItemId: number;
  DisplayItems: DisplayItem[];
  Extras: Extra[];
};

export type DisplayItem = {
  Id: number;
  Name: string;
  Description: string | null;
  Price: number;
  ImageUrl: string | null;
  MaxSelectCount: number;
};

export type Extra = {
  Id: number;
  Name: string;
  Price: number;
};

type MenuItemOptionSet = {
  Name: string | null;
  MenuItemOptionSetId: number;
  IsMasterOptionSet: boolean;
  DisplayOrder: number;
  MinSelectCount: number;
  MaxSelectCount: number;
  IsDeleted: boolean;
  PublicId: string;
  MenuItemOptionSetItems: MenuItemOptionSetItem[];
  ImageName: string | null;
  ImageUrl: string | null;
  CellAspectRatio: number;
  CellLayoutType: number;
  MinPrice: number;
  MenuItemId: number;
  MenuItemOptionSetMetadata: unknown[];
};

type MenuItemOptionSetItem = {
  MenuItemOptionSetItemId: number;
  Name: string;
  Price: number;
  TaxRateId?: unknown;
  TaxRate?: unknown;
  TaxValue: number;
  IsAvailable: boolean;
  DisplayOrder: number;
  IsDeleted: boolean;
  Tags: unknown[];
  NextMenuItemOptionSetId: number | null;
  PublicId: string;
  ImageName: string | null;
  ImageUrl: string | null;
  CellAspectRatio: number;
  CellLayoutType: number;
  OptionSetItemMetadata: unknown[];
};

type MenuSectionAvailability = {
  MenuSectionId: number;
  AvailableTimes: AvailableTime[] | null;
  AvailabilityMode: number;
};

type AvailableTime = {
  BusinessHoursPeriodId: number;
  DayOfWeek: number;
  StartTime: string;
  Period: string;
  StartTimeEarly: string;
  PeriodEarly: string;
};

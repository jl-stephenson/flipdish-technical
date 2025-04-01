export type MenuType = {
  MenuId: number;
  MenuVersionNumber: number;
  VersionGuid: string;
  MenuSections: MenuSection[];
  MenuSectionBehaviour: number;
  DisplaySectionLinks: boolean;
  ConcessionStores: unknown[];
};

type MenuSection = {
    MenuSectionId: number;
    Name: string;
    Description: string;
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
    ConcessionStoreId: unknown;
    MenuSectionMetadata: unknown[];
}

type MenuItem = {
    MenuItemId: number;
    Name: string;
    Description: string;
    SpicinessRating: number | null;
    Price: number;
    DisplayOrder: number;
    isDeleted: boolean;
    Alcohol: boolean;
    Tags: unknown[];
    PublicId: string;
    IsAvailable: boolean;
    MenuItemOptionSets: MenuItemOptionSet[];
    TaxRate: unknown;
    TaxRateId: unknown;
    TaxValue: number;
    MenuSectionId: number;
    ImageName: string;
    ImageNumber: string;
    CellAspectRatio: number;
    CellLayoutType: number;
    ActualPrice: number;
    DisableVouchers: boolean;
    ExcludeFromVoucherDiscounting: boolean;
    DailySpecialHours: unknown[];
    PriceCanIncrease: boolean;
    MenuItemMetadata: unknown[];
}

type MenuItemOptionSet = {
    Name: string;
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
}

type MenuItemOptionSetItem = {
    MenuItemOptionSetItemId: number;
    Name: string;
    Price: number;
    TaxRateId: unknown;
    TaxRate: unknown;
    TaxValue: number;
    IsAvailable: boolean;
    DisplayOrder: number;
    IsDeleted: boolean;
    Tags: unknown[];
    NextMenuItemOptionSetId: number | null;
    PublicId: string;
    ImageName: string;
    ImageUrl: string;
    CellAspectRatio: number;
    CellLayoutType: number;
    OptionSetItemMetadata: unknown[];
}

type MenuSectionAvailability = {
    MenuSectionId: number;
    AvailableTimes: unknown;
    AvailabilityMode: number;
}
export type Menu = {
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



type MenuSectionAvailability = {
    MenuSectionId: number;
    AvailableTimes: unknown;
    AvailabilityMode: number;
}
import {
  MenuType,
  MenuSection,
  TransformedMenuSection,
  MenuItem,
} from "../types/Menu";

export function transformMenu(data: MenuType) {
  return {
    MenuId: data.MenuId,
    MenuSections: data.MenuSections.map(transformMenuSection),
  };
}

export function transformMenuSection(
  section: MenuSection,
): TransformedMenuSection {
  return {
    MenuSectionId: section.MenuSectionId,
    Name: section.Name,
    Description: section.Description,
    ImageName: section.ImageName,
    ImageUrl: section.ImageUrl,
    MenuItems: section.MenuItems.map(transformMenuItem),
  };
}

export function transformMenuItem(item: MenuItem) {
  // return an array of diplayItems and extras

  if (item.MenuItemOptionSets.length === 0)
    return {
      ItemId: item.MenuItemId,
      DisplayItems: [createDefaultDisplayItem(item, 1)],
      Extras: [],
    };

  return {
    ItemId: item.MenuItemId,
    DisplayItems: [createDefaultDisplayItem(item, 1)],
    Extras: [],
  };
}

function createDefaultDisplayItem(item: MenuItem, MaxSelectCount: number) {
  return {
    Id: item.MenuItemId,
    Name: item.Name,
    Description: item.Description,
    Price: item.Price,
    ImageUrl: item.ImageUrl,
    MaxSelectCount,
  };
}

import {
  MenuType,
  MenuSection,
  TransformedMenuSection,
  MenuItem,
  MenuItemOptionSetItem,
  TransformedMenuItemOptionSetItem,
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
  // if option set has at least 1 min select count map display item for each option
  const requiredOptionItems = item.MenuItemOptionSets.filter(
    (optionSet) => optionSet.MinSelectCount > 0,
  )
    .map((optionSet) =>
      optionSet.MenuItemOptionSetItems.map((item) => ({
        ...item,
        IsMasterOptionSet: optionSet.IsMasterOptionSet,
      })),
    )
    .flat();

  // if option set has 0 min select count, treat as option extras
  const optionalOptionItems = item.MenuItemOptionSets.filter(
    (optionSet) => optionSet.MinSelectCount === 0,
  )
    .map((optionSet) => optionSet.MenuItemOptionSetItems)
    .flat();

  const highestMaxSelect = findHighestMaxSelect(item);

  return {
    ItemId: item.MenuItemId,
    MaxSelectCount: highestMaxSelect,
    DisplayItems:
      requiredOptionItems.length > 0
        ? requiredOptionItems.map((optionItem) =>
            createDisplayItemFromOption(item, optionItem),
          )
        : [createDefaultDisplayItem(item)],
    Extras: optionalOptionItems.map((extra) => createOptionalExtraItem(extra)),
  };
}

export function findHighestMaxSelect(item: MenuItem) {
  return item.MenuItemOptionSets.reduce((max, optionSet) => {
    return optionSet.MaxSelectCount > max ? optionSet.MaxSelectCount : max;
  }, 1);
}

export function createDefaultDisplayItem(item: MenuItem) {
  return {
    Id: `item-${item.MenuItemId}`,
    Name: item.Name,
    Description: item.Description,
    Price: item.Price,
    ImageUrl: item.ImageUrl,
  };
}

function createDisplayItemFromOption(
  item: MenuItem,
  optionItem: TransformedMenuItemOptionSetItem,
) {
  return {
    Id: `option-${optionItem.MenuItemOptionSetItemId}`,
    Name:
      item.Name === optionItem.Name
        ? optionItem.Name
        : `${item.Name} - ${optionItem.Name}`,
    Description: item.Description,
    Price: optionItem.IsMasterOptionSet
      ? optionItem.Price
      : item.Price + optionItem.Price,
    ImageUrl: optionItem.ImageUrl ?? item.ImageUrl,
  };
}

function createOptionalExtraItem(extra: MenuItemOptionSetItem) {
  return {
    Id: `extra-${extra.MenuItemOptionSetItemId}`,
    Name: extra.Name,
    Price: extra.Price,
  };
}

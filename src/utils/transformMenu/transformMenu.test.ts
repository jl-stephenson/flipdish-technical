import { describe, expect, it } from "vitest";
import {
  createDefaultDisplayItem,
  findHighestMaxSelect,
  transformMenu,
  transformMenuItem,
  transformMenuSection,
} from "./transformMenu";
import menuData from "../../__mocks__/menuData.json";

describe("transform menu", () => {
  const transformedMenu = transformMenu(menuData);
  it("returns a menu object with properties MenuId & MenuSections", () => {
    expect(Object.keys(transformedMenu)).toHaveLength(2);
    expect(transformedMenu).toHaveProperty("MenuId");
    expect(transformedMenu).toHaveProperty("MenuSections");
  });

  it("preserves the MenuId", () => {
    expect(transformedMenu.MenuId).toEqual(menuData.MenuId);
  });
});

describe("transform menu section", () => {
  const transformedSections = menuData.MenuSections.map(transformMenuSection);

  it("returns correct number of sections", () => {
    expect(transformedSections).toHaveLength(menuData.MenuSections.length);
  });

  it("returns section objects with the correct properties", () => {
    const firstSection = transformedSections[0];

    expect(firstSection).toMatchObject({
      MenuSectionId: expect.any(Number),
      Name: expect.any(String),
      Description: expect.toBeStringOrNull(),
      ImageName: expect.toBeStringOrNull(),
      ImageUrl: expect.toBeStringOrNull(),
      MenuItems: expect.any(Array),
    });
  });
});

describe("transform of simple menu item", () => {
  const curry = menuData.MenuSections[1].MenuItems[0];
  const transformedCurryItem = transformMenuItem(curry);

  it("returns tranformed menu item with correct properties", () => {
    expect(transformedCurryItem).toMatchObject({
      ItemId: curry.MenuItemId,
      MaxSelectCount: findHighestMaxSelect(curry),
      DisplayItems: expect.any(Array),
      Extras: expect.any(Array),
    });
  });

  it("returns a single display item with correct properties", () => {
    const displayItems = transformedCurryItem.DisplayItems;
    expect(displayItems).toHaveLength(1);
    expect(displayItems[0]).toMatchObject({
      Id: curry.MenuItemId,
      Name: curry.Name,
      Description: curry.Description,
      Price: curry.Price,
      ImageUrl: curry.ImageUrl,
    });
  });
});

describe("create default display item", () => {
  it("returns display item with correct properties", () => {
    const curry = menuData.MenuSections[1].MenuItems[0];
    const DisplayItem = createDefaultDisplayItem(curry);

    expect(DisplayItem).toMatchObject({
      Id: curry.MenuItemId,
      Name: curry.Name,
      Description: curry.Description,
      Price: curry.Price,
      ImageUrl: curry.ImageUrl,
    });
  });
});

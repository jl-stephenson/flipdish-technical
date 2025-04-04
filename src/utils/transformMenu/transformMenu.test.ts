import { describe, expect, it } from "vitest";
import {
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

describe("transform menu item", () => {
  describe("transform simple menu item", () => {
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
      expect(transformedCurryItem.DisplayItems).toHaveLength(1);
      expect(transformedCurryItem.DisplayItems[0]).toMatchObject({
        Id: `item-${curry.MenuItemId}`,
        Name: curry.Name,
        Description: curry.Description,
        Price: curry.Price,
        ImageUrl: curry.ImageUrl,
      });
    });

    it("returns an empty extras array", () => {
      const extras = transformedCurryItem.Extras;
      expect(extras).toHaveLength(0);
    });
  });

  describe("transform complex menu item with no extras", () => {
    const salad = menuData.MenuSections[0].MenuItems[0];
    const transformedSaladItem = transformMenuItem(salad);

    it("returns the correct number of display items", () => {
      expect(transformedSaladItem.DisplayItems).toHaveLength(
        salad.MenuItemOptionSets[0].MenuItemOptionSetItems.length,
      );
    });

    it("returns display items with correct properties and values", () => {
      const saladOptionItem1 =
        salad.MenuItemOptionSets[0].MenuItemOptionSetItems[0];

      expect(transformedSaladItem.DisplayItems[0]).toMatchObject({
        Id: `option-${saladOptionItem1.MenuItemOptionSetItemId}`,
        Name: `${salad.Name} - ${saladOptionItem1.Name}`,
        Price: salad.Price + saladOptionItem1.Price,
        ImageUrl: salad.ImageUrl,
      });
    });

    it("returns an empty extras array", () => {
      expect(transformedSaladItem.Extras).toHaveLength(0);
    });
  });

  describe("transform complex menu item with extras", () => {
    const chips = menuData.MenuSections[0].MenuItems[1];
    const transformedChips = transformMenuItem(chips);

    it("returns the correct number of display items", () => {
      expect(transformedChips.DisplayItems).toHaveLength(
        chips.MenuItemOptionSets.filter(
          (optionSet) => optionSet.MinSelectCount > 0,
        )
          .map((optionSet) => optionSet.MenuItemOptionSetItems)
          .flat().length,
      );
    });

    it("returns the correct number of extras", () => {
      expect(transformedChips.Extras).toHaveLength(
        chips.MenuItemOptionSets.filter(
          (optionSet) => optionSet.MinSelectCount === 0,
        )
          .map((optionSet) => optionSet.MenuItemOptionSetItems)
          .flat().length,
      );
    });

    it("returns extras with correct properties", () => {
      const firstChipsExtra =
        chips.MenuItemOptionSets[1].MenuItemOptionSetItems[0];

      expect(transformedChips.Extras[0]).toMatchObject({
        Id: `extra-${firstChipsExtra.MenuItemOptionSetItemId}`,
        Name: firstChipsExtra.Name,
        Price: firstChipsExtra.Price,
      });
    });
  });

  describe("display item price caclulation", () => {
    const salad = menuData.MenuSections[0].MenuItems[0];
    const transformedSaladItem = transformMenuItem(salad);
    const chips = menuData.MenuSections[0].MenuItems[1];
    const transformedChips = transformMenuItem(chips);

    it("returns correct price if option is master set", () => {
      expect(transformedChips.DisplayItems[1].Price).toEqual(
        chips.MenuItemOptionSets[0].MenuItemOptionSetItems[1].Price,
      );
    });

    it("returns correct price if option is NOT master set", () => {
      expect(transformedSaladItem.DisplayItems[1].Price).toEqual(
        salad.Price +
          salad.MenuItemOptionSets[0].MenuItemOptionSetItems[1].Price,
      );
    });
  });
});

describe("find highest max select count", () => {
  it("returns the correct highest max select", () => {
    const chips = menuData.MenuSections[0].MenuItems[1];
    const result = findHighestMaxSelect(chips);
    expect(result).toEqual(3);
  });

  it("returns default highest max select if item has no option sets", () => {
    const curry = menuData.MenuSections[1].MenuItems[0];
    const result = findHighestMaxSelect(curry);
    expect(result).toBe(1);
  });
});

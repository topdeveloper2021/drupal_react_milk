import { EntityInterface } from "../../DataTypes/Entity";
import { SlideDisplayFiftyFifty } from "./SlideDisplayFiftyFifty";
import { SlideDisplayFullWidthOneColumn } from "./SlideDisplayFullWidthOneColumn";
import { SlideDisplayHeroHalfHeight } from "./SlideDisplayHeroHalfHeight";

/**
 * Implementation of the View
 *
 * @param incoming: SlideInterface
 */
export const SlideComponentFactory = (incoming: EntityInterface) => {
  switch (incoming.type) {
    case "slide--50_50_text_on_left":
      return SlideDisplayFiftyFifty;
    case "slide--50_50_text_on_right":
      return SlideDisplayFiftyFifty;
    case "slide--full_width_one_column":
      return SlideDisplayFullWidthOneColumn;
    case "slide--hero_half_height":
      return SlideDisplayHeroHalfHeight;
    default:
      throw new Error("no Component type defined for: ".concat(incoming.type));
  }
};

export default SlideComponentFactory;

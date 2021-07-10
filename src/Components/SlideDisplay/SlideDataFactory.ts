import { EntityInterface } from "../../DataTypes/Entity";
import { SlideFullWidthOneColumn } from "../../DataTypes/SlideFullWidthOneColumn";
import { SlideFiftyFifty } from "../../DataTypes/SlideFiftyFifty";
import { SlideHeroHalfHeight } from "../../DataTypes/SlideHeroHalfHeight";

/**
 * Implementation of the Data Model
 *
 * @param incoming: SlideInterface
 */
export const SlideDataFactory = (incoming: EntityInterface) => {
  switch (incoming.type) {
    case "slide--50_50_text_on_left":
      return new SlideFullWidthOneColumn(incoming);
    case "slide--50_50_text_on_right":
      return new SlideFiftyFifty(incoming);
    case "slide--full_width_one_column":
      return new SlideFullWidthOneColumn(incoming);
    case "slide--hero_half_height":
      return new SlideHeroHalfHeight(incoming);
    default:
      throw new Error("no Data type defined for: ".concat(incoming.type));
  }
};

export default SlideDataFactory;

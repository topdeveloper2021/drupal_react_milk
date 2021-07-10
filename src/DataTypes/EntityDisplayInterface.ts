import { StyledComponent } from "styled-components";
import { EntityInterface } from "./Entity";

export interface EntityDisplayInterface {
  data: EntityInterface;
  view_mode?: string;
  key?: number;
  container: StyledComponent<any, any>;
}

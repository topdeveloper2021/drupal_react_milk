import {PeopleInterface} from "./index";
import Experts from "./Experts";
import Person from './Person';
import Speakers from './Speakers';
import Staff from './Staff';


export const DataTypePeopleFactory  = (props: PeopleInterface) => {

  switch(props.type) {
    case "people--experts":
      return new Experts(props);
    case "people--person":
      return new Person(props);
    case "people--speakers":
      return new Speakers(props);
    case "people--staff":
      return new Staff(props);
    default:
      throw new Error("No People type defined for: ".concat(props.type));
  }
}

export default DataTypePeopleFactory;

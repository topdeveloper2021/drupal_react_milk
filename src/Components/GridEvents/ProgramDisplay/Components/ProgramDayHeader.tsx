import React from "react";
import moment from "moment";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

interface ProgramDayHeaderProps {
  opened: boolean;
  date: string;
  onToggleOpen: () => void;
  timeZone?: string;
}

const ProgramDayHeader: React.FC<ProgramDayHeaderProps> = (
  props: ProgramDayHeaderProps
) => {
  const { opened, date, onToggleOpen, timeZone } = props;
  return (
    <div className="program-day-header" onClick={onToggleOpen}>
      <div className="program-day-toggler">
        {opened ? <FaChevronDown /> : <FaChevronRight />}
      </div>
      <h4>{moment(date, "YYYY-MM-DD").format("dddd MMMM DD, YYYY")}</h4>
    </div>
  );
};

export default ProgramDayHeader;

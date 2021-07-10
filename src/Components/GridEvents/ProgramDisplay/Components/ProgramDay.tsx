import React, { useState, useEffect } from "react";
import moment from "moment";

import ProgramDaySession from "./ProgramDaySession";
import ProgramDayHeader from "./ProgramDayHeader";
import NodeSession, {
  NodeSessionInterface,
} from "../../../DataTypes/NodeSession";

interface ProgramDayProps {
  date: string;
  getSpeakerById: any;
  getTrackById: any;
  open: boolean;
  panels: object[];
  terms: string[];
  timeZone: string;
  tracks: string[];
  viewMode: number;
}

const ProgramDay: React.FC<ProgramDayProps> = (props: ProgramDayProps) => {
  const {
    date,
    getSpeakerById,
    getTrackById,
    open,
    panels,
    terms,
    timeZone,
    tracks,
    viewMode,
  } = props;

  const [opened, setOpened] = useState<boolean>(!!open);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="programday-container">
      <ProgramDayHeader
        date={date}
        opened={opened}
        onToggleOpen={() => setOpened(!opened)}
        timeZone={timeZone}
      />
      {opened ? (
        panels.length > 0 ? (
          <div className="programday-sessions-container">
            {panels.map((panel, index) => (
              <ProgramDaySession
                getSpeakerById={getSpeakerById}
                getTrackById={getTrackById}
                key={index}
                session={panel}
                timeZone={timeZone}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <p>No elements</p>
        )
      ) : null}
    </div>
  );
};

export default ProgramDay;

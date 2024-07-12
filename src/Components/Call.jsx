import React from "react";
import Icon from "./Icon.jsx";

const Call = ({ call, onClick, onArchiveClick }) => {
  const { direction, from, to, is_archived, call_type, id, created_at } = call;

  const onArchiveClickHandler = () => {
    onArchiveClick({ callId: id, is_archived: !is_archived });
  };
  return (
    <li className="callTile">
      <div className="direction">
        <Icon
          iconName={direction === "inbound" ? "icon_in" : "icon_out"}
          side={30}
        />
      </div>
      <div className="callDetails" onClick={() => onClick(id)}>
        <div className="numbers">
          <div className="number">
            <span>From : </span>
            <span>{from}</span>
          </div>
          <div className="number">
            <span>To : </span>
            <span>{to}</span>
          </div>
        </div>
        <div className="properties">
          <div className="property">
            <span>{created_at.time}</span>
          </div>
          <div className="property">
            <span>Status : </span>
            <span>{call_type}</span>
          </div>
        </div>
      </div>

      <div className="archiveRestore" onClick={onArchiveClickHandler}>
        <Icon
          iconName={call.is_archived ? "icon_unarchive" : "icon_archive"}
          side={40}
        />
      </div>
    </li>
  );
};

export default Call;

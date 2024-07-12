import { types } from "mobx-state-tree";

const Call = types.model(
  {
    direction: "",
    from: 0,
    to: 0,
    via: 0,
    duration: 0,
    is_archived: false,
    call_type: "",
    id: "",
    created_at: ""
  });

export { Call }
import axios from "axios";
import { types, flow } from "mobx-state-tree";
import { Call } from "./call";
import { Interface } from "./interface";
import { parseDate } from "../utils/parseDate";

const api = axios.create({
  baseURL: "https://aircall-backend.onrender.com/",
});

const store = types
  .model({
    interface: types.optional(Interface, {}),
    calls: types.optional(types.array(Call), []),
  })
  .views((self) => ({
    get getCalls() {
      return self.calls.reduce(
        (acc, call) => {
          const parsedDateCall = {
            ...call,
            created_at: parseDate(call.created_at),
          };
          parsedDateCall.is_archived
            ? acc.archivedTabCalls.push(parsedDateCall)
            : acc.activeTabCalls.push(parsedDateCall);
          return acc;
        },
        { activeTabCalls: [], archivedTabCalls: [] }
      );
    },
  }))
  .actions((self) => ({
    fetchAllCalls: flow(function* () {
      try {
        self.interface.setIsLoading(true);
        const { data } = yield api.get("/activities");
        self.calls = [...data];
      } catch (e) {
        console.log("Error fetching calls : ", e.message);
      } finally {
        self.interface.setIsLoading(false);
      }
    }),
    fetchCallById: flow(function* (callId) {
      try {
        const { data } = yield api.get(`/activities/${callId}`);
        const date = new Date(data.created_at);
        const formattedDate = date
          .toLocaleString("en-US", {
            day: "numeric",
            month: "long",
            year: "2-digit",
            hour: "numeric",
            hour12: true,
            minute: "2-digit",
          })
          .replace(",", "");
        return { ...data, created_at: formattedDate };
      } catch (e) {
        console.log("Error fetching call by id : ", e.message);
        return null;
      }
    }),
    updateCall: flow(function* ({
      callId,
      is_archived = false,
      reload = true,
    }) {
      try {
        self.interface.setIsLoading(true);
        yield api.patch(`/activities/${callId}`, {
          is_archived,
        });
        reload ? self.fetchAllCalls() : null;
      } catch (e) {
        console.log("Error updating call: ", e.message);        
        self.interface.setIsLoading(false);
      }
    }),
    updateAllCalls: flow(function* ({ is_archived }) {
      try {
        self.interface.setIsLoading(true);
        yield Promise.all(
          self.calls.map((call) =>
            self.updateCall({
              callId: call.id,
              is_archived,
              reload: false,
            })
          )
        );
        self.fetchAllCalls();
      } catch (e) {
        console.log("Error updating multiple calls : ", e.message);
      }
    }),
  }));

export default store.create();

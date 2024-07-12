import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Loader from "./Loader.jsx";
import { observer } from "mobx-react-lite";
import store from "../MST/store.js";

const CallModal = observer(({ visible, callId, onCloseModal }) => {
  const [fetchedCall, setFetchedCall] = useState();
  const [loadingCall, setLoadingCall] = useState(false);
  const { fetchCallById } = store;

  const fetchCall = async () => {
    setLoadingCall(true);
    const call = await fetchCallById(callId);
    setFetchedCall(call);
    setLoadingCall(false);
  };

  useEffect(() => {
    if (callId) fetchCall();
  }, [callId]);

  return (
    <div className={classNames("callModalBackdrop", { visible })}>
      <div className="callModal">
        {fetchedCall ? (
          <>
            <ul className="callModalDetails">
              {Object.entries(fetchedCall).map(([key, value]) => {
                return (
                  <li key={key}>
                    <span>
                      {key.charAt(0).toUpperCase() +
                        key.slice(1).replace("_", " ") +
                        " : "}
                    </span>
                    <span>{value}</span>
                  </li>
                );
              })}
            </ul>
            <div className="callModalCloseWrapper">
              <button onClick={onCloseModal}>close</button>
            </div>
          </>
        ) : null}

        <Loader show={loadingCall} />
      </div>
    </div>
  );
});

export default CallModal;

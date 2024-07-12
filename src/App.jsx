import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  Header,
  Footer,
  Call,
  Loader,
  BatchOperations,
  CallModal,
} from "./Components";
import { observer } from "mobx-react-lite";

import store from "./MST/store";

const tabsList = ["Active", "Archived"];

const App = observer(() => {
  const {
    interface: { activeTab, isLoading, setActiveTab },
    getCalls,
    fetchAllCalls,
    updateCall,
    updateAllCalls,
  } = store;


  const [showCallModal, setShowCallModal] = useState(false);
  const [selectedCallId, setSelectedCallId] = useState();

  useEffect(() => {
    fetchAllCalls();
  }, []);

  const batchOperationClickHandler = () => {
    updateAllCalls({
      is_archived: activeTab === "Active" ? true : false,
    });
  };

  const onTabChange = (tab) => () => {
    setActiveTab(tab);
    fetchAllCalls();
  };

  const modalOpenHandler = (callId) => {
    setSelectedCallId(callId);
    setShowCallModal(true);
  };

  const modalCloseHandler = () => {
    setShowCallModal(false);
  };

  return (
    <div className="container">
      <Header tabs={tabsList} activeTab={activeTab} onTabChange={onTabChange} />
      <BatchOperations
        activeTab={activeTab}
        onBatchOperationClick={batchOperationClickHandler}
        isLoading={isLoading}
      />
      <div className="container-view">
        <div
          className="listWrapper"
          style={
            activeTab === "Archived" ? { transform: "translatex(-50%)" } : {}
          }
        >
          {Object.entries(getCalls).map(([callType, callsList]) => {
            return (
              <ul key={callType} className="callsList">
                {callsList.length
                  ? callsList.map((call) => (
                      <Call
                        key={call.id}
                        call={call}
                        onClick={modalOpenHandler}
                        onArchiveClick={updateCall}
                      />
                    ))
                  : "No calls"}
              </ul>
            );
          })}
        </div>
        <Loader show={isLoading} />
      </div>
      <Footer activeTab={activeTab} />
      <CallModal
        visible={showCallModal}
        callId={selectedCallId}
        onCloseModal={modalCloseHandler}
      />
    </div>
  );
});

ReactDOM.render(<App />, document.getElementById("app"));

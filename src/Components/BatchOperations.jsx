import React from "react";
import classNames from "classnames";

const BatchOperations = ({ activeTab, onBatchOperationClick, isLoading }) => {
    return (<div className="batchOperations">
        <button
            className={classNames({
                archivedSelected: activeTab === 'Archived',
                disabled: isLoading
            })}
            onClick={onBatchOperationClick}
        >
            {activeTab === "Active" ? "Archive all" : "Restore all"}
        </button>
    </div>)
}

export default BatchOperations;
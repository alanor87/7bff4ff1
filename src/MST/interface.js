import { types } from "mobx-state-tree";

const Interface = types.model({
    isLoading: false,
    theme: "",
    activeTab: "Active"
})
    .actions(self => ({
        setIsLoading: (isLoading) => self.isLoading = isLoading,
        setActiveTab: (tab) => self.activeTab = tab
    }));

export { Interface }
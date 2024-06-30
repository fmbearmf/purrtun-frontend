import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', {
    state: () => ({
        isLoading: false,
    }),
    actions: {
        setLoading(isLoading) {
            console.log("set loading", isLoading)
            this.isLoading = isLoading;
        },
    },
});

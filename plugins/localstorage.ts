export default defineNuxtPlugin(() => {
    return {
        provide: {
            locally: {
                getItem(key: string) {
                    if (process.client) {
                        return localStorage.getItem(key);
                    }
                },
                setItem(key: string, value: string) {
                    if (process.client) {
                        return localStorage.setItem(key, value)
                    }
                },
            }
        }
    }
})
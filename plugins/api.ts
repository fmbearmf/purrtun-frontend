import {navigateTo, useRoute} from "nuxt/app";

export default defineNuxtPlugin(({ $cookies, $config, redirect }) => {
    const accessTokenCookie = useCookie("token", { sameSite: true, maxAge: 60 * 60 * 24 });
    const backend = $config.public.backend;

    const refreshAccessToken = async () => {
        const response = await $fetch('/refresh', {
            baseURL: backend,
            method: 'GET',
            credentials: 'include', // Make sure cookies are included
            headers: {
                "Content-Type": "application/json"
            }
        });
        accessTokenCookie.value = response.accessToken;
        return response.accessToken;
    };

    const customFetch = async (url, options = {}) => {
        const route = useRoute();
        const currentPath = route.fullPath

        let accessToken = accessTokenCookie.value;
        if (!accessToken) {
            navigateTo('/auth');
        }

        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
            'Authorization': `Bearer ${accessToken}`,
        };

        const extendedOptions = {
            ...options,
            headers,
        };

        try {
            const response = await $fetch(url, {
                baseURL: backend,
                ...extendedOptions,
            });

            return response;
        } catch (error) {
            const code = parseInt(error.response && error.response.status);
            const errorData = error.data
            if (code === 403) { // expired token
                if (!errorData.shouldRegister) {
                    // Try to refresh the token
                    try {
                        accessToken = await refreshAccessToken();
                        headers['Authorization'] = `Bearer ${accessToken}`;

                        const retryResponse = await $fetch(url, {
                            baseURL: backend,
                            ...extendedOptions,
                            headers,
                        });
                        return retryResponse
                    } catch (refreshError) { // refresh token expired. Log in again
                        navigateTo("/auth");
                    }
                } else { // doesnt have an account
                    navigateTo(`/register?redirect=${encodeURIComponent(currentPath)}`);
                }
            }
            throw error;
        }
    };

    return {
        provide: {
            api: customFetch,
        },
    };
});

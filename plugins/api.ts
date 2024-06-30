import { pack, unpack } from 'msgpackr';
import {navigateTo} from "nuxt/app";

export default defineNuxtPlugin(({ $cookies, $config, redirect }) => {
    const accessTokenCookie = useCookie("token", { sameSite: true, maxAge: 60 * 60 * 24 });
    const accessToken = accessTokenCookie.value;
    const backend = $config.public.backend;

    const customFetch = async (url, options = {}) => {
        const headers = {
            'Content-Type': 'application/msgpack',
            ...options.headers,
        };

        const body = {
            ...options.body,
            authToken: accessToken,
        };
        const packedBody = pack(body);

        const extendedOptions = {
            ...options,
            headers,
            body: packedBody,
        };
        try {
            const response = await $fetch(url, {
                baseURL: backend,
                ...extendedOptions,
            });
            // Unpack the response data
            const arrayBuffer = await response.arrayBuffer();
            const data = unpack(new Uint8Array(arrayBuffer));

            if (data.error) {
                if (process.client) {
                    $cookies.remove('token');
                }
                navigateTo('/');
                return;
            }

            return data;
        } catch (error) {
            const code = parseInt(error.response && error.response.status);

            if (code === 401) {
                navigateTo('/register');
            } else if (code === 400) {
                navigateTo('/auth');
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

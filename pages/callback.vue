<template>
    <h1 class="text-black">{{ response }}</h1>
</template>

<script setup lang="ts">
import { pack, unpack } from "msgpackr";

const { $locally } = useNuxtApp();
const accessTokenCookie = useCookie("token", { sameSite: true, maxAge: 60 * 60 * 24 });
let response = new Object();

const conf = useRuntimeConfig();
const backend = conf.public.backend;

fetch(backend + "/auth", {
    method: "POST",
    body: pack({
        "accessToken": `${useRoute().query.code}`,
        "self": `${String(useRoute().name)}`
    }),
    headers: {
        'Content-Type': 'application/msgpack',
    },
    credentials: "include"
}).then(response => response.arrayBuffer())
.then(arrayBuffer => unpack(new Uint8Array(arrayBuffer)))
.then((res) => {
    response = res;

    if (!res.encryptedToken) {
        throw new Error("no accessToken returned from the API." + res);
    }
    accessTokenCookie.value = res.encryptedToken;

    if (!(accessTokenCookie.value === res.encryptedToken)) {
        throw new Error("For some reason, your browser failed to properly set the cookie.");
    }

    navigateTo("/");
});
</script>

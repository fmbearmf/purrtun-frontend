<template>
    <h1 class="text-black">{{ 
    //@ts-ignore
    response }}</h1>
    
</template>

<script setup lang="ts">
const { $locally } = useNuxtApp();
const accessTokenCookie = useCookie("accessToken", { sameSite: true });
let response = "";

const conf = useRuntimeConfig();
const backend = conf.public.backend;

fetch(backend + "/api/auth", {
    method: "POST",
    body: JSON.stringify({
        "accessToken": `${useRoute().query.code}`,
        "self": `${String(useRoute().name)}`
    }),
    headers: {
        'Content-Type': 'application/json',
    }
}).then(async (result) => {
    const res = await result.json();
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
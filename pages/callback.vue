<template>
    <h1>{{ 
    //@ts-ignore
    response["access_token"] }}</h1>
    
</template>

<script setup lang="ts">
let response = "";

const conf = useRuntimeConfig();
const backend = conf.public.backend;

await fetch(backend + "/api/auth", {
    method: "POST",
    body: JSON.stringify({
        "accessToken": `${useRoute().query.code}`,
        "self": `${String(useRoute().name)}`
    }),
    headers: {
        'Content-Type': 'application/json',
    }
}).then(async (result) => {
    response = await result.json();
});
</script>
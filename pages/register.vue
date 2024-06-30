<template>
    <div class="flex-grow sm:w-1/3 mx-4">
        <h1 class="text-center text-5xl font-kode font-bold">Registration</h1>
        <h2 class="text-3xl font-kode">If you're here, it's because you need a Purrtun account!</h2>
        <h2 class="text-3xl font-kode">Just wait, you'll be registered automatically (if you're registered).</h2>
    </div>
</template>

<script setup lang="ts">
import { pack, unpack } from "msgpackr";

let accessTokenCookie = useCookie("token", { sameSite: true, maxAge: 60 * 60 * 24 });
let accessToken = accessTokenCookie.value;

if (!accessToken) {
  navigateTo("/auth");
}

const conf = useRuntimeConfig();
const backend = conf.public.backend;

fetch(backend + "/register", {
    method: "POST",
    body: pack({
        "authToken": `${accessToken}`
    }),
    headers: {
        "Content-Type": "application/msgpack"
    }
}).then((response) => {
    if (response.status == 422) {
        navigateTo("/");
    }
    if (response.status == 400) {
        navigateTo("/auth");
    }
    return response.arrayBuffer();
})
.then(arrayBuffer => unpack(new Uint8Array(arrayBuffer)))
.then((data) => {
    console.log(data);
});
</script>

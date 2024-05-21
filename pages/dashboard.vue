<template>
    <div class="bg-black min-h-dvh flex flex-col">
        <Header />
        <div class="flex-grow flex flex-col sm:flex-row my-5">
            <div class="flex-grow sm:w-1/3 hidden md:block">
                <!-- Ad space maybe-->
            </div>
            <div class="flex-grow sm:w-1/3 mx-4">
                <h1 class="text-center text-5xl font-kode font-bold">Dashboard</h1>
                <h2 class="text-2xl font-kode"><a class="underline rounded-md hover:text-emerald-200 hover:outline hover:outline-green-400 hover:outline-4" href="/leaderboard">Leaderboard</a> - The leaderboard.</h2>
                <h2 class="text-2xl font-kode"><a class="underline rounded-md hover:text-emerald-200 hover:outline hover:outline-green-400 hover:outline-4" href="/portfolio">Portfolio</a> - All your stats and stocks.</h2>
                <h2 class="text-2xl font-kode"><a class="underline rounded-md hover:text-emerald-200 hover:outline hover:outline-green-400 hover:outline-4" href="/order">Order</a> - Buy high sell low.</h2>
            </div>
            <div class="flex-grow sm:w-1/3 hidden md:block">
                <!-- Ad space maybe-->
            </div>
        </div>
    </div>
</template>
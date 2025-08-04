<script setup lang="ts"></script>

<template>
    <div class="app-layout">
        <router-view name="page" v-slot="{ Component }">
            <Transition name="page-transition" mode="out-in">
                <component :is="Component" />
            </Transition>
        </router-view>
        <the-modal-container />
        <the-tooltip-container />
    </div>
</template>

<style lang="scss">
// Not scoped; global styles
@use 'assets/scss/reset.scss';
@use 'assets/scss/styles.scss';
@use 'assets/scss/variables.scss';

.app-layout {
    position: relative;
    background-color: var(--color-surface);
    height: 100vh;
    min-height: -webkit-fill-available;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.page {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

// Transition
.page-transition-enter-active,
.page-transition-leave-active {
    transition: all 0.2s ease;
}

.page-transition-enter-from,
.page-transition-leave-to {
    opacity: 0;
    transform: translateX(2rem);
}

.page-transition-leave-active {
    position: absolute;
}
</style>

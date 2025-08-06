<template>
    <div>
        <h1>Login</h1>
        <p v-if="!selectedUser">Select your user:</p>
        <ul v-if="!selectedUser">
            <li v-for="user in users" :key="user.id">
                <button type="button" @click="selectUser(user)">{{ user.username }}</button>
            </li>
        </ul>
        <div v-if="selectedUser">
            <h2>Welcome, {{ selectedUser.username }}</h2>
            <form @submit.prevent="handleLogin">
                <div>
                    <label for="password">Password:</label>
                    <input id="password" v-model="password" type="password" autocomplete="current-password" />
                </div>
                <button type="submit" :disabled="loading">Login</button>
            </form>
            <button type="button" @click="selectedUser = null">Back</button>
        </div>
        <div v-if="error" style="color: red">{{ error }}</div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { loginUser } from '../helpers/auth-helpers';

const users = ref<Array<{ id: string; username: string }>>([]);
const selectedUser = ref<{ id: string; username: string } | null>(null);
const password = ref('');
const error = ref('');
const loading = ref(false);

onMounted(async () => {
    try {
        const res = await axios.get('/api/users');
        users.value = res.data;
    } catch (e) {
        error.value = 'Could not load users.';
    }
});

function selectUser(user: { id: string; username: string }) {
    selectedUser.value = user;
    password.value = '';
    error.value = '';
}

async function handleLogin() {
    error.value = '';
    loading.value = true;
    const success = await loginUser(selectedUser.value?.username || '', password.value);
    loading.value = false;
    if (!success) {
        error.value = 'Invalid password.';
    } else {
        // TODO: Redirect or update app state on successful login
        alert('Login successful!');
    }
}
</script>
}

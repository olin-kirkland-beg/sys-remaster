const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export function setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
}

export function setCurrentUser(user: any) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getCurrentUser(): any | null {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
}

export function clearCurrentUser() {
    localStorage.removeItem(USER_KEY);
}

export function isLoggedIn(): boolean {
    return !!getToken();
}

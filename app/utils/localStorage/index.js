export const APP_KEY = "APPKEY";

export function getStorageItem(key) {
    if (typeof window === "undefined") return;

    const data = window.localStorage.getItem(`${APP_KEY}_${key}`);

    return data ? JSON.parse(data) : null;
}

export function setStorageItem(key, value) {
    if (typeof window === "undefined") return;

    const data = JSON.stringify(value);
    window.localStorage.setItem(`${APP_KEY}_${key}`, data);
}

export function removeStorageItem(key) {
    if (typeof window === "undefined") return;

    window.localStorage.removeItem(`${APP_KEY}_${key}`);
}

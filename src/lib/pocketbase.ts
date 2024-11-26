import PocketBase from 'pocketbase';

// Create a single PocketBase instance that can be reused across the app
export const pb = new PocketBase("https://esp24.pockethost.io");
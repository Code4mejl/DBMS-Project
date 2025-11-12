export function saveToken(token) { localStorage.setItem('nutri_token', token); }
export function getToken() { return localStorage.getItem('nutri_token'); }
export function authHeader() { const t = getToken(); return t ? { Authorization: 'Bearer ' + t } : {}; }
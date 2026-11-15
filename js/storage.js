/* =====================================================================
   js/storage.js — saving small things in the browser (localStorage).

   Used for: the theme choice, and each dish's cooking state (ticks,
   step order, chosen portion). Every call is wrapped in try/catch
   because Safari's private mode or blocked storage can throw errors.
   When storage fails, the site still works; it just forgets.
   ===================================================================== */

const STORAGE_PREFIX = "ionsKitchen.";

const store = {
  /** Read a saved value. Returns `fallback` if nothing is saved or storage is blocked. */
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (error) {
      return fallback;
    }
  },

  /** Save a value (any plain object, array, string or number). */
  set(key, value) {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (error) {
      /* Storage blocked or full: ignore, the page keeps working. */
    }
  },

  /** Delete a saved value. */
  remove(key) {
    try {
      localStorage.removeItem(STORAGE_PREFIX + key);
    } catch (error) {
      /* Nothing to do. */
    }
  },
};

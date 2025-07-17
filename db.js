// Импортирай базата и нужните функции от Firebase
import { database } from "./firebase-init.js";
import { ref, onValue, set, push } from "firebase/database";

// 📌 Чети всички потребители
export function getUsers(callback) {
  const dbRef = ref(database, 'users');
  onValue(dbRef, (snapshot) => {
    callback(snapshot.val() || {});
  });
}

// 📌 Запиши нов потребител (или обнови съществуващ)
export function saveUser(userId, userData) {
  const userRef = ref(database, `users/${userId}`);
  set(userRef, userData);
}

// 📌 Чети всички продукти
export function getProducts(callback) {
  const dbRef = ref(database, 'products');
  onValue(dbRef, (snapshot) => {
    callback(snapshot.val() || {});
  });
}

// 📌 Запиши продукт
export function saveProduct(productId, productData) {
  const productRef = ref(database, `products/${productId}`);
  set(productRef, productData);
}

// 📌 Чети историята
export function getHistory(callback) {
  const dbRef = ref(database, 'history');
  onValue(dbRef, (snapshot) => {
    callback(snapshot.val() || {});
  });
}

// 📌 Добави нов запис в историята
export function addHistoryEntry(entryData) {
  const historyRef = ref(database, 'history');
  push(historyRef, entryData);
}

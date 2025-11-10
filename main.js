import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getDatabase, ref, set, get, child, onValue } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB9WONjuFuyxQg9T7zV34-LA7mIp7QvwR0",
  authDomain: "algo-e0da0.firebaseapp.com",
  databaseURL: "https://algo-e0da0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "algo-e0da0",
  storageBucket: "algo-e0da0.firebasestorage.app",
  messagingSenderId: "87259521629",
  appId: "1:87259521629:web:35953641ebd0c4a8f123b4"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const createBtn = document.getElementById("create");
const joinBtn = document.getElementById("join");
const codeInput = document.getElementById("codeInput");
const statusDiv = document.getElementById("status");

// ゲームコード発行
createBtn.onclick = async () => {
  const code = Math.floor(1000 + Math.random() * 9000);
  await set(ref(db, "rooms/" + code), { players: 1 });
  statusDiv.textContent = `コード ${code} を相手に伝えろ`;
};

// 入室
joinBtn.onclick = async () => {
  const code = codeInput.value.trim();
  const snap = await get(child(ref(db), "rooms/" + code));
  if (snap.exists()) {
    await set(ref(db, "rooms/" + code + "/joined"), true);
    statusDiv.textContent = `ルーム ${code} に入室した`;
  } else {
    statusDiv.textContent = `コードが存在しない`;
  }
};

// データベース監視（確認用）
onValue(ref(db, "rooms"), (snap) => {
  console.log(snap.val());
});

import { useEffect, useState } from "react";
import { db } from "./firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export default function App() {
  const [coins, setCoins] = useState<number>(0);
  const [telegramId, setTelegramId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const tg = (window as any).Telegram?.WebApp;

  async function loadUser() {
    if (!tg || !tg.initDataUnsafe?.user) {
      console.log("Not inside Telegram");
      setLoading(false);
      return;
    }

    const user = tg.initDataUnsafe.user;
    const userId = user.id.toString();
    setTelegramId(userId);

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        telegram_id: user.id,
        coins: 0,
        school_level: 1,
        tap_power: 1,
        idle_income: 1,
        last_online: Date.now()
      });
      setCoins(0);
    } else {
      setCoins(userSnap.data().coins || 0);
    }

    setLoading(false);
  }

  async function handleTap() {
    if (!telegramId) return;

    const newCoins = coins + 1;
    setCoins(newCoins);

    await updateDoc(doc(db, "users", telegramId), {
      coins: newCoins,
      last_online: Date.now()
    });
  }

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
    }
    loadUser();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>⏳ Loading...</h2>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h2>🪙 Coins: {coins}</h2>

      <button
        onClick={handleTap}
        style={{
          fontSize: 24,
          padding: "20px 30px",
          marginTop: 20
        }}
      >
        🏫 Tap School
      </button>
    </div>
  );
}

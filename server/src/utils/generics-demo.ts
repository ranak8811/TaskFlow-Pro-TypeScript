// ১. জেনেরিক কনস্ট্রেইন্ট ইন্টারফেস ডিফাইন করলাম
interface Identifiable {
  id: string | number; // আইডির মান স্ট্রিং বা নাম্বার হতে পারবে
}

// ২. জেনেরিক ফাংশন যা কেবল Identifiable অবজেক্টের অ্যারে গ্রহণ করবে
export function findItemById<T extends Identifiable>(
  items: T[],
  id: T["id"], // ইনপুট আইডির টাইপ ডাইনামিকালি items এর আইডির সাথে মিলবে
): T | undefined {
  return items.find((item) => item.id === id);
}

// ৩. জেনেরিক ক্লাস (কাস্টম কী-ভ্যালু মেমোরি ক্যাশ)
export class DataCache<K, V> {
  private cache = new Map<K, V>();

  // ক্যাশ ভ্যালু সেট মেথড
  set(key: K, value: V): void {
    this.cache.set(key, value);
  }

  // ক্যাশ ভ্যালু গেট মেথড
  get(key: K): V | undefined {
    return this.cache.get(key);
  }
}

// --- ব্যবহারের পরীক্ষা ---
const users = [
  { id: 101, name: "Anwar" },
  { id: 102, name: "Rahman" },
];

// টাইপস্ক্রিপ্ট স্বয়ংক্রিয়ভাবে T কে { id: number, name: string } ধরে নেয়
const user = findItemById(users, 101);
console.log(`Found User: ${user?.name}`);

// ক্যাশ অবজেক্ট ডিক্লেয়ার করার সময় টাইপ প্যারামিটার লক করলাম
const tokenCache = new DataCache<string, string>();
tokenCache.set("usr-101", "signed-jwt-token-value");
console.log(`Cached Token: ${tokenCache.get("usr-101")}`);

const API_BASE = "http://localhost:5000/api";

const sampleOrders = [
  {
    customerName: "তানভীর আহমেদ",
    customerPhone: "01711223344",
    customerAddress: "হাউজ ১২, রোড ৫, ধানমন্ডি, ঢাকা",
    deliveryArea: "dhaka",
    deliveryCharge: 120,
    mangoName: "হিমসাগর আম",
    packageLabel: "১০ কেজি ফ্যামিলি ক্যারেট",
    packageKg: 10,
    quantity: 1,
    subtotal: 2150,
    totalAmount: 2270,
    deliveryDate: "২০ মে থেকে ২৫ মে",
    paymentMethod: "cod",
    targetStatus: "Confirmed",
  },
  {
    customerName: "ফারহানা চৌধুরী",
    customerPhone: "01822334455",
    customerAddress: "ফ্ল্যাট ৪বি, সেক্টর ৭, উত্তরা, ঢাকা",
    deliveryArea: "dhaka",
    deliveryCharge: 120,
    mangoName: "গোপালভোগ আম",
    packageLabel: "৫ কেজি প্রিমিয়াম বক্স",
    packageKg: 5,
    quantity: 2,
    subtotal: 1800,
    totalAmount: 1920,
    deliveryDate: "১৫ মে থেকে ২০ মে",
    paymentMethod: "bkash",
    targetStatus: "Pending",
  },
  {
    customerName: "মোহাম্মদ রফিকুল ইসলাম",
    customerPhone: "01933445566",
    customerAddress: "জিইসি মোড়, চকবাজার, চট্টগ্রাম",
    deliveryArea: "outside",
    deliveryCharge: 150,
    mangoName: "সুন্দরবনের খাঁটি মধু",
    packageLabel: "১ কেজি প্রিমিয়াম জার",
    packageKg: 1,
    quantity: 2,
    subtotal: 1600,
    totalAmount: 1750,
    deliveryDate: "তাত্ক্ষণিক ডেলিভারি",
    paymentMethod: "cod",
    targetStatus: "Shipped",
  },
  {
    customerName: "সানজিদা রহমান",
    customerPhone: "01755667788",
    customerAddress: "রোড ২, মিরপুর ডিওএইচএস, ঢাকা",
    deliveryArea: "dhaka",
    deliveryCharge: 120,
    mangoName: "ল্যাংড়া আম",
    packageLabel: "১০ কেজি স্পেশাল বক্স",
    packageKg: 10,
    quantity: 1,
    subtotal: 1550,
    totalAmount: 1670,
    deliveryDate: "১০ জুন থেকে ১৫ জুন",
    paymentMethod: "cod",
    targetStatus: "Confirmed",
  },
  {
    customerName: "মাহিনুল হক",
    customerPhone: "01677889900",
    customerAddress: "শিবগঞ্জ পয়েন্ট, সিলেট",
    deliveryArea: "outside",
    deliveryCharge: 150,
    mangoName: "দিনাজপুরের বেদানা লিচু",
    packageLabel: "১০০ পিস স্পেশাল গিফট বক্স",
    packageKg: 3,
    quantity: 1,
    subtotal: 1200,
    totalAmount: 1350,
    deliveryDate: "২৫ মে থেকে ৩০ মে",
    paymentMethod: "bkash",
    targetStatus: "Pending",
  },
  {
    customerName: "আফসানা মিমি",
    customerPhone: "01788990011",
    customerAddress: "ব্লক ই, রোড ১১, বনানী, ঢাকা",
    deliveryArea: "dhaka",
    deliveryCharge: 120,
    mangoName: "আম্রপালি আম",
    packageLabel: "১০ কেজি ফ্যামিলি বক্স",
    packageKg: 10,
    quantity: 1,
    subtotal: 1850,
    totalAmount: 1970,
    deliveryDate: "১৫ জুন থেকে ২০ জুন",
    paymentMethod: "cod",
    targetStatus: "Delivered",
  },
  {
    customerName: "আরিফুল করিম",
    customerPhone: "01999001122",
    customerAddress: "বাঘা, রাজশাহী",
    deliveryArea: "outside",
    deliveryCharge: 150,
    mangoName: "ক্ষীরশাপাত আম",
    packageLabel: "১০ কেজি মাস্টার বক্স",
    packageKg: 10,
    quantity: 2,
    subtotal: 3800,
    totalAmount: 3950,
    deliveryDate: "২৮ মে থেকে ২ জুন",
    paymentMethod: "cod",
    targetStatus: "Confirmed",
  },
  {
    customerName: "নুসরাত জাহান",
    customerPhone: "01811223399",
    customerAddress: "ব্লক সি, বসুন্ধরা আ/এ, ঢাকা",
    deliveryArea: "dhaka",
    deliveryCharge: 120,
    mangoName: "ফজলি আম",
    packageLabel: "২০ কেজি ক্রাফট কার্টন",
    packageKg: 20,
    quantity: 1,
    subtotal: 2800,
    totalAmount: 2920,
    deliveryDate: "১ জুলাই থেকে ৭ জুলাই",
    paymentMethod: "bkash",
    targetStatus: "Pending",
  },
  {
    customerName: "তৌহিদুল ইসলাম",
    customerPhone: "01722334488",
    customerAddress: "জিন্দাবাজার, সিলেট",
    deliveryArea: "outside",
    deliveryCharge: 150,
    mangoName: "সরিষার তেল ও ঘি কম্বো",
    packageLabel: "১ লিটার তেল + ৫০০ গ্রাম ঘি",
    packageKg: 2,
    quantity: 1,
    subtotal: 1450,
    totalAmount: 1600,
    deliveryDate: "তাত্ক্ষণিক ডেলিভারি",
    paymentMethod: "cod",
    targetStatus: "Confirmed",
  },
  {
    customerName: "খাদিজা বেগম",
    customerPhone: "01633445577",
    customerAddress: "খুলশী আবাসিক এলাকা, চট্টগ্রাম",
    deliveryArea: "outside",
    deliveryCharge: 150,
    mangoName: "সুন্দরবনের খলিশা ফুলের মধু",
    packageLabel: "২ কেজি ফ্যামিলি প্যাক",
    packageKg: 2,
    quantity: 1,
    subtotal: 2400,
    totalAmount: 2550,
    deliveryDate: "তাত্ক্ষণিক ডেলিভারি",
    paymentMethod: "cod",
    targetStatus: "Pending",
  },
];

async function seedOrders() {
  console.log("Logging in as admin to get token...");
  const loginRes = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@test.com", password: "Test123@#" }),
  });
  const loginData = await loginRes.json();
  const token = loginData?.token || loginData?.data?.token;

  if (!token) {
    console.error("Failed to login as admin:", loginData);
    return;
  }
  console.log("Logged in successfully. Creating 10 pre-bookings...");

  for (let i = 0; i < sampleOrders.length; i++) {
    const o = sampleOrders[i];
    const { targetStatus, ...orderPayload } = o;
    const res = await fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });
    const data = await res.json();

    if (data.success && data.data) {
      const orderId = data.data._id || data.data.id;
      console.log(`[${i + 1}/10] Created order: ${data.data.orderId} for ${o.customerName}`);

      // If target status is not Pending, update it
      if (targetStatus && targetStatus !== "Pending") {
        await fetch(`${API_BASE}/orders/${orderId}/status`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: targetStatus }),
        });
        console.log(`   └─ Updated status to: ${targetStatus}`);
      }
    } else {
      console.error(`Failed to create order for ${o.customerName}:`, data);
    }
  }

  console.log("\nAll 10 pre-bookings created successfully!");
}

seedOrders();

const CACHE_NAME = 'erfan-control-v1';
const ASSETS_TO_CACHE = [
  'index.html',
  'manifest.json',
  'sw.js'
];

// گام اول: دانلود و ذخیره فایل‌ها در صندقچه کَش گوشی 📦
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('صندوقچه آفلاین فعال و فایل‌ها کَش شدند! 📥');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// گام دوم: تحویل آفلاین فایل‌ها به کاربر هنگام باز کردن برنامه 🕵️‍♂️
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // اگر در حافظه گوشی بود همان را بده، وگرنه از شبکه بگیر
            return cachedResponse || fetch(event.request);
        })
    );
});
# Environment Variables Setup Guide untuk ZKWhale.AI

## 🚀 Quick Start untuk Developer

### 1. Copy Template File
```bash
cp .env.local.template .env.local
```

### 2. Konfigurasi WalletConnect (Wajib)
1. Kunjungi [WalletConnect.com](https://walletconnect.com/)
2. Buat akun gratis
3. Buat Project baru
4. Copy Project ID dan paste ke `.env.local`:
   ```
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_di_sini
   ```

### 3. Jalankan Development Server
```bash
npm run dev
```

---

## 📋 Daftar Environment Variables

### 🔴 Required (Wajib)
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: Untuk koneksi wallet Web3

### 🟡 Optional (Opsional)
- `NODE_ENV`: Environment (development/staging/production)
- `NEXT_PUBLIC_APP_URL`: URL aplikasi production
- `JWT_SECRET`: Secret untuk authentication
- `DATABASE_URL`: Connection string database
- `REDIS_URL`: Connection string Redis
- `NEXT_PUBLIC_SENTRY_DSN`: Sentry untuk error tracking
- `NEXT_PUBLIC_GA_ID`: Google Analytics ID

---

## ⚠️ Security Guidelines

1. **JANGAN commit file .env.local ke Git**
2. **JANGAN upload ke GitHub/GitLab**
3. **Gunakan .env.local.template untuk developer baru**
4. **Generate secure secrets dengan `openssl rand -base64 32`**
5. **Berbeda environment = berbeda nilai variabel**

---

## 🔧 Troubleshooting

### Error: "wagmi not available"
- Pastikan `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` sudah diset
- Restart development server setelah menambah variabel

### Error: "Client-Side Error"
- Periksa semua variabel `NEXT_PUBLIC_*` sudah benar
- Periksa format UUID untuk Project ID

### Wallet tidak terkoneksi
- Pastikan Project ID WalletConnect valid
- Test dengan MetaMask atau wallet lain

---

## 📚 Referensi

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [WalletConnect Documentation](https://docs.walletconnect.com/)
- [RainbowKit Configuration](https://www.rainbowkit.com/docs/installation)
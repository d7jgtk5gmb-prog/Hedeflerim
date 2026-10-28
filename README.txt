HEDEFLERİM — KURULUM NOTLARI

Bu klasör, iPhone'da ana ekrana eklenebilen bir web uygulamasının (PWA) dosyalarını içerir.

ÖNEMLİ:
- ZIP'i indirmek tek başına uygulamayı iPhone'a yüklemez.
- iPhone'da uygulama gibi kurmak için dosyaların HTTPS destekleyen bir web adresinde yayımlanması gerekir.
- Yayımlandıktan sonra Safari'de siteyi açın > Paylaş > Ana Ekrana Ekle.
- Görev ve hedef verileri cihazın tarayıcı depolamasında tutulur. Tarayıcı verilerini temizlemek bu verileri silebilir.
- Bu paket App Store uygulaması değildir.

Dosyalar:
index.html       Uygulama ekranı
style.css        Görünüm
app.js           Görevler, hedefler ve yerel kayıt
manifest.webmanifest  Ana ekrana ekleme ayarları
sw.js            Çevrimdışı önbellek
icon-192.png / icon-512.png  Uygulama simgeleri

Yayınlama için GitHub Pages gibi HTTPS sağlayan statik barındırma kullanılabilir.

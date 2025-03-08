# Pacman Oyunu – 5 Seviyeli 🎮👾

**Retro** dokunuşlarla hazırlanan, **çok seviyeli** bir Pacman macerasına hoş geldiniz!  
Bu projede **5 farklı seviye** bulunur, her seviyede farklı haritalar, hayalet sayıları ve renkleri mevcuttur.  
Ayrıca, güç pellet sayesinde geçici olarak hayaletleri yiyebilme özelliği de eklenmiştir.

---

## 🚀 Özellikler

- **5 Seviyeli Oyun:**  
  - **Seviye 1:** Tek hayalet (🔴)  
  - **Seviye 2 & 3:** İki hayalet (örneğin, 🔴 & 🟢 / 🔴 & 🔵)  
  - **Seviye 4 & 5:** Dört hayalet (Seviye 4'te hayaletler daha hızlı! ⚡)
- **Farklı Haritalar:**  
  Her seviye 10x10 boyutunda benzersiz bir haritaya sahip.
- **Güç Pellet (Power Pellet):**  
  Pacman, güç pellet yediğinde 10 saniye boyunca hayaletleri yiyebilir.  
  Bu modda hayaletlere dokunursanız, o hayalet 2 saniyeliğine yok olur ve sonra savunmasız (vulnerable) halde başlangıç konumundan geri döner.
- **Skor Sistemi:**  
  - Normal pellet: +1 puan  
  - Güç pellet: +5 puan  
  - Hayalet yemek: +10 puan
- **Seviye Geçişi:**  
  Tüm pelletler toplandığında otomatik olarak bir sonraki seviyeye geçilir.
- **Kaybetme Durumu:**  
  Güç modu aktif değilken hayaletle çarpışılırsa oyun biter ve "Yeniden Başlat" butonuyla kaldığınız seviyeden devam edebilirsiniz.

---

## 📸 Ekran Görüntüleri

![Pacman Oyunu](https://user-images.githubusercontent.com/00000000/placeholder.png)  
*Örnek ekran görüntüsü – Farklı seviyelerde değişen haritalar ve hayaletler.*

---

## 💾 Kurulum & Çalıştırma

### İndirilebilir Dosya:
- Projenin ZIP dosyasını [buradan indirebilirsiniz](#) (link ekleyin) ve zip’i açarak dosyaları yerel makinenize kaydedin.

### Çalıştırma Adımları:
1. **Doğrudan Açma:**  
   - ZIP’i açtıktan sonra, `index.html` dosyasına sağ tıklayarak **"Open in Browser"** seçeneğini kullanabilirsiniz.
2. **Visual Studio Code ile:**  
   - VS Code’da projeyi açın.
   - [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) eklentisini kurun.
   - `index.html` dosyasına sağ tıklayıp **"Open with Live Server"** seçeneğini seçin.
3. **Yerel Sunucu Kullanma:**  
   - Terminal veya komut satırında proje klasörüne gidin.
   - Örneğin, Python 3 yüklüyse:  
     ```bash
     python -m http.server
     ```  
     Ardından tarayıcınızda `http://localhost:8000` adresine gidin.

---

## 🎮 Nasıl Oynanır?

- **Hareket:**  
  Pacman’i **ok tuşları (↑, ↓, ←, →)** ile hareket ettirin.
- **Pellet Toplama:**  
  Sarı pelletlerden puan kazanın. Güç pellet (daha büyük, parlak) +5 puan verir.
- **Güç Modu:**  
  Güç pellet yediğinizde 10 saniyeliğine güç modu aktif olur. Bu süre zarfında hayaletler savunmasız hale gelir ve üzerine dokunduğunuzda +10 puan alıp hayalet 2 saniyeliğine yok olur, sonra başlangıç konumundan geri döner.
- **Seviye Atlama:**  
  Tüm pelletleri topladığınızda otomatik olarak bir sonraki seviyeye geçilir.
- **Kaybetme:**  
  Güç modu aktif değilken bir hayaletle çarpışırsanız "Oyun Bitti!" mesajı gelir. "Yeniden Başlat" butonuyla kaldığınız seviyeden devam edebilirsiniz.

---

## 🔢 Seviye Detayları

1. **Seviye 1**  
   - Tek hayalet (🔴)  
   - Kolay harita, giriş seviyesi.
2. **Seviye 2**  
   - İki hayalet (örneğin, 🔴 & 🟢)  
   - Orta zorluk.
3. **Seviye 3**  
   - İki hayalet (örneğin, 🔴 & 🔵)  
   - Orta zorluk.
4. **Seviye 4**  
   - Dört hayalet (🔴, 🟢, 🔵, 🟡)  
   - Hayaletler hızlandı! ⚡ (daha zor)
5. **Seviye 5**  
   - Dört hayalet (örneğin, 💜, 🟠, 💚, 🌀)  
   - Final seviye, en zor harita.

---

- **index.html:** Oyun alanı, skor, seviye bilgisi ve mesaj kutusu (modal) içerir.
- **style.css:** Responsive tasarım, animasyonlar, Pacman, hayalet ve pellet stilleri burada tanımlıdır.
- **script.js:** Seviyeler, haritalar, hayalet hareketleri, güç modu, çarpışma kontrolleri ve seviye yönetimi bu dosyada yer alır.

---





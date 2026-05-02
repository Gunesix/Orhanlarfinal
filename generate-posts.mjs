import fs from 'fs';

const topics = [
    "Dalaman'da inşaat öncesi temel kazısı nasıl yapılır?",
    "2026 Muğla Dalaman günlük kepçe kiralama fiyatları",
    "Kontrollü bina yıkımı öncesi alınması gereken izinler (Muğla)",
    "Hafriyat döküm sahaları: Dalaman'da moloz atımı nereye yapılır?",
    "Mini ekskavatör ile dar alanlarda çevre düzenlemesi",
    "İnşaat hafriyatı hesaplama yöntemleri",
    "Zemin etüdü ve hafriyat ilişkisi neden önemlidir?",
    "Kiralık kepçe seçerken nelere dikkat edilmeli?",
    "JCB iş makinesi kiralama avantajları",
    "Tarla düzeltme ve tesviye işleri nasıl yapılır?",
    "Su kanalı ve altyapı kazılarında güvenlik önlemleri",
    "Eski bina yıkım maliyetleri nasıl hesaplanır?",
    "Dalaman bölgesinde kayalık zemin kırma işlemleri (Kırıcı kepçe)",
    "Bahçe peyzajı öncesi toprak taşıma ve dolgu işleri",
    "Hafriyat sözleşmesi hazırlarken dikkat edilmesi gerekenler",
    "İstinat duvarı kazısı teknik detayları",
    "Muğla'da havuz yapımı için kazı işlemleri",
    "İş güvenliği standartlarına uygun hafriyat firması seçimi",
    "Kış aylarında hafriyat ve kazı çalışmalarının zorlukları",
    "Moloz ve inşaat atığı geri dönüşümü nasıl olur?"
];

function slugify(text) {
    text = text.toLowerCase();
    text = text.replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ü/g, 'u')
               .replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ç/g, 'c');
    text = text.replace(/[^a-z0-9]+/g, '-');
    return text.replace(/^-+|-+$/g, '');
}

const contentTemplate = (title) => `# ${title}

${title} konusu, Muğla Dalaman bölgesinde inşaat ve hafriyat alanında faaliyet gösteren firmalar için büyük önem taşımaktadır. Orhanlar Hafriyat olarak, uzun yıllara dayanan deneyimimizle bu alanda profesyonel çözümler sunuyoruz.

## Sürecin İncelikleri
İster büyük çaplı kentsel dönüşüm projesi olsun, ister bireysel arsa düzenlemesi; ${title} konusunda doğru adımlar atılması projenin maliyetini ve süresini doğrudan etkiler. Dalaman hafriyat hizmetlerimizle toprağı en verimli şekilde işleyerek, arazinizin değerine değer katmaktayız.

## Dikkat Edilmesi Gereken Yasal ve Teknik Süreçler
Özellikle bölgemiz coğrafi şartları göz önüne alındığında, işlemler sadece kazıdan ibaret değildir:
*   **Doğru Planlama:** İşe başlamadan zemin özellikleri analiz edilmeli.
*   **İş Güvenliği:** Çalışma sahasında maksimum güvenlik önlemleri alınmalı.
*   **Çevre Düzeni:** Çevreye verilen rahatsızlığı en aza indirmek ve moloz/atık yönetimini yasal sınırlara uygun yapmak.

Dalaman Kepçe kiralama, hafriyat nakliye ve diğer iş makineleri ihtiyaçlarınızda Orhanlar Dalaman her daim yanınızda! Detaylı bilgi ve fiyatlandırma için bizimle iletişime geçebilirsiniz.
`;

const text = fs.readFileSync('src/data/blogPosts.ts', 'utf-8');
let imageMatches = text.match(/https:\/\/res\.cloudinary\.com[^"]+/g);
let images = imageMatches ? [...new Set(imageMatches)] : ["https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80"];

const newPosts = [];
let startId = 30; // Check current max ID
const baseTime = new Date('2026-04-30T11:00:00Z').getTime();
const categories = ["Hafriyat", "İş Makineleri", "Yıkım", "Genel Bilgi", "Kurumsal"];

topics.forEach((title, i) => {
    const slug = slugify(title);
    const post = {
        id: `post-${startId + i}`,
        title: title,
        slug: slug,
        excerpt: `${title} hakkında merak edilen her şey. Dalaman ve çevre bölgelerdeki hafriyat hizmetlerinde Orhanlar kalite farkı.`,
        content: contentTemplate(title),
        category: categories[i % categories.length],
        image: images[i % images.length],
        createdAt: new Date(baseTime + i * 3600000).toISOString()
    };
    newPosts.push(post);
});

let content = fs.readFileSync('src/data/blogPosts.ts', 'utf-8');
let match = content.match(/];\s*$/);
if (match) {
    const jsonStr = ",\n  " + newPosts.map(p => JSON.stringify(p, null, 4).replace(/\n/g, '\n  ')).join(",\n  ");
    const newContent = content.substring(0, match.index) + jsonStr + "\n];\n";
    fs.writeFileSync('src/data/blogPosts.ts', newContent, 'utf-8');
}

const sitemapLinks = newPosts.map(p => `  <url>
    <loc>https://www.orhanlarhafriyat.com/blog/${p.slug}</loc>
    <lastmod>${p.createdAt.substring(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);

const smap = fs.readFileSync('public/sitemap.xml', 'utf-8');
match = smap.match(/<\/urlset>/);
if (match) {
    const newSmap = smap.substring(0, match.index) + sitemapLinks.join('\n') + "\n</urlset>";
    fs.writeFileSync('public/sitemap.xml', newSmap, 'utf-8');
}

console.log("Done generating 20 posts");

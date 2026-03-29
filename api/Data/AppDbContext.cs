using Microsoft.EntityFrameworkCore;
using Api.Models;

namespace Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<ContactMessage> ContactMessages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Seed a default admin user (password is "admin123" for demo purposes, hash it properly in a real scenario)
            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1,
                Username = "admin",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123")
            });

            // Seed Announcements based on siteContent
            modelBuilder.Entity<Announcement>().HasData(
                new Announcement { Id = 1, Title = "Başvurular Açıldı", Content = "Yayathon 2026 bireysel başvuruları açıldı. Takımlar organizasyon komitesi tarafından oluşturulacaktır.\n\nBaşvurular bireysel olarak alınır. Hazır takım başvuruları kabul edilmez.\nKatılımcı profilleri; disiplin çeşitliliği ve denge kriterleri gözetilerek 10×10 modeliyle hibrit takımlara dağıtılır.\nBaşvuru adımlarını tamamladıktan sonra gönderim ekranında “Başvuruyu gönder” ile işlemi bitirebilirsiniz.", CreatedAt = System.DateTime.SpecifyKind(System.DateTime.Parse("2026-03-27"), System.DateTimeKind.Utc), IsActive = true },
                new Announcement { Id = 2, Title = "Saha Keşfi Programı Duyurusu", Content = "5 Haziran saha keşfi programının ana akışı ve buluşma noktaları duyuruldu.\n\nSaha keşfi, İzmit kent merkezi odaklı tramvay turu ve rehberli yürüyüşleri kapsar.\nKatılımcıların rahat yürüyüş ayakkabısı ve hava koşullarına uygun ekipmanla gelmeleri önerilir.\nDetaylı program “Takvim” sayfasında güncellenecektir.", CreatedAt = System.DateTime.SpecifyKind(System.DateTime.Parse("2026-04-10"), System.DateTimeKind.Utc), IsActive = true },
                new Announcement { Id = 3, Title = "SSS Güncellemesi", Content = "Lojistik ve etkinlik kuralları hakkında yeni sorular eklendi, yanıtlar güncellendi.\n\nKendi bilgisayarınızı getirmeniz beklenir; sınırlı sayıda yazılım/donanım desteği sağlanabilir.\nEtkinlik günü iaşe organizasyon tarafından karşılanacaktır.\nYeni sorular için “SSS” sayfasını ziyaret edebilirsiniz.", CreatedAt = System.DateTime.SpecifyKind(System.DateTime.Parse("2026-04-18"), System.DateTimeKind.Utc), IsActive = true },
                new Announcement { Id = 4, Title = "Mentor Görüşme Takvimi", Content = "Hackathon günü mentorluk slotları ve branş bazlı masa düzeni duyuruldu.\n\nMimarlık, ulaşım planlama ve yazılım mentorları için ayrı istişare alanları belirlendi.\nSlotlar, kayıt sonrası katılımcı panelinden görüntülenebilecek.", CreatedAt = System.DateTime.SpecifyKind(System.DateTime.Parse("2026-04-22"), System.DateTimeKind.Utc), IsActive = true },
                new Announcement { Id = 5, Title = "Son Başvuru Tarihi Hatırlatması", Content = "Bireysel başvurular 25 Mayıs 2026 saat 23:59’a kadar alınmaya devam edecek.\n\nBaşvuru formunda zorunlu alanların tamamlandığından emin olun.\nOnay e-postası gönderiminde gecikme yaşanmaması için iletişim bilgilerinizi kontrol edin.", CreatedAt = System.DateTime.SpecifyKind(System.DateTime.Parse("2026-05-01"), System.DateTimeKind.Utc), IsActive = true },
                new Announcement { Id = 6, Title = "Teknik Veri Paketi Güncellemesi", Content = "İzmit ve Darıca için güncel pafta özetleri ve yaya güvenliği istatistikleri pakete eklendi.\n\nİndirilebilir kaynaklar sayfasından yeni sürüme erişebilirsiniz (yayınlandığında).\nÖnceki çalışmalarınızı yeni katmanlarla uyumlu hale getirmeniz önerilir.", CreatedAt = System.DateTime.SpecifyKind(System.DateTime.Parse("2026-05-08"), System.DateTimeKind.Utc), IsActive = true },
                new Announcement { Id = 7, Title = "Ulaşım ve Otopark Bilgisi", Content = "Luxor Garden Park Hotel çevresi toplu taşıma hatları ve misafir otopark yönlendirmesi paylaşıldı.\n\nİzmit merkezden tramvay ve otobüs bağlantıları için özet harita eklendi.\nEtkinlik günü vale ve alternatif park alanları organizasyon tarafından iletilecek.", CreatedAt = System.DateTime.SpecifyKind(System.DateTime.Parse("2026-05-12"), System.DateTimeKind.Utc), IsActive = true },
                new Announcement { Id = 8, Title = "Jüri Sunum Formatı", Content = "5 dakikalık sunumda beklenen başlıklar ve yedek materyal (poster / kısa video) kuralları netleştirildi.\n\nSunum şablonu indirilebilir kaynaklar bölümünde yer alacaktır.\nTeknik aksaklıklar için USB yedek ve PDF çıktı getirmeniz tavsiye edilir.", CreatedAt = System.DateTime.SpecifyKind(System.DateTime.Parse("2026-05-15"), System.DateTimeKind.Utc), IsActive = true },
                new Announcement { Id = 9, Title = "Saha Keşfi Hava ve Ekipman", Content = "5 Haziran saha programı için hava durumuna uygun kıyafet ve rahat ayakkabı zorunluluğu hatırlatması.\n\nUzun süre ayakta ve yürüyüş içeren programda su ve şapka bulundurmanız önerilir.\nÖzel sağlık durumunuzu kayıt sırasında bildirmeniz önemlidir.", CreatedAt = System.DateTime.SpecifyKind(System.DateTime.Parse("2026-05-20"), System.DateTimeKind.Utc), IsActive = true }
            );
        }
    }
}

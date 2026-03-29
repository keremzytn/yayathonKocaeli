using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class SeedAnnouncements : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Announcements",
                columns: new[] { "Id", "Content", "CreatedAt", "IsActive", "Title" },
                values: new object[,]
                {
                    { 1, "Yayathon 2026 bireysel başvuruları açıldı. Takımlar organizasyon komitesi tarafından oluşturulacaktır.\n\nBaşvurular bireysel olarak alınır. Hazır takım başvuruları kabul edilmez.\nKatılımcı profilleri; disiplin çeşitliliği ve denge kriterleri gözetilerek 10×10 modeliyle hibrit takımlara dağıtılır.\nBaşvuru adımlarını tamamladıktan sonra gönderim ekranında “Başvuruyu gönder” ile işlemi bitirebilirsiniz.", new DateTime(2026, 3, 27, 0, 0, 0, 0, DateTimeKind.Utc), true, "Başvurular Açıldı" },
                    { 2, "5 Haziran saha keşfi programının ana akışı ve buluşma noktaları duyuruldu.\n\nSaha keşfi, İzmit kent merkezi odaklı tramvay turu ve rehberli yürüyüşleri kapsar.\nKatılımcıların rahat yürüyüş ayakkabısı ve hava koşullarına uygun ekipmanla gelmeleri önerilir.\nDetaylı program “Takvim” sayfasında güncellenecektir.", new DateTime(2026, 4, 10, 0, 0, 0, 0, DateTimeKind.Utc), true, "Saha Keşfi Programı Duyurusu" },
                    { 3, "Lojistik ve etkinlik kuralları hakkında yeni sorular eklendi, yanıtlar güncellendi.\n\nKendi bilgisayarınızı getirmeniz beklenir; sınırlı sayıda yazılım/donanım desteği sağlanabilir.\nEtkinlik günü iaşe organizasyon tarafından karşılanacaktır.\nYeni sorular için “SSS” sayfasını ziyaret edebilirsiniz.", new DateTime(2026, 4, 18, 0, 0, 0, 0, DateTimeKind.Utc), true, "SSS Güncellemesi" },
                    { 4, "Hackathon günü mentorluk slotları ve branş bazlı masa düzeni duyuruldu.\n\nMimarlık, ulaşım planlama ve yazılım mentorları için ayrı istişare alanları belirlendi.\nSlotlar, kayıt sonrası katılımcı panelinden görüntülenebilecek.", new DateTime(2026, 4, 22, 0, 0, 0, 0, DateTimeKind.Utc), true, "Mentor Görüşme Takvimi" },
                    { 5, "Bireysel başvurular 25 Mayıs 2026 saat 23:59’a kadar alınmaya devam edecek.\n\nBaşvuru formunda zorunlu alanların tamamlandığından emin olun.\nOnay e-postası gönderiminde gecikme yaşanmaması için iletişim bilgilerinizi kontrol edin.", new DateTime(2026, 5, 1, 0, 0, 0, 0, DateTimeKind.Utc), true, "Son Başvuru Tarihi Hatırlatması" },
                    { 6, "İzmit ve Darıca için güncel pafta özetleri ve yaya güvenliği istatistikleri pakete eklendi.\n\nİndirilebilir kaynaklar sayfasından yeni sürüme erişebilirsiniz (yayınlandığında).\nÖnceki çalışmalarınızı yeni katmanlarla uyumlu hale getirmeniz önerilir.", new DateTime(2026, 5, 8, 0, 0, 0, 0, DateTimeKind.Utc), true, "Teknik Veri Paketi Güncellemesi" },
                    { 7, "Luxor Garden Park Hotel çevresi toplu taşıma hatları ve misafir otopark yönlendirmesi paylaşıldı.\n\nİzmit merkezden tramvay ve otobüs bağlantıları için özet harita eklendi.\nEtkinlik günü vale ve alternatif park alanları organizasyon tarafından iletilecek.", new DateTime(2026, 5, 12, 0, 0, 0, 0, DateTimeKind.Utc), true, "Ulaşım ve Otopark Bilgisi" },
                    { 8, "5 dakikalık sunumda beklenen başlıklar ve yedek materyal (poster / kısa video) kuralları netleştirildi.\n\nSunum şablonu indirilebilir kaynaklar bölümünde yer alacaktır.\nTeknik aksaklıklar için USB yedek ve PDF çıktı getirmeniz tavsiye edilir.", new DateTime(2026, 5, 15, 0, 0, 0, 0, DateTimeKind.Utc), true, "Jüri Sunum Formatı" },
                    { 9, "5 Haziran saha programı için hava durumuna uygun kıyafet ve rahat ayakkabı zorunluluğu hatırlatması.\n\nUzun süre ayakta ve yürüyüş içeren programda su ve şapka bulundurmanız önerilir.\nÖzel sağlık durumunuzu kayıt sırasında bildirmeniz önemlidir.", new DateTime(2026, 5, 20, 0, 0, 0, 0, DateTimeKind.Utc), true, "Saha Keşfi Hava ve Ekipman" }
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$Ki2HmjBB5QVx56TWNY348eWsdMsdo4Ojn0Xd4pY5G/woTEa/pXhDG");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Announcements",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Announcements",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Announcements",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Announcements",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Announcements",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Announcements",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Announcements",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Announcements",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Announcements",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$Jh/9Hqh1uD97NRS/ADU6BeIpiE1B/kPeaV/jRYFTiMX/6COUI0kT6");
        }
    }
}

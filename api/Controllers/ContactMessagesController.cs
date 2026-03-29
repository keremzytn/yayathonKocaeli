using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Api.Data;
using Api.Models;
using Api.Services;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactMessagesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IEmailService _emailService;

        public ContactMessagesController(AppDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage([FromBody] ContactMessage message)
        {
            message.CreatedAt = DateTime.UtcNow;
            message.IsRead = false;
            _context.ContactMessages.Add(message);
            await _context.SaveChangesAsync();

            // Send notification email to admin/yourself
            var subject = $"Yeni İletişim Formu Mesajı Gönderildi: {message.Name}";
            var body = $@"
<!DOCTYPE html>
<html>
<head>
    <meta charset=""utf-8"">
</head>
<body style=""margin: 0; padding: 0; background-color: #f6f9fc;"">
    <div style=""font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 40px auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.05);"">
        <div style=""text-align: center; padding-bottom: 25px; border-bottom: 2px solid #f0f0f0;"">
            <h2 style=""color: #111827; margin: 0; font-size: 26px; font-weight: 700;"">Yayathon 2026</h2>
            <p style=""color: #6b7280; margin: 8px 0 0 0; font-size: 15px;"">İletişim Formu'ndan Yeni Bir Mesajınız Var</p>
        </div>
        
        <div style=""padding: 25px 0;"">
            <p style=""font-size: 16px; color: #374151; line-height: 1.6;"">Merhaba,</p>
            <p style=""font-size: 16px; color: #374151; line-height: 1.6;"">Web siteniz üzerinden yeni bir iletişim formu dolduruldu. Detaylar aşağıda yer almaktadır:</p>
            
            <table style=""width: 100%; border-collapse: collapse; margin-top: 25px; background-color: #f9fafb; border-radius: 8px; overflow: hidden;"">
                <tr>
                    <td style=""padding: 16px; border-bottom: 1px solid #e5e7eb; width: 120px; font-weight: 600; color: #4b5563;"">Ad Soyad:</td>
                    <td style=""padding: 16px; border-bottom: 1px solid #e5e7eb; color: #111827;"">{message.Name}</td>
                </tr>
                <tr>
                    <td style=""padding: 16px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #4b5563;"">E-posta:</td>
                    <td style=""padding: 16px; border-bottom: 1px solid #e5e7eb; color: #111827;""><a href=""mailto:{message.Email}"" style=""color: #4f46e5; text-decoration: none; font-weight: 600;"">{message.Email}</a></td>
                </tr>
                <tr>
                    <td style=""padding: 16px; font-weight: 600; color: #4b5563;"">Tarih:</td>
                    <td style=""padding: 16px; color: #111827;"">{message.CreatedAt.ToLocalTime():dd.MM.yyyy HH:mm}</td>
                </tr>
            </table>
            
            <div style=""margin-top: 30px; padding: 20px; background-color: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 6px;"">
                <h4 style=""margin-top: 0; margin-bottom: 10px; color: #1d4ed8; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;"">Mesaj İçeriği</h4>
                <p style=""color: #1e3a8a; font-size: 15.5px; line-height: 1.7; white-space: pre-wrap; margin-bottom: 0;"">{message.Message}</p>
            </div>
        </div>
        
        <div style=""margin-top: 35px; padding-top: 25px; border-top: 1px solid #e5e7eb; text-align: center;"">
            <p style=""color: #9ca3af; font-size: 13px; margin: 0; line-height: 1.5;"">Bu e-posta <strong>Yayathon 2026</strong> iletişim bilgisayar sistemi tarafından otomatik olarak oluşturulmuştur.</p>
            <p style=""color: #9ca3af; font-size: 13px; margin: 6px 0 0 0; line-height: 1.5;"">Yanıt vermek isterseniz göndericinin yukarıdaki e-posta adresi ile iletişime geçebilirsiniz.</p>
        </div>
    </div>
</body>
</html>
";

            try
            {
                // Send email to the system address (e.g. your Gmail)
                // We use taksanndt.contact@gmail.com from appsettings automatically if we read _config
                // We can just hardcode the recipient to taksanndt.contact@gmail.com or pass it from config. 
                // Let's pass it to your email address:
                await _emailService.SendEmailAsync("taksanndt.contact@gmail.com", subject, body);
            }
            catch (System.Exception ex)
            {
                // Log exception if needed, but don't fail the request (the message is saved)
                System.Console.WriteLine($"Error sending email: {ex.Message}");
            }

            return Ok();
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetMessages()
        {
            return Ok(_context.ContactMessages.OrderByDescending(m => m.CreatedAt).ToList());
        }

        [Authorize]
        [HttpPut("{id}/read")]
        public IActionResult MarkAsRead(int id)
        {
            var message = _context.ContactMessages.Find(id);
            if (message == null) return NotFound();

            message.IsRead = true;
            _context.SaveChanges();
            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult DeleteMessage(int id)
        {
            var message = _context.ContactMessages.Find(id);
            if (message == null) return NotFound();

            _context.ContactMessages.Remove(message);
            _context.SaveChanges();
            return NoContent();
        }
    }
}

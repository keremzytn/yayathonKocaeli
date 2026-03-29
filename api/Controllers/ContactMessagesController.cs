using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Api.Data;
using Api.Models;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactMessagesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContactMessagesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult CreateMessage([FromBody] ContactMessage message)
        {
            message.CreatedAt = DateTime.UtcNow;
            message.IsRead = false;
            _context.ContactMessages.Add(message);
            _context.SaveChanges();
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

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Api.Data;
using Api.Models;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnnouncementsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AnnouncementsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAnnouncements()
        {
            return Ok(_context.Announcements.OrderByDescending(a => a.CreatedAt).ToList());
        }

        [Authorize]
        [HttpPost]
        public IActionResult CreateAnnouncement([FromBody] Announcement announcement)
        {
            announcement.CreatedAt = DateTime.UtcNow;
            _context.Announcements.Add(announcement);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetAnnouncements), new { id = announcement.Id }, announcement);
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult UpdateAnnouncement(int id, [FromBody] Announcement announcement)
        {
            var existing = _context.Announcements.Find(id);
            if (existing == null) return NotFound();

            existing.Title = announcement.Title;
            existing.Content = announcement.Content;
            existing.IsActive = announcement.IsActive;

            _context.SaveChanges();
            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult DeleteAnnouncement(int id)
        {
            var existing = _context.Announcements.Find(id);
            if (existing == null) return NotFound();

            _context.Announcements.Remove(existing);
            _context.SaveChanges();
            return NoContent();
        }
    }
}

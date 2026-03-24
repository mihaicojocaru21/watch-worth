using Microsoft.AspNetCore.Mvc;
using WatchWorth.BusinessLayer.Interfaces;

namespace WatchWorth.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly IItemService _itemService;

        public ItemsController(IItemService itemService)
        {
            _itemService = itemService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var items = _itemService.GetAllItems();
            return Ok(items);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            var item = _itemService.GetItemById(id);

            if (item is null)
                return NotFound(new { error = $"Item with id {id} not found" });

            return Ok(item);
        }
    }
}
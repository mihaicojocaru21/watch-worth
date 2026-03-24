using WatchWorth.BusinessLayer.DTOs;
using WatchWorth.BusinessLayer.Interfaces;

namespace WatchWorth.BusinessLayer.Services
{
    public class ItemService : IItemService
    {
        // Mock data - bun pentru început și testare frontend
        private readonly List<ItemDto> _items = new()
        {
            new ItemDto { Id = 1, Name = "Item 1", Description = "Descriere 1" },
            new ItemDto { Id = 2, Name = "Item 2", Description = "Descriere 2" },
            new ItemDto { Id = 3, Name = "Item 3", Description = "Descriere 3" }
        };

        public IEnumerable<ItemDto> GetAllItems()
        {
            return _items;
        }

        public ItemDto? GetItemById(int id)
        {
            return _items.FirstOrDefault(i => i.Id == id);
        }
    }
}
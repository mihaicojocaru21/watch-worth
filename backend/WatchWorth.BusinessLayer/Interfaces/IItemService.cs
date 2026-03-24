using WatchWorth.BusinessLayer.DTOs;

namespace WatchWorth.BusinessLayer.Interfaces
{
    public interface IItemService
    {
        IEnumerable<ItemDto> GetAllItems();
        ItemDto? GetItemById(int id);
    }
}
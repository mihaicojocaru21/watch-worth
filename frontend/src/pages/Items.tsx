import { useEffect, useState } from 'react';
import { itemService, type Item } from '../services/itemService';

const Items = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        itemService
            .getAll()
            .then(setItems)
            .catch((err: Error) => setError(err.message));
    }, []);

    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <div style={{ padding: 16 }}>
            <h1>Items</h1>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <strong>{item.name}</strong> — {item.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Items;
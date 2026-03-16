import type { Review } from '../types';

// Mock reviewers (different from the 2 real users so there's no conflict)
// userId 10+ = mock users, won't clash with real user IDs (1, 2)

export const MOCK_REVIEWS: Review[] = [

    // ── 1. The Shawshank Redemption ──────────────────────────────────────
    { id: 'mock-1-1', movieId: 1, userId: 11, username: 'FilmNerd92',   rating: 5, text: 'Absolutely flawless. Every frame, every line of dialogue feels essential. Red and Andy\'s friendship is one of cinema\'s greatest.', createdAt: '2024-11-03T10:22:00Z' },
    { id: 'mock-1-2', movieId: 1, userId: 12, username: 'CinemaLover',  rating: 5, text: 'I\'ve watched this a dozen times and it still moves me. The ending alone deserves five stars.', createdAt: '2024-12-15T17:40:00Z' },
    { id: 'mock-1-3', movieId: 1, userId: 13, username: 'MovieBuff_RO', rating: 4, text: 'One of the best character studies ever committed to film. Morgan Freeman\'s narration is pitch perfect throughout.', createdAt: '2025-01-08T09:11:00Z' },

    // ── 2. The Godfather ─────────────────────────────────────────────────
    { id: 'mock-2-1', movieId: 2, userId: 14, username: 'ClassicsOnly', rating: 5, text: 'The definitive gangster film. Brando\'s transformation into Vito Corleone remains the most iconic performance in Hollywood history.', createdAt: '2024-10-20T14:33:00Z' },
    { id: 'mock-2-2', movieId: 2, userId: 11, username: 'FilmNerd92',   rating: 5, text: 'Coppola created something mythological here. Every scene has the weight of inevitability. Masterpiece doesn\'t even cover it.', createdAt: '2025-01-22T11:05:00Z' },
    { id: 'mock-2-3', movieId: 2, userId: 15, username: 'ReelCritic',   rating: 4, text: 'Slow to start but once it finds its rhythm it\'s relentless. The baptism sequence is a masterclass in parallel editing.', createdAt: '2025-02-09T20:17:00Z' },

    // ── 3. The Dark Knight ───────────────────────────────────────────────
    { id: 'mock-3-1', movieId: 3, userId: 16, username: 'NightHawk',    rating: 5, text: 'Heath Ledger\'s Joker is the single greatest villain performance in superhero cinema. The film transcends its genre completely.', createdAt: '2024-09-14T22:00:00Z' },
    { id: 'mock-3-2', movieId: 3, userId: 12, username: 'CinemaLover',  rating: 5, text: 'Still holds up in 2025. The interrogation scene, the truck flip, the hospital — every set piece is iconic.', createdAt: '2024-12-01T18:45:00Z' },
    { id: 'mock-3-3', movieId: 3, userId: 17, username: 'CasualViewer', rating: 4, text: 'Great film but slightly too long in the third act. Ledger alone makes this essential viewing.', createdAt: '2025-01-30T13:22:00Z' },

    // ── 8. Pulp Fiction ──────────────────────────────────────────────────
    { id: 'mock-8-1', movieId: 8, userId: 13, username: 'MovieBuff_RO', rating: 5, text: 'Tarantino redefined storytelling with this one. The non-linear structure feels radical even now. Vincent and Jules are timeless.', createdAt: '2024-11-17T16:00:00Z' },
    { id: 'mock-8-2', movieId: 8, userId: 16, username: 'NightHawk',    rating: 4, text: 'Pure cinema. The dialogue feels so alive and spontaneous. Not for everyone but undeniably one of the best of the 90s.', createdAt: '2025-01-05T10:30:00Z' },

    // ── 9. Inception ─────────────────────────────────────────────────────
    { id: 'mock-9-1', movieId: 9, userId: 15, username: 'ReelCritic',   rating: 5, text: 'Nolan at the absolute peak of his craft. The spinning top ending is still discussed a decade later. Dense but rewarding.', createdAt: '2024-10-08T21:15:00Z' },
    { id: 'mock-9-2', movieId: 9, userId: 17, username: 'CasualViewer', rating: 4, text: 'Lost me a couple times in the second act but the spectacle is unmatched. The zero-gravity hallway fight is extraordinary.', createdAt: '2025-02-14T09:00:00Z' },
    { id: 'mock-9-3', movieId: 9, userId: 11, username: 'FilmNerd92',   rating: 5, text: 'Every rewatch reveals something new. Hans Zimmer\'s score alone deserves an award. Endlessly inventive.', createdAt: '2025-03-01T14:55:00Z' },

    // ── 11. Fight Club ───────────────────────────────────────────────────
    { id: 'mock-11-1', movieId: 11, userId: 14, username: 'ClassicsOnly', rating: 4, text: 'A visceral and disturbing critique of consumerism. Fincher\'s direction is cold and clinical in the best possible way.', createdAt: '2024-12-22T23:00:00Z' },
    { id: 'mock-11-2', movieId: 11, userId: 16, username: 'NightHawk',    rating: 5, text: 'The twist recontextualises everything. Brad Pitt and Norton are magnetic together. Still feels dangerous 25 years later.', createdAt: '2025-01-11T17:40:00Z' },

    // ── 12. Forrest Gump ─────────────────────────────────────────────────
    { id: 'mock-12-1', movieId: 12, userId: 17, username: 'CasualViewer', rating: 5, text: 'Makes me cry every single time. Tom Hanks is operating on a different level here. Simple story, profound impact.', createdAt: '2024-11-25T20:30:00Z' },
    { id: 'mock-12-2', movieId: 12, userId: 12, username: 'CinemaLover',  rating: 4, text: 'Emotionally manipulative in places but impossible to resist. The historical cameos are genuinely clever.', createdAt: '2025-02-03T12:10:00Z' },

    // ── 14. The Matrix ───────────────────────────────────────────────────
    { id: 'mock-14-1', movieId: 14, userId: 13, username: 'MovieBuff_RO', rating: 5, text: 'Changed action cinema permanently. The bullet-time effect was revolutionary but it\'s the ideas that make it a classic.', createdAt: '2024-10-31T19:45:00Z' },
    { id: 'mock-14-2', movieId: 14, userId: 15, username: 'ReelCritic',   rating: 5, text: 'Red pill or blue pill — the philosophy is accessible without being shallow. Keanu was perfectly cast.', createdAt: '2024-12-07T11:20:00Z' },
    { id: 'mock-14-3', movieId: 14, userId: 18, username: 'ScifiGeek',    rating: 4, text: 'Visually stunning even by today\'s standards. The sequels let it down but this first film is near perfect.', createdAt: '2025-01-19T15:35:00Z' },

    // ── 16. Interstellar ─────────────────────────────────────────────────
    { id: 'mock-16-1', movieId: 16, userId: 18, username: 'ScifiGeek',    rating: 5, text: 'The docking scene had my heart in my throat. Zimmer\'s organ score is unlike anything ever made for a film.', createdAt: '2024-09-28T22:50:00Z' },
    { id: 'mock-16-2', movieId: 16, userId: 11, username: 'FilmNerd92',   rating: 4, text: 'Ambitious and emotionally overwhelming. The bookshelf scene is one of the most beautiful and strange things in modern cinema.', createdAt: '2025-02-20T09:45:00Z' },
    { id: 'mock-16-3', movieId: 16, userId: 17, username: 'CasualViewer', rating: 3, text: 'Beautiful but exhausting. The third act lost me a bit. Cooper and Murph\'s relationship is genuinely moving though.', createdAt: '2025-03-05T16:00:00Z' },

    // ── 23. Parasite ─────────────────────────────────────────────────────
    { id: 'mock-23-1', movieId: 23, userId: 15, username: 'ReelCritic',   rating: 5, text: 'Bong Joon-ho is operating at a different level to everyone else. The genre shifts are seamless and the ending is devastating.', createdAt: '2024-11-10T14:00:00Z' },
    { id: 'mock-23-2', movieId: 23, userId: 14, username: 'ClassicsOnly', rating: 5, text: 'First Korean film to win the Palme d\'Or and Best Picture — and it absolutely deserved both. Reshuffles your expectations every 20 minutes.', createdAt: '2025-01-27T18:30:00Z' },

    // ── 25. Whiplash ─────────────────────────────────────────────────────
    { id: 'mock-25-1', movieId: 25, userId: 16, username: 'NightHawk',    rating: 5, text: 'J.K. Simmons is terrifying. The final 15 minutes are among the most intense in any film ever made. An absolute masterwork.', createdAt: '2024-12-18T21:00:00Z' },
    { id: 'mock-25-2', movieId: 25, userId: 12, username: 'CinemaLover',  rating: 4, text: 'Tightly wound and relentlessly paced. Fletcher is one of the great movie villains. Or is he? That\'s the film\'s genius.', createdAt: '2025-02-28T10:15:00Z' },

    // ── 41. Spirited Away ────────────────────────────────────────────────
    { id: 'mock-41-1', movieId: 41, userId: 13, username: 'MovieBuff_RO', rating: 5, text: 'Miyazaki\'s greatest achievement. The world-building is so rich and strange. Chihiro\'s journey feels genuinely mythological.', createdAt: '2024-10-15T16:40:00Z' },
    { id: 'mock-41-2', movieId: 41, userId: 18, username: 'ScifiGeek',    rating: 5, text: 'Perfect in every frame. The bathhouse is one of the most imaginative settings ever conceived. Timeless.', createdAt: '2025-01-14T13:00:00Z' },
];
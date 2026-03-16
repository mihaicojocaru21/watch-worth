import type { Movie, User } from '../types';

export const MOCK_MOVIES: Movie[] = [
    {
        id: 1,
        title: "The Shawshank Redemption",
        year: 1994,
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        rating: 9.3,
        image: "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bAY0KHBdCywJvqfK.jpg",
        genre: "Drama"
    },
    {
        id: 2,
        title: "The Godfather",
        year: 1972,
        description: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
        rating: 9.2,
        image: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsLegHnDmni0j.jpg",
        genre: "Crime"
    },
    {
        id: 3,
        title: "The Dark Knight",
        year: 2008,
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
        rating: 9.0,
        image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        genre: "Action"
    },
    {
        id: 4,
        title: "The Godfather Part II",
        year: 1974,
        description: "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son Michael expands and tightens his grip on the family crime syndicate.",
        rating: 9.0,
        image: "https://image.tmdb.org/t/p/w500/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg",
        genre: "Crime"
    },
    {
        id: 5,
        title: "Schindler's List",
        year: 1993,
        description: "In German-occupied Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution.",
        rating: 9.0,
        image: "https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
        genre: "History"
    },
    {
        id: 6,
        title: "12 Angry Men",
        year: 1957,
        description: "The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to reconsider the evidence.",
        rating: 9.0,
        image: "https://image.tmdb.org/t/p/w500/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg",
        genre: "Drama"
    },
    {
        id: 7,
        title: "The Lord of the Rings: The Return of the King",
        year: 2003,
        description: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
        rating: 9.0,
        image: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
        genre: "Fantasy"
    },
    {
        id: 8,
        title: "Pulp Fiction",
        year: 1994,
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        rating: 8.9,
        image: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
        genre: "Crime"
    },
    {
        id: 9,
        title: "Inception",
        year: 2010,
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        rating: 8.8,
        image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        genre: "Sci-Fi"
    },
    {
        id: 10,
        title: "The Lord of the Rings: The Fellowship of the Ring",
        year: 2001,
        description: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
        rating: 8.8,
        image: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
        genre: "Fantasy"
    },
    {
        id: 11,
        title: "Fight Club",
        year: 1999,
        description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
        rating: 8.8,
        image: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
        genre: "Drama"
    },
    {
        id: 12,
        title: "Forrest Gump",
        year: 1994,
        description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man.",
        rating: 8.8,
        image: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
        genre: "Drama"
    },
    {
        id: 13,
        title: "Goodfellas",
        year: 1990,
        description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
        rating: 8.7,
        image: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
        genre: "Crime"
    },
    {
        id: 14,
        title: "The Matrix",
        year: 1999,
        description: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth — the life he knows is the elaborate deception of an evil cyber-intelligence.",
        rating: 8.7,
        image: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        genre: "Sci-Fi"
    },
    {
        id: 15,
        title: "Star Wars: Episode V – The Empire Strikes Back",
        year: 1980,
        description: "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda.",
        rating: 8.7,
        image: "https://image.tmdb.org/t/p/w500/2l05cFWJacyIsTpsqSgH0wQXe4V.jpg",
        genre: "Sci-Fi"
    },
    {
        id: 16,
        title: "Interstellar",
        year: 2014,
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        rating: 8.6,
        image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        genre: "Sci-Fi"
    },
    {
        id: 17,
        title: "One Flew Over the Cuckoo's Nest",
        year: 1975,
        description: "A criminal pleads insanity and is admitted to a mental institution, where he rebels against the oppressive nurse and rallies the patients.",
        rating: 8.7,
        image: "https://image.tmdb.org/t/p/w500/3jcbDmRFiQ83drXNOvRDeKHxS0C.jpg",
        genre: "Drama"
    },
    {
        id: 18,
        title: "Saving Private Ryan",
        year: 1998,
        description: "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
        rating: 8.6,
        image: "https://image.tmdb.org/t/p/w500/uqx37cS8cpHg8U35f9U5IBlrCV3.jpg",
        genre: "War"
    },
    {
        id: 19,
        title: "The Silence of the Lambs",
        year: 1991,
        description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
        rating: 8.6,
        image: "https://image.tmdb.org/t/p/w500/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg",
        genre: "Thriller"
    },
    {
        id: 20,
        title: "Se7en",
        year: 1995,
        description: "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
        rating: 8.6,
        image: "https://image.tmdb.org/t/p/w500/6yoghtyTpznpBik8EngEmJskVUO.jpg",
        genre: "Thriller"
    },
    {
        id: 21,
        title: "It's a Wonderful Life",
        year: 1946,
        description: "An angel is sent from Heaven to help a desperately frustrated businessman by showing him what life would have been like if he had never existed.",
        rating: 8.6,
        image: "https://image.tmdb.org/t/p/w500/bSqt9rhDZx1Q7UZ86dBPcIAgXEE.jpg",
        genre: "Drama"
    },
    {
        id: 22,
        title: "The Lord of the Rings: The Two Towers",
        year: 2002,
        description: "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally.",
        rating: 8.7,
        image: "https://image.tmdb.org/t/p/w500/5VTN0pR8gcqV3EPUHHfMGnJYspL.jpg",
        genre: "Fantasy"
    },
    {
        id: 23,
        title: "Parasite",
        year: 2019,
        description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        rating: 8.5,
        image: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        genre: "Thriller"
    },
    {
        id: 24,
        title: "The Green Mile",
        year: 1999,
        description: "The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.",
        rating: 8.6,
        image: "https://image.tmdb.org/t/p/w500/8VG8fDNiy50H4FedGwdSVUPoaJe.jpg",
        genre: "Drama"
    },
    {
        id: 25,
        title: "Whiplash",
        year: 2014,
        description: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing.",
        rating: 8.5,
        image: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
        genre: "Drama"
    },
    {
        id: 26,
        title: "Gladiator",
        year: 2000,
        description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
        rating: 8.5,
        image: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
        genre: "Action"
    },
    {
        id: 27,
        title: "The Prestige",
        year: 2006,
        description: "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.",
        rating: 8.5,
        image: "https://image.tmdb.org/t/p/w500/5MXyQfz8xkjjqCM9wFkMxNF9xPh.jpg",
        genre: "Mystery"
    },
    {
        id: 28,
        title: "Leon: The Professional",
        year: 1994,
        description: "12-year-old Mathilda is taken in by Leon, a professional cleaner, after her family is murdered. Leon and Mathilda form an unusual relationship as she becomes his apprentice.",
        rating: 8.5,
        image: "https://image.tmdb.org/t/p/w500/yI6X2cCM5YPJtxMhUd3dPGqDAhw.jpg",
        genre: "Action"
    },
    {
        id: 29,
        title: "American History X",
        year: 1998,
        description: "A former neo-nazi skinhead tries to prevent his younger brother from going down the same wrong path that he did.",
        rating: 8.5,
        image: "https://image.tmdb.org/t/p/w500/3RNUn9gMNDQCb7LC2GSdS2HKWML.jpg",
        genre: "Drama"
    },
    {
        id: 30,
        title: "The Usual Suspects",
        year: 1995,
        description: "A sole survivor tells of the twisty events leading up to a horrific gun battle on a boat, which began when five criminals met at a seemingly random police lineup.",
        rating: 8.5,
        image: "https://image.tmdb.org/t/p/w500/bUcm1osAJPBNjnWb8kFxMBfO6aq.jpg",
        genre: "Mystery"
    },
    {
        id: 31,
        title: "Memento",
        year: 2000,
        description: "A man with short-term memory loss attempts to track down his wife's murderer.",
        rating: 8.4,
        image: "https://image.tmdb.org/t/p/w500/yuNs09hvpHVU1cBTCAk9zxsL2oW.jpg",
        genre: "Mystery"
    },
    {
        id: 32,
        title: "The Departed",
        year: 2006,
        description: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
        rating: 8.5,
        image: "https://image.tmdb.org/t/p/w500/nT97ifVT2J1yMQmeq20Qblg61T.jpg",
        genre: "Crime"
    },
    {
        id: 33,
        title: "Alien",
        year: 1979,
        description: "After a space merchant vessel receives an unknown transmission as a distress call, one of the crew is attacked by a mysterious life form and they discover it was a warning.",
        rating: 8.4,
        image: "https://image.tmdb.org/t/p/w500/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg",
        genre: "Horror"
    },
    {
        id: 34,
        title: "Apocalypse Now",
        year: 1979,
        description: "A U.S. Army officer serving in Vietnam is tasked with assassinating a renegade Special Forces Colonel who sees himself as a god.",
        rating: 8.4,
        image: "https://image.tmdb.org/t/p/w500/gQB8Y5RCMkv2zwzFHbUJX3kAhvA.jpg",
        genre: "War"
    },
    {
        id: 35,
        title: "Rear Window",
        year: 1954,
        description: "A wheelchair-bound photographer spies on his neighbours from his apartment window and becomes convinced one of them has committed murder.",
        rating: 8.5,
        image: "https://image.tmdb.org/t/p/w500/ILVF0eJg2nONCIbhNHlGjhRgEOK.jpg",
        genre: "Thriller"
    },
    {
        id: 36,
        title: "Casablanca",
        year: 1942,
        description: "A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover and her fugitive husband escape the Nazis in French Morocco.",
        rating: 8.5,
        image: "https://image.tmdb.org/t/p/w500/5K7cOHoay2mZusSLezBOY0Qxh8a.jpg",
        genre: "Romance"
    },
    {
        id: 37,
        title: "City of God",
        year: 2002,
        description: "In the slums of Rio, two kids' paths diverge as one becomes a photographer and the other a drug dealer.",
        rating: 8.6,
        image: "https://image.tmdb.org/t/p/w500/k7eYdWvhYQyRQoU2TB2A2Xu2TfD.jpg",
        genre: "Crime"
    },
    {
        id: 38,
        title: "Joker",
        year: 2019,
        description: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society, causing him to slowly descend into insanity and become a criminal mastermind.",
        rating: 8.4,
        image: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
        genre: "Drama"
    },
    {
        id: 39,
        title: "Inglourious Basterds",
        year: 2009,
        description: "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans.",
        rating: 8.3,
        image: "https://image.tmdb.org/t/p/w500/7sfbEnaARXDDhKm0CZ7D7uc2sbo.jpg",
        genre: "War"
    },
    {
        id: 40,
        title: "Django Unchained",
        year: 2012,
        description: "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.",
        rating: 8.4,
        image: "https://image.tmdb.org/t/p/w500/7oWY8VDWW7thTzWh3OKYRkWAb8Z.jpg",
        genre: "Western"
    },
    {
        id: 41,
        title: "Spirited Away",
        year: 2001,
        description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.",
        rating: 8.6,
        image: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
        genre: "Animation"
    },
    {
        id: 42,
        title: "The Lion King",
        year: 1994,
        description: "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
        rating: 8.5,
        image: "https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
        genre: "Animation"
    },
    {
        id: 43,
        title: "WALL·E",
        year: 2008,
        description: "In the distant future, a small waste-collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.",
        rating: 8.4,
        image: "https://image.tmdb.org/t/p/w500/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg",
        genre: "Animation"
    },
    {
        id: 44,
        title: "The Truman Show",
        year: 1998,
        description: "An insurance salesman discovers his whole life is actually a reality TV show.",
        rating: 8.2,
        image: "https://image.tmdb.org/t/p/w500/vuza0WqY239yBXOadKlGwJsZJFE.jpg",
        genre: "Drama"
    },
    {
        id: 45,
        title: "Good Will Hunting",
        year: 1997,
        description: "Will Hunting, a janitor at M.I.T., has a gift for mathematics but needs help from a psychologist to find direction in his life.",
        rating: 8.3,
        image: "https://image.tmdb.org/t/p/w500/bABCcRokAvyzkBNqnWE0pzFV6Fa.jpg",
        genre: "Drama"
    },
    {
        id: 46,
        title: "The Shining",
        year: 1980,
        description: "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from the past.",
        rating: 8.4,
        image: "https://image.tmdb.org/t/p/w500/b6ko0IKC8MdYBBPkkA1aBPLe2yz.jpg",
        genre: "Horror"
    },
    {
        id: 47,
        title: "Blade Runner 2049",
        year: 2017,
        description: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard.",
        rating: 8.0,
        image: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
        genre: "Sci-Fi"
    },
    {
        id: 48,
        title: "No Country for Old Men",
        year: 2007,
        description: "Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande.",
        rating: 8.2,
        image: "https://image.tmdb.org/t/p/w500/6d5XOczc2HBpRKiNFgATRkIRpxH.jpg",
        genre: "Thriller"
    },
    {
        id: 49,
        title: "A Beautiful Mind",
        year: 2001,
        description: "After John Nash, a brilliant but asocial mathematician, accepts secret work in cryptography, his life takes a turn for the nightmarish.",
        rating: 8.2,
        image: "https://image.tmdb.org/t/p/w500/z5xTf8pVtEJTgSbj8UfOmBIbGhY.jpg",
        genre: "Biography"
    },
    {
        id: 50,
        title: "The Grand Budapest Hotel",
        year: 2014,
        description: "A writer encounters the owner of an aging European hotel between the wars and learns of his early years serving as a lobby boy in the hotel's glorious past.",
        rating: 8.1,
        image: "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
        genre: "Comedy"
    }
];

export const MOCK_USERS: User[] = [
    { id: 1, username: "mihai admin", email: "admin@watchworth.com", role: "admin" },
    { id: 2, username: "mihai user", email: "user@watchworth.com", role: "user" }
];
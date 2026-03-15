import { prisma } from "../src/lib/prisma";

async function main() {
    console.log("Starting seeding...");

    // 1. Ensure we have a user to own the movies
    // The Movie model requires a userId
    //upsert -> update or create
    const user = await prisma.user.upsert({
        where: { email: "admin@example.com" },
        update: {},
        create: {
            name: "Admin User",
            email: "admin@example.com",
            password: "password123", // In a real app, hash this!
        },
    });

    console.log(`Using user: ${user.name} (${user.id})`);

    const movies = [
        {
            title: "The Shawshank Redemption",
            year: 1994,
            rating: 9.3,
            overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            userId: user.id
        },
        {
            title: "The Godfather",
            year: 1972,
            rating: 9.2,
            overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
            userId: user.id
        },
        {
            title: "The Dark Knight",
            year: 2008,
            rating: 9.0,
            overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            userId: user.id
        },
        {
            title: "The Green Mile",
            year: 1999,
            rating: 8.6,
            overview: "A supernatural tale set on death row in a Southern prison, where gentle giant John Coffey possesses a miraculous gift.",
            userId: user.id
        },
        {
            title: "The Prestige",
            year: 2006,
            rating: 8.5,
            overview: "Two stage magicians in 1890s London feud with each other to create the ultimate stage illusion.",
            userId: user.id
        }
    ];

    console.log("Seeding movies...");

    // Optional: Clear existing movies for this user to avoid duplicates if you run the seed multiple times
    // await prisma.movie.deleteMany({ where: { userId: user.id } });

    for (const movieData of movies) {
        // We use upsert if possible, but title is not unique in the schema.
        // So we'll just create them. If you want to avoid duplicates, 
        // you could check if the movie exists first.
        const existingMovie = await prisma.movie.findFirst({
            where: {
                title: movieData.title,
                year: movieData.year,
                userId: user.id
            }
        });

        if (!existingMovie) {
            await prisma.movie.create({
                data: movieData
            });
            console.log(`Created movie: ${movieData.title}`);
        } else {
            console.log(`Movie already exists: ${movieData.title}`);
        }
    }

    console.log("Seeding process completed.");
}

main()
    .catch((e) => {
        console.error("Error during seeding:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
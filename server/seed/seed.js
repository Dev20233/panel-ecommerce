const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const products = [
  // =====================================================
  // COMICS
  // =====================================================

  {
    name: "Batman: The Killing Joke",
    description: "A classic Batman graphic novel centered on the conflict between Batman and the Joker.",
    price: 899,
    category: "Comics",
    image: "/products/comics/batman-killing-joke.jpg",
    stock: 15,
    sizes: [],
    featured: true,
    trending: true,
    newArrival: false,
    releaseDate: new Date("2026-01-10")
  },

  {
    name: "Spider-Man: Blue",
    description: "A Spider-Man story following Peter Parker as he remembers Gwen Stacy and reflects on love, loss, and his early years as Spider-Man.",
    price: 1199,
    category: "Comics",
    image: "/products/comics/spiderman-blue.jpg",
    stock: 12,
    sizes: [],
    featured: true,
    trending: false,
    newArrival: false,
    releaseDate: new Date("2026-01-15")
  },

  {
    name: "Watchmen",
    description: "A landmark graphic novel exploring superheroes, morality, politics, and power through a complex alternate-history story.",
    price: 1499,
    category: "Comics",
    image: "/products/comics/watchmen.jpg",
    stock: 10,
    sizes: [],
    featured: false,
    trending: true,
    newArrival: false,
    releaseDate: new Date("2026-02-01")
  },

  {
    name: "The Infinity Gauntlet",
    description: "A Marvel cosmic saga featuring Thanos, the Infinity Gems, and Earth's heroes fighting to save the universe.",
    price: 1299,
    category: "Comics",
    image: "/products/comics/infinity-gauntlet.jpg",
    stock: 18,
    sizes: [],
    featured: true,
    trending: true,
    newArrival: false,
    releaseDate: new Date("2026-02-10")
  },

  {
    name: "V for Vendetta",
    description: "A dystopian graphic novel following the mysterious V and his resistance against an authoritarian regime.",
    price: 1099,
    category: "Comics",
    image: "/products/comics/v-for-vendetta.jpg",
    stock: 14,
    sizes: [],
    featured: false,
    trending: false,
    newArrival: true,
    releaseDate: new Date("2026-07-01")
  },


  // =====================================================
  // FIGURES
  // =====================================================

  {
    name: "Funko Pop! Spider-Man",
    description: "A stylized Spider-Man collectible vinyl figure designed for Marvel fans and display collections.",
    price: 1499,
    category: "Figures",
    image: "/products/figures/funko-spiderman.jpg",
    stock: 20,
    sizes: [],
    featured: true,
    trending: true,
    newArrival: false,
    releaseDate: new Date("2026-03-01")
  },

  {
    name: "S.H.Figuarts Naruto Uzumaki",
    description: "An articulated Naruto Uzumaki action figure featuring detailed sculpting and poseable joints.",
    price: 4499,
    category: "Figures",
    image: "/products/figures/naruto-shfiguarts.jpg",
    stock: 8,
    sizes: [],
    featured: true,
    trending: true,
    newArrival: true,
    releaseDate: new Date("2026-06-15")
  },

  {
    name: "Banpresto Son Goku Figure",
    description: "A detailed Dragon Ball collectible figure featuring Son Goku in his iconic martial arts outfit.",
    price: 2499,
    category: "Figures",
    image: "/products/figures/goku-banpresto.jpg",
    stock: 12,
    sizes: [],
    featured: true,
    trending: true,
    newArrival: false,
    releaseDate: new Date("2026-03-20")
  },

  {
    name: "Banpresto Monkey D. Luffy Figure",
    description: "A collectible figure of Monkey D. Luffy inspired by his appearance in the One Piece anime series.",
    price: 2799,
    category: "Figures",
    image: "/products/figures/luffy-banpresto.jpg",
    stock: 10,
    sizes: [],
    featured: false,
    trending: true,
    newArrival: true,
    releaseDate: new Date("2026-07-05")
  },

  {
    name: "Funko Pop! Batman",
    description: "A stylized Batman vinyl collectible featuring the Dark Knight's classic masked appearance.",
    price: 1399,
    category: "Figures",
    image: "/products/figures/funko-batman.jpg",
    stock: 16,
    sizes: [],
    featured: false,
    trending: false,
    newArrival: false,
    releaseDate: new Date("2026-04-01")
  },


  // =====================================================
  // APPAREL
  // =====================================================

  {
    name: "Batman Logo T-Shirt",
    description: "A black graphic T-shirt featuring the iconic Batman bat symbol on the front.",
    price: 799,
    category: "Apparel",
    image: "/products/apparel/batman-tshirt.jpg",
    stock: 40,
    sizes: ["S", "M", "L", "XL", "XXL"],
    featured: true,
    trending: true,
    newArrival: false,
    releaseDate: new Date("2026-04-10")
  },

  {
    name: "Spider-Man Graphic T-Shirt",
    description: "A casual graphic T-shirt featuring Spider-Man artwork inspired by Marvel comics.",
    price: 899,
    category: "Apparel",
    image: "/products/apparel/spiderman-tshirt.jpg",
    stock: 35,
    sizes: ["S", "M", "L", "XL", "XXL"],
    featured: true,
    trending: true,
    newArrival: true,
    releaseDate: new Date("2026-07-10")
  },

  {
    name: "Superman Logo T-Shirt",
    description: "A classic superhero T-shirt featuring Superman's recognizable S-Shield emblem.",
    price: 799,
    category: "Apparel",
    image: "/products/apparel/superman-tshirt.jpg",
    stock: 30,
    sizes: ["S", "M", "L", "XL"],
    featured: false,
    trending: false,
    newArrival: false,
    releaseDate: new Date("2026-04-20")
  },

  {
    name: "Dragon Ball Z Goku Hoodie",
    description: "A casual hoodie featuring Dragon Ball Z inspired Goku artwork for anime merchandise collectors.",
    price: 1899,
    category: "Apparel",
    image: "/products/apparel/goku-hoodie.jpg",
    stock: 22,
    sizes: ["S", "M", "L", "XL", "XXL"],
    featured: true,
    trending: true,
    newArrival: true,
    releaseDate: new Date("2026-07-12")
  },

  {
    name: "Naruto Akatsuki Hoodie",
    description: "A black anime hoodie featuring the recognizable red cloud design associated with the Akatsuki.",
    price: 1999,
    category: "Apparel",
    image: "/products/apparel/akatsuki-hoodie.jpg",
    stock: 25,
    sizes: ["S", "M", "L", "XL", "XXL"],
    featured: false,
    trending: true,
    newArrival: false,
    releaseDate: new Date("2026-05-01")
  },


  // =====================================================
  // ACCESSORIES
  // =====================================================

  {
    name: "Spider-Man Mini Backpack",
    description: "A compact Spider-Man themed backpack designed for carrying everyday essentials.",
    price: 1799,
    category: "Accessories",
    image: "/products/accessories/spiderman-backpack.jpg",
    stock: 18,
    sizes: [],
    featured: true,
    trending: true,
    newArrival: false,
    releaseDate: new Date("2026-05-05")
  },

  {
    name: "Batman Logo Cap",
    description: "A black adjustable cap featuring an embroidered Batman logo.",
    price: 699,
    category: "Accessories",
    image: "/products/accessories/batman-cap.jpg",
    stock: 30,
    sizes: [],
    featured: false,
    trending: true,
    newArrival: false,
    releaseDate: new Date("2026-05-10")
  },

  {
    name: "Marvel Avengers Keychain",
    description: "A compact Avengers themed keychain designed for keys, bags, and superhero collections.",
    price: 299,
    category: "Accessories",
    image: "/products/accessories/avengers-keychain.jpg",
    stock: 60,
    sizes: [],
    featured: false,
    trending: false,
    newArrival: true,
    releaseDate: new Date("2026-07-15")
  },

  {
    name: "Superman Logo Wallet",
    description: "A superhero themed wallet featuring Superman's classic S-Shield emblem.",
    price: 799,
    category: "Accessories",
    image: "/products/accessories/superman-wallet.jpg",
    stock: 25,
    sizes: [],
    featured: false,
    trending: false,
    newArrival: false,
    releaseDate: new Date("2026-05-20")
  },

  {
    name: "One Piece Straw Hat",
    description: "A cosplay-inspired straw hat based on the signature hat worn by Monkey D. Luffy in One Piece.",
    price: 999,
    category: "Accessories",
    image: "/products/accessories/luffy-straw-hat.jpg",
    stock: 20,
    sizes: [],
    featured: true,
    trending: true,
    newArrival: true,
    releaseDate: new Date("2026-07-16")
  },


  // =====================================================
  // ANIME
  // =====================================================

  {
    name: "Death Note Complete Box Set",
    description: "A collected manga box set following Light Yagami and the supernatural Death Note notebook.",
    price: 7999,
    category: "Anime",
    image: "/products/anime/death-note-box-set.jpg",
    stock: 7,
    sizes: [],
    featured: true,
    trending: true,
    newArrival: false,
    releaseDate: new Date("2026-05-25")
  },

  {
    name: "Demon Slayer Complete Box Set",
    description: "A manga collection covering the story of Tanjiro Kamado and his journey as a Demon Slayer.",
    price: 9999,
    category: "Anime",
    image: "/products/anime/demon-slayer-box-set.jpg",
    stock: 6,
    sizes: [],
    featured: true,
    trending: true,
    newArrival: false,
    releaseDate: new Date("2026-06-01")
  },

  {
    name: "Jujutsu Kaisen Vol. 1",
    description: "The first manga volume of Jujutsu Kaisen, introducing Yuji Itadori and the world of cursed spirits.",
    price: 699,
    category: "Anime",
    image: "/products/anime/jujutsu-kaisen-vol-1.jpg",
    stock: 35,
    sizes: [],
    featured: false,
    trending: true,
    newArrival: true,
    releaseDate: new Date("2026-07-17")
  },

  {
    name: "Attack on Titan Vol. 1",
    description: "The opening manga volume of Attack on Titan, following humanity's struggle for survival against the Titans.",
    price: 799,
    category: "Anime",
    image: "/products/anime/attack-on-titan-vol-1.jpg",
    stock: 28,
    sizes: [],
    featured: false,
    trending: false,
    newArrival: false,
    releaseDate: new Date("2026-06-10")
  },

  {
    name: "My Hero Academia Vol. 1",
    description: "The first manga volume introducing Izuku Midoriya and his journey toward becoming a professional hero.",
    price: 699,
    category: "Anime",
    image: "/products/anime/my-hero-academia-vol-1.jpg",
    stock: 32,
    sizes: [],
    featured: false,
    trending: true,
    newArrival: true,
    releaseDate: new Date("2026-07-18")
  },


  // =====================================================
  // MERCHANDISE
  // =====================================================

  {
    name: "Batman Logo Coffee Mug",
    description: "A ceramic coffee mug featuring the iconic Batman logo for superhero fans and collectors.",
    price: 499,
    category: "Merchandise",
    image: "/products/merchandise/batman-mug.jpg",
    stock: 40,
    sizes: [],
    featured: false,
    trending: true,
    newArrival: false,
    releaseDate: new Date("2026-06-15")
  },

  {
    name: "Marvel Avengers Poster",
    description: "A decorative wall poster featuring Marvel's Avengers heroes.",
    price: 399,
    category: "Merchandise",
    image: "/products/merchandise/avengers-poster.jpg",
    stock: 50,
    sizes: [],
    featured: false,
    trending: false,
    newArrival: false,
    releaseDate: new Date("2026-06-20")
  },

  {
    name: "Dragon Ball Z Desk Lamp",
    description: "A Dragon Ball Z themed decorative desk lamp designed for anime-themed rooms and gaming setups.",
    price: 1499,
    category: "Merchandise",
    image: "/products/merchandise/dbz-desk-lamp.jpg",
    stock: 15,
    sizes: [],
    featured: true,
    trending: true,
    newArrival: true,
    releaseDate: new Date("2026-07-19")
  },

  {
    name: "One Piece Wanted Poster Set",
    description: "A decorative collection of wanted posters inspired by characters from the One Piece series.",
    price: 699,
    category: "Merchandise",
    image: "/products/merchandise/one-piece-posters.jpg",
    stock: 25,
    sizes: [],
    featured: true,
    trending: true,
    newArrival: false,
    releaseDate: new Date("2026-06-25")
  },

  {
    name: "Naruto Hidden Leaf Headband",
    description: "A Naruto inspired forehead protector featuring the Hidden Leaf Village symbol.",
    price: 599,
    category: "Merchandise",
    image: "/products/merchandise/naruto-headband.jpg",
    stock: 35,
    sizes: [],
    featured: false,
    trending: true,
    newArrival: true,
    releaseDate: new Date("2026-07-20")
  }

];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log('Cleared existing data (users, products, orders)');

    // Seed default users
    const users = await User.create([
      {
        name: 'Admin User',
        email: 'admin@panel.com',
        password: 'admin123',
        role: 'admin',
        phone: '9876543210',
        address: {
          street: '1 Comic Lane',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400001',
          country: 'India',
        },
      },
      {
        name: 'Demo User',
        email: 'user@panel.com',
        password: 'user123',
        role: 'user',
        phone: '9876543211',
        address: {
          street: '42 Hero Street',
          city: 'Delhi',
          state: 'Delhi',
          zipCode: '110001',
          country: 'India',
        },
      },
    ]);
    console.log(`${users.length} users seeded (admin@panel.com / admin123, user@panel.com / user123)`);

    const createdProducts = await Product.create(products);
    console.log(`${createdProducts.length} products seeded`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();

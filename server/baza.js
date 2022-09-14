var MongoClient = require("mongodb").MongoClient;

const url = require("./config").url;
console.log(url)


MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log(err);
    throw err;
  }
  var dbo = db.db("aliexpress-clone");
  var myobj = [
    {
      productName: "Walkie Talkie Children 2 Pcs Children's Radio",
      category: "Cellphones & Telecommunications",
      subcategory: "Walkie Talkie",
      price: 9.71,
      imageUrl:
        "https://ae01.alicdn.com/kf/S07beb658bfa048adbc5c358117fca66fs/ITSOK-T388-Walkie-Talkie-Children-2-Pcs-Children-s-Radio-Two-Way-Radio-Kids-Birthday-Gift.jpg_Q90.jpg_.webp",
      quantityInStock: 345,
      orders: 104,
      rating: 2.3,
    },
    {
      productName: "1~3m Type-C USB C Charger Cable Charging",
      category: "Cellphones & Telecommunications",
      subcategory: "Mobile Phone Accessories",
      price: 3.8,
      imageUrl:
        "https://ae01.alicdn.com/kf/Hdcc35bda7b074dc7b6b7dab582cd70f00/1-3m-Type-C-USB-C-Charger-Cable-Charging-for-Samsung-Galaxy-A20-A20E-A30-A40.jpg_Q90.jpg_.webp",
      quantityInStock: 32,
      orders: 63,
      rating: 5,
    },
    {
      productName: "Protection Shockproof Clear Silicone Case",
      category: "Cellphones & Telecommunications",
      subcategory: "Mobile Phone Cases",
      price: 2.1,
      imageUrl:
        "https://ae01.alicdn.com/kf/Hd60e8c74a3994096a2ca21d47b1b63e2c/Lens-Protection-Shockproof-Phone-Cases-For-iPhone-12-11-Pro-Max-Xs-X-Xr-7-8.jpg_Q90.jpg_.webp",
      quantityInStock: 59,
      orders: 346,
      rating: 3.4,
    },
    {
      productName:
        "New Bluetooth Wireless Mouse with USB Rechargeable RGB Mouse for Computer Laptop",
      category: "Computer, Office & Security",
      subcategory: "Mouse & Keyboards",
      price: 5.3,
      imageUrl:
        "https://ae01.alicdn.com/kf/S4af9b2290c6c4f8eb0ea357b279d5e0a1/New-Bluetooth-Wireless-Mouse-with-USB-Rechargeable-RGB-Mouse-for-Computer-Laptop-PC-Macbook-Gaming-Mouse.jpg_Q90.jpg_.webp",
      quantityInStock: 100,
      orders: 346,
      rating: 4.6,
    },
    {
      productName: "2Pcs Tablet Tempered Glass Screen Protector Cover",
      category: "Computer, Office & Security",
      subcategory: "Tablet Accessories",
      price: 6.1,
      imageUrl:
        "https://ae01.alicdn.com/kf/H7fd04a8355d549ec9ee5110a66a71cbbP/2Pcs-Tablet-Tempered-Glass-Screen-Protector-Cover-for-Apple-IPad-6th-Gen-2018-9-7-Inch.jpg_Q90.jpg_.webp",
      quantityInStock: 3,
      orders: 346,
      rating: 5,
    },
    {
      productName: "Type-C Adapter TF CF SD Memory Card Reader",
      category: "Computer, Office & Security",
      subcategory: "Computer Cables & Connectors",
      price: 2.1,
      imageUrl:
        "https://ae01.alicdn.com/kf/Sc0d8e4f1d23b41e88069aadc86ced2fey/Type-C-Adapter-TF-CF-SD-Memory-Card-Reader-OTG-Writer-Compact-Flash-USB-C-for.jpg_Q90.jpg_.webp",
      quantityInStock: 1,
      orders: 126,
      rating: 2.4,
    },
    {
      productName: "VR Protective Cover For Oculus Quest 2",
      category: "Consumer Electonics",
      subcategory: "VR & AR Devices",
      price: 7.31,
      imageUrl:
        "https://ae01.alicdn.com/kf/Hd0c4e28d16e046f7a9a507cf44a50e7b1/VR-Protective-Cover-For-Oculus-Quest-2-VR-Touch-Controller-Silicone-Shell-With-Strap-Handle-Grip.jpg_Q90.jpg_.webp",
      quantityInStock: 23,
      orders: 0,
      rating: 2.4,
    },
    {
      productName:
        "Flying 3KM Professional GPS 4k FPV Drone With Good 6K Dual HD",
      category: "Consumer Electonics",
      subcategory: "Drones",
      price: 114,
      imageUrl:
        "https://ae01.alicdn.com/kf/S55639ea0cf854181920705a7f0750aa1e/Flying-3KM-Professional-GPS-4k-FPV-Drone-With-Good-6K-Dual-HD-Anti-Shake-Camera-F9.jpg_Q90.jpg_.webp",
      quantityInStock: 9,
      orders: 115,
      rating: 4.4,
    },
    {
      productName: "LED Digital Display Waterproof Electronic Smart Watch",
      category: "Consumer Electonics",
      subcategory: "Smart Watches",
      price: 3.2,
      imageUrl:
        "https://ae01.alicdn.com/kf/S11584309afe64538a55277e2fec0d954h/LED-Digital-Display-Couple-Student-Children-Universal-Watch-Waterproof-Electronic-Watch-Smart-Watch-Children-Sport-Fitness.jpg_Q90.jpg_.webp",
      quantityInStock: 483,
      orders: 34,
      rating: 3.4,
    },
    {
      productName: "5ct Moissanite Men's Ring 925 Silver",
      category: "Jewelry & Watches",
      subcategory: "Fine Jewelry",
      price: 90.2,
      imageUrl:
        "https://ae01.alicdn.com/kf/S9b2af4fe8309420bb7bd5d939c7ef1fcY/5ct-Moissanite-Men-s-Ring-925-Silver-Beautiful-Firecolour-Diamond-Substitute-luxury-wedding-rings-for-couples.jpg_Q90.jpg_.webp",
      quantityInStock: 4683,
      orders: 31,
      rating: 4.4,
    },
    {
      productName: "Luxury Rose Gold Watch Women",
      category: "Jewelry & Watches",
      subcategory: "Fashion Watches",
      price: 4.56,
      imageUrl:
        "https://ae01.alicdn.com/kf/Ucd36cb75041a4539bbdb7ce09bf663ccq/Luxury-Rose-Gold-Watch-Women-Bracelet-Watches-Top-Brand-Ladies-Casual-Quartz-Watch-Steel-Women-s.jpg_Q90.jpg_.webp",
      quantityInStock: 33,
      orders: 64,
      rating: 4.9,
    },
    {
      productName: "Wedding Engagement Ring",
      category: "Jewelry & Watches",
      subcategory: "Wedding & Engagement",
      price: 13.89,
      imageUrl:
        "https://ae01.alicdn.com/kf/H2cecd0d60e7d471a99fdc6dd359b4f63B/Classic-Gold-Color-Wedding-Ring-Tungsten-Carbide-Rings-Women-Men-Engagement-Ring-Gift-Jewelry-Dome-Polished.jpg_Q90.jpg_.webp",
      quantityInStock: 33,
      orders: 64,
      rating: 4.9,
    },
    {
      productName: "Stainless Steel Chopsticks Korean Style Metal",
      category: "Home, Pet & Appliances",
      subcategory: "Dining",
      price: 0.92,
      imageUrl:
        "https://ae01.alicdn.com/kf/Sf1aa7a7ebd934f93a9411c081c91d73eG/Stainless-Steel-Chopsticks-Korean-Style-Metal-Chopsticks-Round-Children-s-Adult-Chopsticks-Threaded-Non-slip-Handle.jpg_Q90.jpg_.webp",
      quantityInStock: 39,
      orders: 164,
      rating: 5,
    },
    {
      productName: "5 pairs of bamboo chopsticks household",
      category: "Home, Pet & Appliances",
      subcategory: "Dining",
      price: 4.71,
      imageUrl:
        "https://ae01.alicdn.com/kf/H149975497dfd4086969e273463352dc23/5-pairs-of-bamboo-chopsticks-household-long-chopsticks-family-pointy-cute-personality-bamboo-non-slip-set.jpg_Q90.jpg_.webp",
      quantityInStock: 13,
      orders: 24,
      rating: 4.3,
    },
    {
      productName: "Creative Snack Finger Chopsticks Portable",
      category: "Home, Pet & Appliances",
      subcategory: "Dining",
      price: 1.33,
      imageUrl:
        "https://ae01.alicdn.com/kf/Sf326b86f546b4d62b8eb1d4129be65d9m/Creative-Snack-Finger-Chopsticks-Portable-Potato-Chip-Tongs-Salad-Food-Clip-Easy-to-Operate-Not-Dirty.jpg_Q90.jpg_.webp",
      quantityInStock: 63,
      orders: 253,
      rating: 4.1,
    },
    {
      productName:
        "30ml Mist Facial Sprayer Steamer Humidifier USB Rechargeable",
      category: "Home, Pet & Appliances",
      subcategory: "Garden Supplies",
      price: 4.13,
      imageUrl:
        "https://ae01.alicdn.com/kf/S51ee562fe2c94cce934180a654146d732/30ml-Mist-Facial-Sprayer-Steamer-Humidifier-USB-Rechargeable-Face-Moisturizing-Nebulizer-Portable-Mini-Beauty-Skin-Care.jpg_Q90.jpg_.webp",
      quantityInStock: 63,
      orders: 253,
      rating: 4.1,
    },
    {
      productName: "Stainless Steel Hip Flask with Funnel Pocket",
      category: "Home, Pet & Appliances",
      subcategory: "Bar",
      price: 4.88,
      imageUrl:
        "https://ae01.alicdn.com/kf/H95f0a4bd70834d1899d0e08a80f9f86bV/LMETJMA-1-4-5-6-7-8-9-10-oz-Stainless-Steel-Hip-Flask-with-Funnel.jpg_Q90.jpg_.webp",
      quantityInStock: 63,
      orders: 255,
      rating: 4.6,
    },
    {
      productName: "Double Spirit Measuring Cup Cocktail",
      category: "Home, Pet & Appliances",
      subcategory: "Bar",
      price: 4.03,
      imageUrl:
        "https://ae01.alicdn.com/kf/H3cd05f14b4424881b3eaa1ab631fb861Y/Ounce-Jigger-Cocktail-Double-Short-Drink-Spirit-Mixer-Measure-Cup-For-Bar-1-oz-2-oz.jpeg_Q90.jpeg_.webp",
      quantityInStock: 589,
      orders: 3,
      rating: 4.3,
    },
    {
      productName: "Electric Egg Beater Milk Frother Egg Blender",
      category: "Home, Pet & Appliances",
      subcategory: "Kitchen",
      price: 2.77,
      imageUrl:
        "https://ae01.alicdn.com/kf/S639207241ede45c88d85c8357913ed66s/Electric-Egg-Beater-Milk-Frother-Egg-String-Whisk-Mixer-Hand-for-Coffee-Cappuccino-Creamer-Frothy-Blend.jpg_Q90.jpg_.webp",
      quantityInStock: 532,
      orders: 32,
      rating: 4.3,
    },
    {
      productName: "Chopsticks Forks Holder",
      category: "Home, Pet & Appliances",
      subcategory: "Dining",
      price: 1.16,
      imageUrl:
        "https://ae01.alicdn.com/kf/Hebe23c84dbf54d26a274d8ff19a3e1a8m/New-Chopsticks-Pillow-Chopstick-Rest-Home-Decoration-Cat-Chopsticks-Forks-Holder-Chopsticks-Holder-Spoon-Holder.jpg_Q90.jpg_.webp",
      quantityInStock: 42,
      orders: 34,
      rating: 4.4,
    },
    {
      productName: "Cupcake Muffin Paper",
      category: "Home, Pet & Appliances",
      subcategory: "Kitchen",
      price: 1.86,
      imageUrl:
        "https://ae01.alicdn.com/kf/Sa369c4c45ada487291ab8fb268694996h/100Pcs-CupCake-Cake-Mold-Muffin-Box-Oil-Proof-Paper-Holder-Cup-Case-Baking-Tools-DIY-Cake.jpg_Q90.jpg_.webp",
      quantityInStock: 23,
      orders: 44,
      rating: 4.3,
    },
    {
      productName: "6Pcs/Set Stainless Steel Ice Cream Candy Shape",
      category: "Home, Pet & Appliances",
      subcategory: "Kitchen",
      price: 3.5,
      imageUrl:
        "https://ae01.alicdn.com/kf/H29154ba9d1e642499cdd459f4dab0a42h/6Pcs-Set-Stainless-Steel-Ice-Cream-Candy-Shape-Cookie-Cutter-Mold-DIY-Fondant-Biscuit-Mould-Cake.jpg_Q90.jpg_.webp",
      quantityInStock: 852,
      orders: 4,
      rating: 4,
    },
    {
      productName: "Hotfix Stones Rhinestone Glitter Crystal",
      category: "Home, Pet & Appliances",
      subcategory: "Crafts",
      price: 2.5,
      imageUrl:
        "https://ae01.alicdn.com/kf/S9049d45c7cb0463b9f23f7d4cc570d7ax/DMC-SS6-SS30-Crystal-AB-Hotfix-Stones-Hot-Fix-Rhinestone-Glitter-Crystal-Strass-Iron-On-Rhinestones.jpg_Q90.jpg_.webp",
      quantityInStock: 83,
      orders: 9,
      rating: 4.9,
    },
    {
      productName: "3cm Disco Ball",
      category: "Home, Pet & Appliances",
      subcategory: "Arts",
      price: 2.49,
      imageUrl:
        "https://ae01.alicdn.com/kf/S999b406d68a141f690e61466cb71e0f8J/3cm-Mirror-Balls-Reflective-Glass-Ball-Disco-Xmas-Tree-Home-Festive-KTV-Party-Decoration-Ornaments-DJ.jpg_Q90.jpg_.webp",
      quantityInStock: 635,
      orders: 452,
      rating: 4.9,
    },
    {
      productName: "Metal Balls Buck Magic Cube",
      category: "Toys & Hobbies",
      subcategory: "Building & Construction Toys",
      price: 3.49,
      imageUrl:
        "https://ae01.alicdn.com/kf/Sff89d87cac144b88868e5f1c6c7b9328O/3MM-Metal-Balls-Buck-Magic-Cube-Sphere-Block-Building-Construction-Toys-Arts-Crafts-Toy.jpg_Q90.jpg_.webp",
      quantityInStock: 64,
      orders: 5,
      rating: 4.1,
    },
    {
      productName: "Lego Blocks Base",
      category: "Toys & Hobbies",
      subcategory: "Building & Construction Toys",
      price: 3.67,
      imageUrl:
        "https://ae01.alicdn.com/kf/Hc7dd3f0c481e45fc96947f73f3818c7dr/4-Size-33-Styles-Plastic-Assembly-Blocks-Base-Plates-Figures-City-Classic-Toys-Building-Blocks-Baseplates.jpg_Q90.jpg_.webp",
      quantityInStock: 22,
      orders: 22,
      rating: 4.5,
    },
    {
      productName: "Ferris Wheel Park Marble Race Run Figures Building Blocks",
      category: "Toys & Hobbies",
      subcategory: "Building & Construction Toys",
      price: 44.67,
      imageUrl:
        "https://ae01.alicdn.com/kf/H768f99ed92fc432e8c1fe92cbd87e741z/New-Ferris-Wheel-Park-Marble-Race-Run-Figures-Building-Blocks-Big-Particle-Assembly-Block-DIY-Bricks.jpg_Q90.jpg_.webp",
      quantityInStock: 6,
      orders: 42,
      rating: 4.4,
    },
    {
      productName: "Seamless Yoga Leggings",
      category: "Outdoor, Fun & Sports",
      subcategory: "Sports & Entertainment",
      price: 7.32,
      imageUrl:
        "https://ae01.alicdn.com/kf/S345be03184eb4f28815fe5fde23631adc/Seamless-Yoga-Leggings-Women-High-Waist-Push-Up-Legging-Peach-Buttocks-Workout-Tights-Gym-Sport-Ladies.jpg_Q90.jpg_.webp",
      quantityInStock: "66",
      orders: 63,
      rating: 4.7,
    },
    {
      productName: "1pcs Golf Ball Line Liner Ball Marking",
      category: "Outdoor, Fun & Sports",
      subcategory: "Sports & Entertainment",
      price: 4.67,
      imageUrl:
        "https://ae01.alicdn.com/kf/Saeeca60e902c4fd19c284759cc4699c8u/1pcs-Golf-Ball-Line-Liner-Ball-Marking-Golf-Alignment-Kit-Easy-Ball-Liner-Drawing-Alignment-Putting.jpg_Q90.jpg_.webp",
      quantityInStock: 6,
      orders: 42,
      rating: 4.4,
    },
    {
      productName: "Pool Noodle Flexible Fun Swimming Foam",
      category: "Outdoor, Fun & Sports",
      subcategory: "Sports & Entertainment",
      price: 1.29,
      imageUrl:
        "https://ae01.alicdn.com/kf/S760e1b697ec64d32822a5eb2a9310c696/Pool-Noodle-Flexible-Fun-Swimming-Foam-Kids-Adult-Float-Swim-Aid-Portable-Tool-Bright-Color-Buoyancy.jpg_Q90.jpg_.webp",
      quantityInStock: 88,
      orders: 432,
      rating: 4,
    },
    {
      productName: "Floating Underwater Light RGB Submersible LED Disco Light",
      category: "Tools & Home Improvement",
      subcategory: "Lights & Lightning",
      price: 5.65,
      imageUrl:
        "https://ae01.alicdn.com/kf/HTB1Qqe4elWD3KVjSZFsq6AqkpXaV/Floating-Underwater-Light-RGB-Submersible-LED-Disco-Light-Glow-Show-Swimming-Pool-Hot-Tub-Spa-Lamp.jpg_Q90.jpg_.webp",
      quantityInStock: 43,
      orders: 42,
      rating: 4.9,
    },
    {
      productName: "Led Strip Light RGB",
      category: "Tools & Home Improvement",
      subcategory: "Lights & Lightning",
      price: 9.52,
      imageUrl:
        "https://ae01.alicdn.com/kf/S60ada6c7a431468a891e95d4cc3c4ed2F/10M-5M-Led-Strip-Light-RGB-Infrared-Bluetooth-ontroller-luces-Luminous-Decoration-For-Living-Room-5050.jpg_Q90.jpg_.webp",
      quantityInStock: 866,
      orders: 2,
      rating: 4,
    },
    {
      productName: "Curtain LED String Lights",
      category: "Tools & Home Improvement",
      subcategory: "Lights & Lightning",
      price: 6.21,
      imageUrl:
        "https://ae01.alicdn.com/kf/S9dfef2a952d24170b753034aa69048bbz/Curtain-LED-String-Lights-Christmas-Decoration-3m-Remote-Control-Holiday-Wedding-Fairy-Garland-Lights-for-Bedroom.jpg_Q90.jpg_.webp",
      quantityInStock: 200,
      orders: 100,
      rating: 4.9,
    },
  ];
  dbo.collection("products").insertMany(myobj, function (err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});

const sampleListings = [
  {
    owner: "655140bf03e7d6a54e4808cf",
    title: "ExpressIN Hotel",
    description:
      "A stylish urban stay located in the heart of the city's nightlife and attractions.",
    image: {
      filename: "hotel.jpg",
      url: "/images/listings/hotel.jpg",
    },
    price: 1500,
    location: {
      city: "Nashik",
      lat: 20.0110,
      lng: 73.7900,
      address: "Pathardi Phata, Nashik",
    },
    country: "India",
    category: ["Hotels", "Iconic cities"],
  },
  {
    owner: "655140bf03e7d6a54e4808cf",
    title: "Courtyard Stay",
    description: "Comfortable mid-range lodging with a lovely courtyard and breakfast included.",
    image: {
      filename: "courtyard.jpeg",
      url: "/images/listings/courtyard.jpeg",
    },
    price: 900,
    location: {
      city: "Pune",
      lat: 18.5204,
      lng: 73.8567,
      address: "FC Road, Pune",
    },
    country: "India",
    category: ["Hotels", "Rooms"],
  },
  {
    owner: "655140bf03e7d6a54e4808cf",
    title: "Heritage Homestay",
    description: "A charming homestay in a historic neighborhood — warm hosts and home-cooked meals.",
    image: {
      filename: "heritage-home.jpg",
      url: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?w=800&auto=format&fit=crop",
    },
    price: 700,
    location: {
      city: "Aurangabad",
      lat: 19.8762,
      lng: 75.3433,
      address: "CIDCO, Aurangabad",
    },
    country: "India",
    category: ["House", "Rooms"],
  },
  {
    owner: "655140bf03e7d6a54e4808cf",
    title: "Seaside Villa",
    description: "Bright villa near the sea with private terrace and easy beach access.",
    image: {
      filename: "beach-villa.jpg",
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&auto=format&fit=crop",
    },
    price: 2500,
    location: {
      city: "Alibaug",
      lat: 18.6416,
      lng: 72.8760,
      address: "Alibaug Beach Road",
    },
    country: "India",
    category: ["House", "Beachfront"],
  },
  {
    owner: "655140bf03e7d6a54e4808cf",
    title: "Mountain View Cabin",
    description: "Cozy cabin with mountain views — ideal for a weekend escape from the city.",
    image: {
      filename: "mountain-cabin.jpg",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop",
    },
    price: 1200,
    location: {
      city: "Mahabaleshwar",
      lat: 17.9231,
      lng: 73.6531,
      address: "Strawberry Valley, Mahabaleshwar",
    },
    country: "India",
    category: ["Cottage", "Mountains"],
  },
  {
    owner: "655140bf03e7d6a54e4808cf",
    title: "Riverside Bungalow",
    description: "Peaceful bungalow by the river with gardens and outdoor seating.",
    image: {
      filename: "riverside-home.jpg",
      url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&auto=format&fit=crop",
    },
    price: 1800,
    location: {
      city: "Lonavala",
      lat: 18.7500,
      lng: 73.4000,
      address: "Khandala Road, Lonavala",
    },
    country: "India",
    category: ["House", "Mountains"],
  },
  {
    owner: "655140bf03e7d6a54e4808cf",
    title: "City Centre Studio",
    description: "Compact, well-appointed studio apartment in the city center — great for business travelers.",
    image: {
      filename: "city-apartment.jpg",
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
    },
    price: 1100,
    location: {
      city: "Mumbai",
      lat: 19.0760,
      lng: 72.8777,
      address: "Marine Drive, Mumbai",
    },
    country: "India",
    category: ["Flats", "Iconic cities"],
  },
  {
    owner: "655140bf03e7d6a54e4808cf",
    title: "Royal Palace Hotel",
    description: "Experience the grandeur of royal heritage in this converted palace hotel with stunning architecture.",
    image: {
      filename: "palace-hotel.jpg",
      url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop",
    },
    price: 5500,
    location: {
      city: "Udaipur",
      lat: 24.5854,
      lng: 73.7125,
      address: "Lake Palace Road, Udaipur",
    },
    country: "India",
    category: ["Hotels", "Castles"]
  },
  {
    owner: "655140bf03e7d6a54e4808cf",
    title: "Beach Paradise Resort",
    description: "Luxurious beachfront resort with private beach access and infinity pools overlooking the Arabian Sea.",
    image: {
      filename: "beach-resort.jpg",
      url: "https://images.unsplash.com/photo-1578530332818-6ba472e67b9f?w=800&auto=format&fit=crop",
    },
    price: 4500,
    location: {
      city: "Goa",
      lat: 15.4989,
      lng: 73.8278,
      address: "Calangute Beach Road, Goa",
    },
    country: "India",
    category: ["Hotels", "Amazing pools"]
  },
  {
    owner: "655140bf03e7d6a54e4808cf",
    title: "Himalayan Retreat",
    description: "Peaceful mountain lodge with panoramic views of the Himalayas and luxury wellness facilities.",
    image: {
      filename: "mountain-retreat.jpg",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop",
    },
    price: 3800,
    location: {
      city: "Manali",
      lat: 32.2396,
      lng: 77.1887,
      address: "Old Manali Road",
    },
    country: "India",
    category: ["House", "Mountains"]
  },
  {
    owner: "655140bf03e7d6a54e4808cf",
    title: "Desert Camp Resort",
    description: "Luxury desert camping experience with traditional entertainment and modern amenities.",
    image: {
      filename: "desert-camp.jpg",
      url: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800&auto=format&fit=crop",
    },
    price: 2800,
    location: {
      city: "Jaisalmer",
      lat: 26.9157,
      lng: 70.9083,
      address: "Sam Sand Dunes",
    },
    country: "India",
    category: ["Camping", "Amazing pools"]
  },
  // Add three hotels (Mumbai, Pune, Nashik)
  {
    owner: "655140bf03e7d6a54e4808cf",
    title: "StayVista Villa",
    description: "A centrally located hotel in Mumbai with comfortable rooms and quick access to major business districts.",
    image: {
      filename: "StayVista.jpg",
      url: "/images/listings/StayVista.jpg",
    },
    price: 3200,
    location: {
      city: "Mumbai",
      lat: 19.0760,
      lng: 72.8777,
      address: "Andheri East, Mumbai",
    },
    country: "India",
    category: ["Hotels", "Iconic cities"]
  },
  {
    owner: "655140bf03e7d6a54e4808cf",
    title: "Pune Central Suites",
    description: "Business-friendly hotel in Pune with modern amenities and conference facilities.",
    image: {
      filename: "PUNE.jpg",
      url: "/images/listings/PUNE.jpG",
    },
    price: 2100,
    location: {
      city: "Pune",
      lat: 18.5204,
      lng: 73.8567,
      address: "Koregaon Park, Pune",
    },
    country: "India",
    category: ["Hotels", "Rooms"]
  },
  {
    owner: "655140bf03e7d6a54e4808cf",
    title: "Nashik Riverside Hotel",
    description: "Comfortable riverside hotel in Nashik ideal for leisure and pilgrimage visitors.",
    image: {
      filename: "Mumbai.png",
      url: "/images/listings/Mumbai.png",
    },
    price: 1700,
    location: {
      city: "Nashik",
      lat: 20.0110,
      lng: 73.7900,
      address: "Mall Road, Nashik",
    },
    country: "India",
    category: ["Hotels", "House"]
  }
];

module.exports = { data: sampleListings };
export interface Game {
  id: string;
  title: string;
  genre: string;
  releaseYear: number;
  coverUrl: string;
  bannerUrl: string;
  rating: number;
  rentPrices: {
    primary: number;
    secondary: number;
  };
  buyPrice: number;
  isNewRelease: boolean;
  isAvailable: boolean;
  description: string;
  developer: string;
}

export const PS5_GAMES: Game[] = [
  {
    id: "007-first-light",
    title: "007 First Light",
    genre: "Action Adventure",
    releaseYear: 2025,
    coverUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBjKn3EOiE_eI4HFDKUJbRGk2AId4vgZMGboPo-hRl-80nZawTuzogBRH0vGfvtCTBqniV&s=10",
    bannerUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBjKn3EOiE_eI4HFDKUJbRGk2AId4vgZMGboPo-hRl-80nZawTuzogBRH0vGfvtCTBqniV&s=10",
    rating: 4.8,
    rentPrices: {
      primary: 900,
      secondary: 800
    },
    buyPrice: 4299,
    isNewRelease: true,
    isAvailable: true,
    description: "Step into the shoes of the iconic MI6 agent in a thrilling new origin story. Experience intense espionage, cutting-edge gadgets, and high-octane action in 007's first major mission.",
    developer: "IO Interactive"
  },
  {
    id: "black-myth-wukong",
    title: "Black Myth: Wukong",
    genre: "Action RPG",
    releaseYear: 2024,
    coverUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0T25dto3Q-J7wGDOSRbgLbE5v5Nht1EdTenquChhFrj_vU17SREeDJpPAE_d7DHkbh80VKA&s=10",
    bannerUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0T25dto3Q-J7wGDOSRbgLbE5v5Nht1EdTenquChhFrj_vU17SREeDJpPAE_d7DHkbh80VKA&s=10",
    rating: 4.9,
    rentPrices: {
      primary: 900,
      secondary: 800
    },
    buyPrice: 4799,
    isNewRelease: true,
    isAvailable: false,
    description: "An action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels ahead, to uncover the obscured truth beneath the veil of a glorious legend from the past.",
    developer: "Game Science"
  },
  {
    id: "spiderman-2",
    title: "Marvel's Spider-Man 2",
    genre: "Action / Adventure",
    releaseYear: 2023,
    coverUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM9p4WJqz6tCwSBy2ky-Jwo8dTHUbicJ_kAXqYRasbcVPDw6Gsq-rdvGdMW6zMyNmX9nC_&s=10",
    bannerUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM9p4WJqz6tCwSBy2ky-Jwo8dTHUbicJ_kAXqYRasbcVPDw6Gsq-rdvGdMW6zMyNmX9nC_&s=10",
    rating: 4.8,
    rentPrices: {
      primary: 900,
      secondary: 800
    },
    buyPrice: 4299,
    isNewRelease: false,
    isAvailable: false,
    description: "Spider-Men Peter Parker and Miles Morales return for an exciting new adventure in the critically acclaimed Marvel's Spider-Man franchise on PS5.",
    developer: "Insomniac Games"
  },
  {
    id: "elden-ring-shadow",
    title: "Elden Ring: Shadow of the Erdtree",
    genre: "Action RPG",
    releaseYear: 2024,
    coverUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe9Ym7iEhMAcojAkMFhF34QEuCU1Uks_oYHnODv9s5-TXxVrijSQ1FJ7qo9O9XyfIZepVs&s=10",
    bannerUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe9Ym7iEhMAcojAkMFhF34QEuCU1Uks_oYHnODv9s5-TXxVrijSQ1FJ7qo9O9XyfIZepVs&s=10",
    rating: 4.9,
    rentPrices: {
      primary: 900,
      secondary: 800
    },
    buyPrice: 4999,
    isNewRelease: true,
    isAvailable: false,
    description: "Guided by Empyrean Miquella, players are beckoned to the Land of Shadow, a place obscured by the Erdtree where the goddess Marika first set foot.",
    developer: "FromSoftware"
  },
  {
    id: "fc-25",
    title: "EA Sports FC 25",
    genre: "Sports",
    releaseYear: 2024,
    coverUrl: "https://i.ytimg.com/vi/pBM2xyco_Kg/maxresdefault.jpg",
    bannerUrl: "https://i.ytimg.com/vi/pBM2xyco_Kg/maxresdefault.jpg",
    rating: 4.6,
    rentPrices: {
      primary: 900,
      secondary: 800
    },
    buyPrice: 4599,
    isNewRelease: true,
    isAvailable: false,
    description: "EA SPORTS FC 25 gives you more ways to win for the club. Team up with 5v5 Rush, a new way to play with friends in Football Ultimate Team, Clubs, and Kick-Off.",
    developer: "EA Sports"
  },
  {
    id: "silent-hill-2",
    title: "Silent Hill 2",
    genre: "Horror / Thriller",
    releaseYear: 2024,
    coverUrl: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2124490/capsule_616x353.jpg?t=1744248682",
    bannerUrl: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2124490/capsule_616x353.jpg?t=1744248682",
    rating: 4.8,
    rentPrices: {
      primary: 900,
      secondary: 800
    },
    buyPrice: 3999,
    isNewRelease: true,
    isAvailable: false,
    description: "Having received a letter from his deceased wife, James heads to where they shared so many memories, in the hope of seeing her one more time: Silent Hill.",
    developer: "Bloober Team / Konami"
  },
  {
    id: "god-of-war-ragnarok",
    title: "God of War Ragnarök",
    genre: "Action Adventure",
    releaseYear: 2022,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/e/ee/God_of_War_Ragnar%C3%B6k_cover.jpg",
    bannerUrl: "https://upload.wikimedia.org/wikipedia/en/e/ee/God_of_War_Ragnar%C3%B6k_cover.jpg",
    rating: 4.9,
    rentPrices: {
      primary: 900,
      secondary: 800
    },
    buyPrice: 3499,
    isNewRelease: false,
    isAvailable: false,
    description: "Embark on an epic and heartfelt journey as Kratos and Atreus struggle with holding on and letting go, venturing into each of the Nine Realms.",
    developer: "Santa Monica Studio"
  },
  {
    id: "stellar-blade",
    title: "Stellar Blade",
    genre: "Action Adventure",
    releaseYear: 2024,
    coverUrl: "https://image.api.playstation.com/vulcan/ap/rnd/202506/0306/e4ce35ce1e57ed134929079671cacad34b8e1705bfa35b1d.png",
    bannerUrl: "https://image.api.playstation.com/vulcan/ap/rnd/202506/0306/e4ce35ce1e57ed134929079671cacad34b8e1705bfa35b1d.png",
    rating: 4.7,
    rentPrices: {
      primary: 900,
      secondary: 800
    },
    buyPrice: 4499,
    isNewRelease: true,
    isAvailable: false,
    description: "Save humanity from extinction in a breathtaking sci-fi action adventure, starring Eve, a warrior dispatched from an off-orbit Colony to reclaim Earth.",
    developer: "Shift Up / Sony Interactive Ent."
  },
  {
    id: "final-fantasy-vii-rebirth",
    title: "Final Fantasy VII Rebirth",
    genre: "RPG",
    releaseYear: 2024,
    coverUrl: "https://i.ytimg.com/vi/1bzWvyncQh8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA5zpTrgWcWlaKz8oWS4iU09GUg1g",
    bannerUrl: "https://i.ytimg.com/vi/1bzWvyncQh8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA5zpTrgWcWlaKz8oWS4iU09GUg1g",
    rating: 4.8,
    rentPrices: {
      primary: 900,
      secondary: 800
    },
    buyPrice: 4899,
    isNewRelease: true,
    isAvailable: false,
    description: "The journey into the unknown continues. After escaping from the dystopian city of Midgar, Cloud and his friends set out on a journey across planet-spanning landscapes.",
    developer: "Square Enix"
  }
];

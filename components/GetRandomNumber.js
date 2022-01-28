export default function GetRandomNumber() {
  const URLs = [
    "https://i0.wp.com/www.toppapeldeparede.com.br/wp-content/uploads/2021/04/50-Minimalist-Desktop-Wallpapers-and.png?fit=1200%2C675&ssl=1",
    "https://wallpaperaccess.com/full/84248.png",
    "https://www.pixel4k.com/wp-content/uploads/2019/03/scenery-digital-art-4k_1551642030.jpg",
    "https://images.hdqwalls.com/download/my-secret-alone-time-sea-shore-clouds-silence-digital-art-4k-5l-3840x2400.jpg",
    "https://wallpaperaccess.com/full/1127017.jpg",
    "https://images.hdqwalls.com/wallpapers/sky-blue-clouds-digital-art-4k-pc.jpg",
    "https://wallpaperaccess.com/full/3997508.jpg",
    "https://cdn.wallpapersafari.com/86/45/fv3WCq.jpg",
    "https://images.wallpapersden.com/image/download/cyrodiil-pixel-art_a2loameUmZqaraWkpJRobWllrWdma2U.jpg"
  ];
  
  const randomNumber = Math.floor(Math.random() * URLs.length) - 1;

  const randomBackground = URLs[randomNumber];

  return randomBackground;
} 
import { useState } from "react";

import { useEffect } from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Footer from "./footer";

export default function Main() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Liste d'images aléatoires (à remplacer par vos propres images)
  const images = [
    "https://picsum.photos/800/400?random=1",
    "https://picsum.photos/800/400?random=2",
    "https://picsum.photos/800/400?random=3",
    "https://picsum.photos/800/400?random=4",
    "https://picsum.photos/800/400?random=5",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[384px]">
      <div className="relative h-full bg-[#3a3c49]">
        <img
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />

        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          <button className="w-8 h-8 rounded-full bg-black/33 flex items-center justify-center">
            <Facebook className="w-4 h-4 text-white" />
          </button>
          <button className="w-8 h-8 rounded-full bg-black/33 flex items-center justify-center">
            <Twitter className="w-4 h-4 text-white" />
          </button>
          <button className="w-8 h-8 rounded-full bg-black/33 flex items-center justify-center">
            <Instagram className="w-4 h-4 text-white" />
          </button>
          <button className="w-8 h-8 rounded-full bg-black/33 flex items-center justify-center">
            <Youtube className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentImageIndex ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

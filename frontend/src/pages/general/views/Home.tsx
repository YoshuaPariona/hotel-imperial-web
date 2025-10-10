import React, { useState, useRef, useEffect } from 'react';
import LogoSection from '../components/LogoSection';
import NavButton from '../components/NavButton';

const videos = [
  '/videos/video1.webm',
  '/videos/video2.webm',
  '/videos/video3.webm'
];

const Home: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnded = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(error => console.error("Error al reproducir el video:", error));
    }
  }, [currentVideoIndex]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black select-none">
      {/* Video de fondo */}
      <video
        ref={videoRef}
        autoPlay
        loop={videos.length === 1}
        muted
        playsInline
        onEnded={handleVideoEnded}
        className="absolute z-0 w-auto h-auto min-w-full min-h-full max-w-none object-cover"
      >
        <source src={videos[currentVideoIndex]} type="video/webm" />
        Tu navegador no soporta el elemento de video.
      </video>

      {/* Capa oscura para mejorar contraste */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Contenido principal */}
      <div className="relative z-10 flex justify-center items-center h-full px-5 md:px-10">
        {/* Contenedor para botones y logo */}
        <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-6xl space-y-10 md:space-y-0 md:space-x-20">
          {/* Botones de navegación */}
          <div className="flex flex-col space-y-6 md:space-y-8">
            <div className="md:ml-40">
              <NavButton text="PROCESOS DECISIVOS" to="/procesos-generales" />
            </div>
            <div className="self-center">
              <NavButton text="PROCESOS MISIONALES" to="/procesos-misionales" />
            </div>
            <div className="md:ml-40">
              <NavButton text="PROCESOS DE APOYO" to="/procesos-soporte" />
            </div>
          </div>
          {/* Logo */}
          <LogoSection />
        </div>
      </div>
    </div>
    );
};

export default Home;

import { useState, useRef, useEffect } from 'react';
import LogoSection from '../components/LogoSection';
import NavButton from '../components/NavButton';
import PerfilButton from '../components/PerfilButton';
import PerfilView from '../components/PerfilView';

const videos = [
  '/videos/video1.webm',
  '/videos/video2.webm',
  '/videos/video3.webm'
];

const Home: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showPerfil, setShowPerfil] = useState(false);
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

      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Botón de perfil */}
      <div className="absolute top-4 right-4 z-20">
        <PerfilButton
          isOpen={showPerfil}
          onToggle={() => setShowPerfil(!showPerfil)}
        />
      </div>

      {/* Contenido principal */}
      {!showPerfil && (
        <div className="relative z-10 flex justify-center items-center h-full px-5 md:px-10 transition-all duration-500 opacity-100">
          <div className="flex flex-row justify-center items-center w-full max-w-6xl gap-2">
            <div className="flex flex-col space-y-4">
              <NavButton text="PROCESOS DECISIVOS" to="/procesos-generales" />
              <NavButton text="PROCESOS MISIONALES" to="/procesos-misionales" />
              <NavButton text="PROCESOS DE APOYO" to="/procesos-soporte" />
            </div>
            <div className="w-1/4 scale-125">
              <LogoSection />
            </div>
          </div>
        </div>   
      )}

      {/* Vista de perfil */}
      {showPerfil && <PerfilView onClose={() => setShowPerfil(false)} />}
    </div>
  );
};

export default Home;

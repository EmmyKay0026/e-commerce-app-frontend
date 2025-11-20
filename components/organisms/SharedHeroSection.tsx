// components/Hero.tsx
import React from "react";

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  backgroundImage = "/hero-industrialmart.webp", // Default image
}) => {
  return (
    <section
      aria-label={`${title} hero`}
      className="relative h-[40vh] flex flex-col items-center justify-center text-center w-full px-4"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center top 20%",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(8,97,193,0.75)] to-[rgba(0,0,0,0.4)]"></div>

      {/* Text */}
      <div className="relative z-10 max-w-4xl mx-auto text-white px-6 md:px-8 lg:px-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">{title}</h1>
        {subtitle && (
          <p className="text-base md:text-lg max-w-3xl mx-auto">{subtitle}</p>
        )}
      </div>
    </section>
  );
};

export default Hero;
    
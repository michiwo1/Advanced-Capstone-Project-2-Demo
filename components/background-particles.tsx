'use client';

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

export const BackgroundParticles = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      className="absolute inset-0"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "#ffffff",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: false,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
          },
          modes: {
            push: {
              quantity: 3,
            },
            repulse: {
              distance: 150,
              duration: 0.4,
              speed: 1,
              factor: 100,
              easing: "ease-out-quad"
            }
          },
        },
        particles: {
          color: {
            value: ["#0047AB", "#1E3A8A", "#2563EB"],
          },
          links: {
            color: "#0047AB",
            distance: 200,
            enable: true,
            opacity: 0.3,
            width: 1,
            triangles: {
              enable: false
            }
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "out",
              top: "out",
              bottom: "out",
              left: "out",
              right: "out"
            },
            random: true,
            speed: 2,
            straight: false,
          },
          number: {
            value: 120,
            density: {
              enable: true,
              area: 1200
            }
          },
          opacity: {
            value: { min: 0.5, max: 0.9 },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.3
            }
          },
          shape: {
            type: ["char", "circle"],
            options: {
              char: [
                {
                  value: ["const", "let", "var", "function", "class", "if", "for", "while", "return", "import", "export", "=>", "{}", "[]", "</>", "&&", "||", "===", "!==", "+=", "++"],
                  font: "Consolas",
                  style: "",
                  weight: "400",
                  fill: true
                },
                {
                  value: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "Java", "SQL"],
                  font: "Consolas",
                  style: "",
                  weight: "600",
                  fill: true
                }
              ]
            }
          },
          size: {
            value: { min: 8, max: 15 },
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 6,
              sync: false
            }
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.02,
              opacity: 1,
              color: {
                value: ["#0047AB", "#1E3A8A"]
              }
            }
          }
        },
        detectRetina: true,
      }}
    />
  );
}; 
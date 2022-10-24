
import Link from 'next/link';
import Particles from "react-tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
export default function ParticlesCustom(props : any){
    const particlesInit = useCallback(async (engine) => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
      }, []);
    
      const particlesLoaded = useCallback(async (container) => {
        console.log(container);
      }, []);
    return <>
    <Particles
      className='-z-999'
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
    
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "attract",
            },
            onHover: {
              enable: true,
              mode: "attract",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#0000FF",
          },

          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1000,
            },
            value: 80,
          },
          opacity: {
            value: 1,
          },
          shape: {
            type:["circle", "image"],
            stroke: {
                width: 0,
                color: "#000000",
            },

            "image":{
                "src":"https://s2.loli.net/2022/10/22/zKCikf61jyD7Iwd.png",
            }
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        
        detectRetina: true,
      }}
    />
    
    </>

}

//https://s2.loli.net/2022/10/22/fdlpPCNRTuAawmn.png
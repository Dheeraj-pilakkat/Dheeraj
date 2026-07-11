"use client";
import React, { useEffect, useRef } from "react";
import { portfolioContent } from "@/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

// WebGL Raymarched Metaballs Component for Photorealistic 3D Fluid
function LiquidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize WebGL context with alpha channel for clean background composition
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    // Pass-through Vertex Shader
    const vsSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Advanced Raymarching Specular Fluid Fragment Shader
    const fsSource = `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 uResolution;
      uniform float uTime;
      uniform vec4 uSpheres[5]; // Array of [x, y, z, radius]

      // Metaball Density Field Equation
      float map(vec3 p) {
        float sum = 0.0;
        for (int i = 0; i < 5; i++) {
          vec3 center = uSpheres[i].xyz;
          float radius = uSpheres[i].w;
          vec3 diff = p - center;
          float d2 = dot(diff, diff);
          if (d2 > 0.001) {
            sum += (radius * radius) / d2;
          }
        }
        return 1.0 - sum; // Surface is at sum = 1.0
      }

      // Estimate surface normal vector using finite difference method
      vec3 getNormal(vec3 p) {
        vec2 e = vec2(0.002, 0.0);
        return normalize(vec3(
          map(p + e.xyy) - map(p - e.xyy),
          map(p + e.yxy) - map(p - e.yxy),
          map(p + e.yyx) - map(p - e.yyx)
        ));
      }

      void main() {
        // Normalize screen coordinates
        vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
        
        // Ray definitions (Orthographic camera for flat grid mapping)
        vec3 ro = vec3(uv * 4.0, 4.0);
        vec3 rd = vec3(0.0, 0.0, -1.0);
        
        float t = 0.0;
        bool hit = false;
        vec3 p;
        
        // Conservative Raymarching Loop
        for (int i = 0; i < 60; i++) {
          p = ro + rd * t;
          float d = map(p);
          if (d < 0.01) {
            hit = true;
            break;
          }
          t += d * 0.18; // Step along ray
          if (t > 8.0) break;
        }
        
        vec4 finalColor = vec4(0.0);
        
        if (hit) {
          vec3 normal = getNormal(p);
          
          // Light configuration
          vec3 lightPos = vec3(1.8, 3.0, 4.5);
          vec3 lightDir = normalize(lightPos - p);
          vec3 viewDir = normalize(ro - p);
          vec3 halfDir = normalize(lightDir + viewDir);
          
          // Shading parameters
          float diff = max(dot(normal, lightDir), 0.0);
          float spec = pow(max(dot(normal, halfDir), 0.0), 90.0); // Super sharp shiny gloss
          float rim = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.5); // Rim highlight glowing edge
          
          // Base fluid tint (vibrant brand orange)
          vec3 baseColor = vec3(1.0, 0.35, 0.0);
          
          // Combine lighting layers
          vec3 diffuseCol = baseColor * (diff * 0.75 + 0.25);
          vec3 specularCol = vec3(1.0, 0.95, 0.9) * spec * 2.2;
          vec3 rimCol = vec3(1.0, 0.55, 0.15) * rim * 1.0;
          
          vec3 resultColor = diffuseCol + specularCol + rimCol;
          resultColor *= exp(-0.1 * t); // Depth shading (darker towards the back)
          
          finalColor = vec4(resultColor, 1.0);
        }
        
        gl_FragColor = finalColor;
      }
    `;

    // Helper functions to compile and link shader program
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad geometry (Full screen)
    const vertices = new Float32Array([
      -1, -1,  1, -1, -1,  1,
      -1,  1,  1, -1,  1,  1
    ]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    // Uniform location references
    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uSpheres = gl.getUniformLocation(program, "uSpheres");

    // Spheres setup: [x, y, z, radius, targetX, targetY, speedX, speedY, offset]
    const spheres = [
      { x: -0.8, y: 0.3, z: 0.0, r: 0.55, vx: 0.003, vy: 0.002 },
      { x: 0.8, y: -0.3, z: 0.2, r: 0.65, vx: -0.002, vy: 0.003 },
      { x: -0.4, y: -0.6, z: -0.2, r: 0.45, vx: 0.002, vy: -0.003 },
      { x: 0.4, y: 0.6, z: 0.1, r: 0.5, vx: -0.003, vy: -0.002 },
      { x: 0.0, y: 0.0, z: 0.3, r: 0.7 } // Interactive mouse sphere
    ];

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const aspect = rect.width / rect.height;
      // Map screen space cursor position to 3D WebGL coordinates
      targetMouseX = ((e.clientX - rect.left) / rect.width) * 4.0 * aspect - 2.0 * aspect;
      targetMouseY = -(((e.clientY - rect.top) / rect.height) * 4.0 - 2.0);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Initialize mouse to center
    const initMouse = () => {
      targetMouseX = 0;
      targetMouseY = 0;
      mouseX = 0;
      mouseY = 0;
    };
    initMouse();

    // Resize viewport
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        gl.viewport(0, 0, rect.width, rect.height);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    // Render loop
    let animationId: number;
    const startTime = Date.now();

    const render = () => {
      resize();

      const time = (Date.now() - startTime) * 0.001;
      gl.uniform1f(uTime, time);
      gl.uniform2f(uResolution, canvas.width, canvas.height);

      const aspect = canvas.width / canvas.height;

      // Update spheres positions
      spheres.forEach((s, idx) => {
        if (idx < 4) {
          // Automatic drifting
          s.x += s.vx!;
          s.y += s.vy!;
          // Bounce checks
          const maxX = 1.6 * aspect;
          const maxY = 1.3;
          if (Math.abs(s.x) > maxX) {
            s.vx! *= -1;
            s.x = Math.sign(s.x) * maxX;
          }
          if (Math.abs(s.y) > maxY) {
            s.vy! *= -1;
            s.y = Math.sign(s.y) * maxY;
          }
        } else {
          // Smooth viscous mouse drag interpolation
          mouseX += (targetMouseX - mouseX) * 0.045;
          mouseY += (targetMouseY - mouseY) * 0.045;
          s.x = mouseX;
          s.y = mouseY;
        }
      });

      // Bundle sphere properties into uniform array
      const uniformData = new Float32Array(20);
      spheres.forEach((s, idx) => {
        const offset = idx * 4;
        uniformData[offset] = s.x;
        uniformData[offset + 1] = s.y;
        uniformData[offset + 2] = s.z;
        uniformData[offset + 3] = s.r;
      });

      gl.uniform4fv(uSpheres, uniformData);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40 bg-[#0A0A0A]" 
    />
  );
}

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Big closing title clip-path wipe reveal
      gsap.fromTo(
        headlineRef.current,
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          y: 60,
        },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
          y: 0,
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      // Contact elements reveal
      gsap.fromTo(
        ".contact-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="contact" 
      ref={containerRef} 
      className="relative py-16 md:py-24 w-full select-none border-t border-white/5 overflow-hidden bg-[#0A0A0A]"
    >
      {/* 3D Realistic Liquid WebGL Canvas Background */}
      <LiquidCanvas />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 w-full flex flex-col items-start">
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-accent mb-4 contact-reveal">
          Get In Touch
        </span>

        {/* Large Closing Headline */}
        <h2
          ref={headlineRef}
          className="text-[11vw] md:text-[8vw] font-serif font-light text-accent leading-tight tracking-tight mb-6 md:mb-8 will-change-transform"
        >
          {portfolioContent.contact.headline}
          <span className="text-accent">.</span>
        </h2>

        {/* Subheadline and Email link */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mt-2">
          <div className="lg:col-span-6 contact-reveal">
            <p className="text-base md:text-lg font-light leading-relaxed text-zinc-400 font-sans tracking-wide max-w-md">
              {portfolioContent.contact.subheadline}
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col items-start lg:items-end justify-center contact-reveal">
            <a
              href={`mailto:${portfolioContent.contact.email}`}
              className="group relative text-xl sm:text-2xl md:text-4xl lg:text-5xl font-serif text-zinc-200 hover:text-accent transition-colors duration-300 pb-2 flex items-center gap-2 flex-wrap break-all"
            >
              <span>{portfolioContent.contact.email}</span>
              <ArrowUpRight className="h-6 w-6 md:h-8 md:w-8 text-zinc-500 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" />
              
              {/* Elegant Hover Underline Line */}
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 origin-left scale-x-0 group-hover:scale-x-100 group-hover:bg-accent/60 transition-transform duration-500 ease-out" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

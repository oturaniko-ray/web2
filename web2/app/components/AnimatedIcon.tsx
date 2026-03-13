// app/components/AnimatedIcon.tsx
import React from 'react';

type AnimationDef = {
  initial?: Record<string, any>;
  animate?: Record<string, any>;
  transition?: Record<string, any>;
};

type Props = {
  name?: string;
  size?: number;
  animation?: string;
  className?: string;
};

const animations: Record<string, AnimationDef> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 }
  },
  slideUp: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35 }
  },
  pop: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.25 }
  }
};

export default function AnimatedIcon({
  name = '★',
  size = 16,
  animation = 'fade',
  className
}: Props) {
  // Tomar la definición y proteger el acceso a transition
  const anim = animations[animation] ?? animations.fade;
  const initial = anim.initial ?? {};
  const animate = anim.animate ?? {};
  const transition = (anim as AnimationDef).transition ?? {};

  // No dependemos de framer-motion aquí para evitar errores de tipado en build.
  // Aplicamos estilos inline simples que reflejan la intención de la animación.
  const baseStyle: React.CSSProperties = {
    display: 'inline-block',
    width: size,
    height: size,
    lineHeight: `${size}px`,
    textAlign: 'center',
    transition: Object.keys(transition).length
      ? `all ${transition.duration ?? 0.25}s ${transition.easing ?? 'ease'}`
      : undefined,
    transform: initial.scale ? `scale(${initial.scale})` : undefined,
    opacity: initial.opacity ?? 1,
    transformOrigin: 'center'
  };

  // Cuando el componente se monta, aplicamos el estado "animate" con una pequeña delay
  // para simular la animación sin depender de librerías externas.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    const id = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(id);
  }, []);

  const appliedStyle: React.CSSProperties = {
    ...baseStyle,
    opacity: mounted ? (animate.opacity ?? baseStyle.opacity) : baseStyle.opacity,
    transform: mounted
      ? animate.scale
        ? `scale(${animate.scale})`
        : baseStyle.transform
      : baseStyle.transform,
    // si animate tiene y (desplazamiento vertical), lo aplicamos con translateY
    transformOrigin: 'center'
  };

  return (
    <span aria-hidden className={className} style={appliedStyle}>
      {name}
    </span>
  );
}
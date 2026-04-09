'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useInstanceStore } from '@/lib/store/instance-store';

interface InstanceTransitionProps {
  children: React.ReactNode;
  animationEnabled?: boolean;
}

export function InstanceTransition({ children, animationEnabled: propAnimationEnabled }: InstanceTransitionProps) {
  const pathname = usePathname();
  const { animationEnabled: storeAnimationEnabled } = useInstanceStore();
  
  const animationEnabled = propAnimationEnabled ?? storeAnimationEnabled;

  const getInstanceKey = () => {
    if (pathname?.startsWith('/brand')) return 'brand';
    if (pathname?.startsWith('/business')) return 'business';
    return 'personal';
  };

  const portalVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.9,
      filter: 'blur(10px)',
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: 'blur(10px)',
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  if (!animationEnabled) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={getInstanceKey()}
        variants={portalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

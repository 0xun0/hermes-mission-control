'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useInstanceStore } from '@/lib/store/instance-store';
import { InstanceType } from '@/types';

interface InstanceTransitionProps {
  children: React.ReactNode;
  animationEnabled?: boolean;
}

const realmColors: Record<InstanceType, string> = {
  personal: 'rgba(249, 115, 22, 0.15)',
  brand: 'rgba(240, 147, 251, 0.15)',
  business: 'rgba(220, 38, 38, 0.1)',
  nexus: 'rgba(249, 115, 22, 0.15)',
};

export function InstanceTransition({ children, animationEnabled: propAnimationEnabled }: InstanceTransitionProps) {
  const pathname = usePathname();
  const { animationEnabled: storeAnimationEnabled } = useInstanceStore();
  
  const animationEnabled = propAnimationEnabled ?? storeAnimationEnabled;

  const getInstanceKey = (): InstanceType => {
    if (pathname?.startsWith('/nexus')) return 'nexus';
    if (pathname?.startsWith('/brand')) return 'brand';
    if (pathname?.startsWith('/business')) return 'business';
    return 'personal';
  };

  const instanceKey = getInstanceKey();

  const portalVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.88,
      filter: 'blur(12px) saturate(0.5)',
      rotateY: instanceKey === 'nexus' ? 15 : 8,
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px) saturate(1)',
      rotateY: 0,
      transition: {
        duration: instanceKey === 'nexus' ? 0.8 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 1.08,
      filter: 'blur(12px) saturate(0.5)',
      rotateY: instanceKey === 'nexus' ? -10 : -5,
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
        key={instanceKey}
        variants={portalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full h-full"
        style={{ perspective: '1200px' }}
      >
        {/* Realm flash overlay */}
        <motion.div
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="fixed inset-0 pointer-events-none z-50"
          style={{ background: `radial-gradient(circle at center, ${realmColors[instanceKey]}, transparent 70%)` }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

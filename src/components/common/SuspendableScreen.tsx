import { ReactNode, Suspense } from 'react';

interface Props {
  fallback?: ReactNode;
  screen: ReactNode;
}

const SuspendableScreen = ({ fallback = null, screen }: Props) => (
  <Suspense fallback={fallback}>{screen}</Suspense>
);

export default SuspendableScreen;

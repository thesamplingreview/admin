import { useLogout } from '@/contexts/hooks/auth';
import { useOnce } from '@/helpers/hooks';
import CLoader from '@/components/CLoader.jsx';

export default function LogoutPage() {
  const doLogout = useLogout();

  useOnce(() => {
    doLogout();
  });

  return <CLoader />;
}

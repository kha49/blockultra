import { PropsWithChildren } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import dynamic from 'next/dynamic';
import { validateLocale } from '@/helpers/validate-locale';

const Header = dynamic(
  () => import('@/components/CommonLayouts/Header/Index'),
  { ssr: true }
);
const Footer = dynamic(
  () => import('@/components/CommonLayouts/Footer/Index'),
  { ssr: true }
);

export default function LocaleLayout(props: PageProps & PropsWithChildren) {
  const { children } = props;
  validateLocale(props);

  return (
    <main>
      <Header />
      {children}
      <Footer />
      <ToastContainer
        position='top-right'
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </main>
  );
}

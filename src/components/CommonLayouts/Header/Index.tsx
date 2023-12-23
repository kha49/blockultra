import HeaderDesktop from './HeaderDesktop/HeaderDesktop';
import HeaderMobile from './HeaderMobile/HeaderMobile';

const Header = () => {
  return (
    <header className='header relative z-[999] bg-grey-100 border border-grey-300'>
      <HeaderDesktop />
      <HeaderMobile />
    </header>
  );
};

export default Header;

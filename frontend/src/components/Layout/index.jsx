import Nav from '../Nav';
import './style.css';

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <main className='Layout'>{children}</main>
    </>
  );
};

export default Layout;


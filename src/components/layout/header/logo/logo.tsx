import { Link } from 'react-router-dom';
import './logo.module.scss';

function Logo() {
  return (
    <Link to="/">
      <img id="imglogo" width="80" className="img-fluid img-thumbnail" src="./LogoUVE2.svg"/>
    </Link>
  );
}

export { Logo };

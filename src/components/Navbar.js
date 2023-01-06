import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu
} from 'react-pro-sidebar';
import { useAuthenticated } from '../hooks/useAuthenticated';

import {
  MenuOutlined,
  LoginOutlined,
  HomeOutlined,
  PostAddOutlined,
  LibraryBooksOutlined,
  HowToRegOutlined,
  LogoutOutlined,
  AccountCircleOutlined,
  InfoOutlined,
  Add,
  GitHub,
  LinkedIn
} from '@mui/icons-material';

import { Link, useNavigate } from 'react-router-dom';
import { AUTH } from '../lib/auth';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useAuthenticated();
  const navigate = useNavigate();

  const logout = () => {
    AUTH.deleteToken();
    setIsLoggedIn(false);
    navigate('/');
  };

  const { collapseSidebar } = useProSidebar();

  return (
    <Sidebar style={{ height: '100vh' }}>
      <Menu>
        <MenuItem
          icon={<MenuOutlined />}
          onClick={() => {
            collapseSidebar();
          }}
          style={{ textAlign: 'center' }}
        >
          <h2>Forum</h2>
        </MenuItem>
        <MenuItem icon={<HomeOutlined />} routerLink={<Link to='/' />}>
          Home
        </MenuItem>
        <MenuItem
          icon={<LibraryBooksOutlined />}
          routerLink={<Link to='/posts' />}
        >
          All Posts
        </MenuItem>
        <MenuItem
          icon={<PostAddOutlined />}
          routerLink={<Link to='/posts/create' />}
        >
          Add a New Post
        </MenuItem>

        {isLoggedIn ? (
          <>
            <MenuItem
              icon={<AccountCircleOutlined />}
              routerLink={<Link to={`/profile/${AUTH.getPayload().userId}`} />}
            >
              Profile
            </MenuItem>
            <MenuItem
              icon={<LogoutOutlined />}
              routerLink={<Link to='/' />}
              onClick={logout}
            >
              Log out
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              icon={<LoginOutlined />}
              routerLink={<Link to='/login' />}
            >
              Login
            </MenuItem>
            <MenuItem
              icon={<HowToRegOutlined />}
              routerLink={<Link to='/register' />}
            >
              Register
            </MenuItem>
          </>
        )}
        <SubMenu label='Dev Info' icon={<InfoOutlined />}>
          <SubMenu label='siuusunn' icon={<Add />}>
            <MenuItem icon={<GitHub />}>GitHub</MenuItem>
            <MenuItem icon={<LinkedIn />}>LinkedIn</MenuItem>
          </SubMenu>
          <SubMenu label='ljsgrant' icon={<Add />}>
            <MenuItem icon={<GitHub />}>GitHub</MenuItem>
            <MenuItem icon={<LinkedIn />}>LinkedIn</MenuItem>
          </SubMenu>
          <SubMenu label='ParulSingh16' icon={<Add />}>
            <MenuItem icon={<GitHub />}>GitHub</MenuItem>
            <MenuItem icon={<LinkedIn />}>LinkedIn</MenuItem>
          </SubMenu>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
}

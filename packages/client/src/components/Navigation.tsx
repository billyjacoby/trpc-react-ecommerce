import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import {Button} from './ui/button';

const ROUTES = [
  {pathname: '/', displayName: 'Home'},
  {pathname: '/admin', displayName: 'Admin'},
] as const;

const RIGHT_ITEMS = [
  {pathname: '/login', displayName: 'Log In', disabled: true},
] as const;

export const Navigation = () => {
  const {pathname} = useLocation();
  const navigate = useNavigate();

  return (
    <div className="w-full border-b border-b-muted mb-2 pb-2 px-6">
      <NavigationMenu
        className="flex flex-1 w-full justify-between max-w-screen"
        style={{maxWidth: '100vw'}}>
        <NavigationMenuList>
          {/* // TODO: invalid child nesting here, clean up when updating navbar */}
          {ROUTES.map(route => (
            <NavLink to={route.pathname} key={route.pathname}>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                active={pathname === route.pathname}>
                {route.displayName}
              </NavigationMenuLink>
            </NavLink>
          ))}
        </NavigationMenuList>
        <NavigationMenuList>
          {/* // TODO: invalid child nesting here, clean up when updating navbar */}
          {RIGHT_ITEMS.map(route => (
            <Button
              key={route.pathname}
              disabled
              onClick={() => navigate(route.pathname)}>
              {route.displayName}
            </Button>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

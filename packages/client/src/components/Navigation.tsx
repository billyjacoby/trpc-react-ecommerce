import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';

import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {Button} from './ui/button';

import {ROUTES} from '@/main';
import {useAppStore} from '@/stores/useAppStore';

const RIGHT_ITEMS = [
  {
    pathname: '/login',
    displayName: 'Log In',
    disabled: false,
    variant: undefined,
  },
  {
    pathname: '/signup',
    displayName: 'Sign Up',
    disabled: false,
    variant: 'ghost',
  },
] as const;

export const Navigation = () => {
  const {pathname} = useLocation();
  const navigate = useNavigate();

  const user = useAppStore(state => state.user);
  const clearUser = useAppStore(state => state.clearUser);

  const onSignoutClick = () => {
    clearUser();
  };

  return (
    <div className="w-full border-b border-b-muted mb-2 pb-2 px-6">
      <NavigationMenu
        className="flex flex-1 w-full justify-between max-w-screen"
        style={{maxWidth: '100vw'}}>
        <NavigationMenuList>
          {/* // TODO: invalid child nesting here, clean up when updating navbar */}
          {ROUTES.map(route =>
            route.displayName ? (
              <NavLink to={route.path} key={route.path}>
                <NavigationMenuItem
                  className={
                    pathname === route.path
                      ? navigationMenuTriggerStyle() + ' bg-accent/50'
                      : navigationMenuTriggerStyle()
                  }>
                  {route.displayName}
                </NavigationMenuItem>
              </NavLink>
            ) : null,
          )}
        </NavigationMenuList>
        <NavigationMenuList>
          {!!user ? (
            <>
              <Button disabled variant="ghost">
                {user.email}
              </Button>
              <Button onClick={onSignoutClick}>Sign Out</Button>
            </>
          ) : (
            RIGHT_ITEMS.map(route => (
              <Button
                variant={route?.variant}
                key={route.pathname}
                disabled={route.disabled}
                onClick={() => navigate(route.pathname)}>
                {route.displayName}
              </Button>
            ))
          )}
          {/* // TODO: invalid child nesting here, clean up when updating navbar */}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

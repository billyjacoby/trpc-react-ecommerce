import React from 'react';
import {Navigation} from './Navigation';

interface ContainerProps {
  children: JSX.Element;
}

export const Layout = (props: ContainerProps) => {
  const {children} = props;

  React.useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div {...props} className="flex flex-col items-center mx-6">
      <div className="w-full min-h-screen max-w-6xl py-3 flex flex-col items-start">
        <Navigation />
        {children}
      </div>
    </div>
  );
};

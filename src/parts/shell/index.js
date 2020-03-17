import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navigation from './Navigation';
const Home = lazy(() => import('../home'));
const Gallery = lazy(() => import('../gallery'));
const About = lazy(() => import('../about'));

export default function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div>loading</div>}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/gallery' component={Gallery} />
          <Route path='/about' component={About} />
        </Switch>
      </Suspense>
    </>
  );
}

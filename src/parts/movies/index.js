import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';

import Search from './Search';
import Movie from './Movie';

export default function Movies() {
  const { path } = useRouteMatch();

  console.log(path)

  return (
    <Switch>
      <Route exact path={path} component={Search} />
      <Route path={`${path}/:movieId`} component={Movie} />
    </Switch>
  )
}

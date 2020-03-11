import './style/reset.pcss';

import * as React from 'react';
import { render } from 'react-dom';
import { Main } from './main';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Main />,
    document.getElementById('root')
  );
});
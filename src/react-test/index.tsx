import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Main } from './components/main';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Main />,
    document.getElementById('root')
  );
});
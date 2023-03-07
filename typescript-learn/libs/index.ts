import $ from 'jquery';

$('.app').css('color', 'red')

import module from './module-lib';

import umdLib from './umd-lib';

import m from 'moment';

declare module moment {
  export function myFunction(): void
}

m.myFunction = () => {}


declare global {
  namespace globalLib {
    function doAnything(): void
  }
}

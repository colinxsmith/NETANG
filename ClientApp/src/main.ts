import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

function getBaseUrl() {
  const back = document.getElementsByTagName('base')[0].href;
  console.log(back);
  //return 'https://192.168.0.25:5001/';
   return 'https://localhost:5001/';
  //return 'http://localhost:5000/';
  return back;
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
];

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.log(err));

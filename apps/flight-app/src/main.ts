import { loadRemoteEntry } from '@angular-architects/module-federation';

Promise.all([
  loadRemoteEntry('http://localhost:3000/remoteEntry.js', 'passenger')
])
  .catch(err => console.error('Error loading remote entries', err))
  .then(() => import('./bootstrap'))
  .catch(err => console.error(err));

  /**
   * Shell:     ^12.0.0   -> 06. Dec
   * Booking: 	^12.1.0   -> 10. Dec
   * Bording:   ^12.2.0   -> 24. Dec
   */

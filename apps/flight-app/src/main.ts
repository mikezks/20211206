import { loadRemoteEntry } from '@angular-architects/module-federation';

Promise.all([
  loadRemoteEntry('http://localhost:3000/remoteEntry.js', 'passenger'),
  // loadMostUpToDateRemoteMetaData()
])
  .catch(err => console.error('Error loading remote entries', err))
  .then(() => import('./bootstrap'))
  .catch(err => console.error(err));

  /**
   * Shell:     ^12.0.0   -> 06. Dec
   * Booking: 	^12.1.0   -> 10. Dec
   * Bording:   ^12.2.0   -> 24. Dec
   */


  const discoveryServiceMfConfig = {
    passenger: {
      // To load the Remote
      remoteEntryUrl: 'http://localhost:3000/remoteEntry.js',
      remoteName: 'passenger',
      exposedModule: './module',
      // To configure a generic navigation component
      label: 'Mf Passenger',
      // To add a routing config during runtime dynamically
      routing: {
        path: 'mf-passenger'
      },
      // Metadata about the Remote's versions
      // Pick a least the newest version before bootstrappingboot
      version: {
        requiredRange: '^12.1.0',
        deployedVersion: '12.1.9'
      }
    },
    bording: {
      remoteName: 'bording',
      remoteEntryUrl: 'http://localhost:3200/remoteEntry.js',
      exposedModule: './module',
      label: 'Mf Bording',
      routing: {
        path: 'mf-bording'
      },
      version: {
        requiredRange: '^12.3.0',
        deployedVersion: '12.3.1'
      }
    }
  }

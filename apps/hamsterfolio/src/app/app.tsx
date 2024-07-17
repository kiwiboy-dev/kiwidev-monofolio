// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { KiwidevUi } from '@kiwidev-monofolio/kiwidev-ui';

import NxWelcome from './nx-welcome';

export function App() {
  return (
    <div>
      <KiwidevUi />
      <NxWelcome title="hamsterfolio" />
    </div>
  );
}

export default App;

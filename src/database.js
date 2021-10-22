// https://github.com/typeorm/typeorm/issues/5676#issuecomment-778816048
import { createConnection, getConnection } from "typeorm";

let connectionReadyPromise = null;

export function prepareConnection() {
  if (!connectionReadyPromise) {
    connectionReadyPromise = (async () => {
      // clean up old connection that references outdated hot-reload classes
      try {
        const staleConnection = getConnection();
        await staleConnection.close();
      } catch (error) {
        // no stale connection to clean up
      }

      // wait for new default connection
      await createConnection();
    })();
  }

  return connectionReadyPromise;
}

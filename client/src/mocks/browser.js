import { setupWorker } from "msw";

import { db } from './db'

const worker = setupWorker(
  ...db.user.toHandlers('rest')
)

worker.start()
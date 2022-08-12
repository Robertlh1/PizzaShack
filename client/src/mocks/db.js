import { factory, primaryKey } from "@mswjs/data";

const db = factory({
  user: {
    id: primaryKey(Math.random),
    firstName: () => 'John',
    age: () => 18,
  },
})
#!/bin/sh
>&2 echo "Start migrations..."
npm run migration:run
exec "$@"
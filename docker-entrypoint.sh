#!/bin/sh
set -e

# Apply any pending database migrations before the app boots.
# Set RUN_MIGRATIONS=false to skip (e.g. if you run migrations separately).
if [ "${RUN_MIGRATIONS:-true}" = "true" ]; then
  echo "==> Running prisma migrate deploy..."
  ./node_modules/.bin/prisma migrate deploy
else
  echo "==> Skipping migrations (RUN_MIGRATIONS=false)"
fi

echo "==> Starting application: $*"
exec "$@"

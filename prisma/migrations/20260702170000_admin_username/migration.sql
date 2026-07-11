-- Add username (login identifier) and make email optional.
ALTER TABLE "Admin" ADD COLUMN "username" TEXT;
ALTER TABLE "Admin" ALTER COLUMN "email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

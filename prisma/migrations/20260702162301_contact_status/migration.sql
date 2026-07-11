-- CreateEnum
CREATE TYPE "ContactStatus" AS ENUM ('NEW', 'DONE', 'CALLBACK');

-- AlterTable
ALTER TABLE "ContactMessage" ADD COLUMN     "status" "ContactStatus" NOT NULL DEFAULT 'NEW';

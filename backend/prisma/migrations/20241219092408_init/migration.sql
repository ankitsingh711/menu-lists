/*
  Warnings:

  - You are about to drop the column `parentId` on the `Menu` table. All the data in the column will be lost.
  - Added the required column `menuId` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parentData` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "parentId",
ADD COLUMN     "menuId" TEXT NOT NULL,
ADD COLUMN     "parentData" TEXT NOT NULL;

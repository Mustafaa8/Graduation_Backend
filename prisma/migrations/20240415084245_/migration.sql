-- CreateTable
CREATE TABLE "points" (
    "id" SERIAL NOT NULL,
    "startR" INTEGER NOT NULL,
    "startC" INTEGER NOT NULL,
    "endR" INTEGER NOT NULL,
    "endC" INTEGER NOT NULL,

    CONSTRAINT "points_pkey" PRIMARY KEY ("id")
);

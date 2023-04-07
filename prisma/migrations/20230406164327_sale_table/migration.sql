-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "type" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "product" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "vendor" TEXT NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

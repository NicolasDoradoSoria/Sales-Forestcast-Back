-- CreateTable
CREATE TABLE "public"."SalesData" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sku" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "promotion" BOOLEAN NOT NULL,
    "category" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "file_name" TEXT NOT NULL,
    "data_version" INTEGER NOT NULL,

    CONSTRAINT "SalesData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."SalesData" ADD CONSTRAINT "SalesData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

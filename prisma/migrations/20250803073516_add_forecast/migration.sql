-- CreateTable
CREATE TABLE "public"."Forecast" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sku" TEXT NOT NULL,
    "forecast_date" TIMESTAMP(3) NOT NULL,
    "base_value" INTEGER NOT NULL,
    "upper_bound" INTEGER NOT NULL,
    "lower_bound" INTEGER NOT NULL,
    "confidence_level" DOUBLE PRECISION NOT NULL,
    "seasonal_factor" DOUBLE PRECISION NOT NULL,
    "trend_component" DOUBLE PRECISION NOT NULL,
    "generated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "model_version" TEXT NOT NULL,
    "data_quality_score" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Forecast_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Forecast" ADD CONSTRAINT "Forecast_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

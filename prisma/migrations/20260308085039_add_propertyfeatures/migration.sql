-- CreateTable
CREATE TABLE "property" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Propertyfeatures" (
    "id" SERIAL NOT NULL,
    "bedroom" INTEGER NOT NULL,
    "hall" BOOLEAN,
    "kitchen" BOOLEAN,
    "Bathroom" BOOLEAN,
    "Propertyid" INTEGER NOT NULL,

    CONSTRAINT "Propertyfeatures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Propertyfeatures_Propertyid_key" ON "Propertyfeatures"("Propertyid");

-- AddForeignKey
ALTER TABLE "Propertyfeatures" ADD CONSTRAINT "Propertyfeatures_Propertyid_fkey" FOREIGN KEY ("Propertyid") REFERENCES "property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

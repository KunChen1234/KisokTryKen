-- CreateTable
CREATE TABLE "RfidScanLog" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "scannerId" TEXT NOT NULL,
    "rfidTagId" TEXT NOT NULL,
    "scanTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT NOT NULL,
    "rfidTagData" TEXT,

    CONSTRAINT "RfidScanLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RfidScanLog_id_key" ON "RfidScanLog"("id");

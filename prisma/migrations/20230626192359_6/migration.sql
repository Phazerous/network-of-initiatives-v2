-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "dateOfPublication" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answer" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Under Review',
    "applierId" TEXT NOT NULL,
    "initiativeId" TEXT NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_applierId_fkey" FOREIGN KEY ("applierId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_initiativeId_fkey" FOREIGN KEY ("initiativeId") REFERENCES "Initiative"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

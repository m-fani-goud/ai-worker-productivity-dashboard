-- CreateTable
CREATE TABLE "Worker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "workerId" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Workstation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stationId" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timestamp" DATETIME NOT NULL,
    "workerId" TEXT NOT NULL,
    "workstationId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "confidence" REAL NOT NULL,
    "count" INTEGER,
    "eventHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Event_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker" ("workerId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Event_workstationId_fkey" FOREIGN KEY ("workstationId") REFERENCES "Workstation" ("stationId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Worker_workerId_key" ON "Worker"("workerId");

-- CreateIndex
CREATE UNIQUE INDEX "Workstation_stationId_key" ON "Workstation"("stationId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_eventHash_key" ON "Event"("eventHash");

-- CreateTable
CREATE TABLE "WhitelistedEmails" (
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "WhitelistedEmails_email_key" ON "WhitelistedEmails"("email");

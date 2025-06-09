-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentDate" TIMESTAMP(3),
ADD COLUMN     "paymentId" TEXT,
ADD COLUMN     "paymentSignature" TEXT,
ADD COLUMN     "razorpayOrderId" TEXT;

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { items, address, totalAmount, subTotal, taxAmount, shippingCost } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
    }

    // Wrap in a transaction
    const order = await prisma.$transaction(async (tx) => {
      // 1. Create Address if not exists or use it
      const savedAddress = await tx.address.create({
        data: {
          userId,
          name: address.name,
          street: address.street,
          city: address.city,
          state: address.state,
          postalCode: address.postalCode,
          country: address.country,
        }
      });

      // 2. Create Order
      const newOrder = await tx.order.create({
        data: {
          userId,
          addressId: savedAddress.id,
          totalAmount,
          subTotal,
          taxAmount,
          shippingCost,
          status: "PENDING",
        }
      });

      // 3. Create Order Items & Update Inventory
      for (const item of items) {
        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
          }
        });

        // Deduct inventory
        await tx.productVariant.update({
          where: { id: item.variantId },
          data: {
            inventory: {
              decrement: item.quantity
            }
          }
        });
      }

      // 4. Create Payment Record (Simulated COD)
      await tx.payment.create({
        data: {
          orderId: newOrder.id,
          method: "CASH_ON_DELIVERY",
          status: "PENDING",
          amount: totalAmount,
        }
      });

      return newOrder;
    });

    return NextResponse.json({ message: "Order placed successfully", orderId: order.id }, { status: 201 });
  } catch (error: any) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { message: error.message || "An error occurred during checkout" },
      { status: 500 }
    );
  }
}

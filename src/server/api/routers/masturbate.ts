import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const masturbateRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.masturbate.create({
      data: {
        userId: ctx.session.user.id,
      },
    });
  }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const masturbates = await ctx.db.masturbate.findMany({
      orderBy: { createdAt: "desc" },
      where: { userId: ctx.session.user.id },
      select: { id: true, createdAt: true },
    });

    return masturbates ?? null;
  }),

  getToday: protectedProcedure.query(async ({ ctx }) => {
    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );

    const masturbates = await ctx.db.masturbate.count({
      where: {
        userId: ctx.session.user.id,
        createdAt: {
          gte: startOfToday,
        },
      },
    });

    return masturbates ?? null;
  }),

  getThisMonth: protectedProcedure.query(async ({ ctx }) => {
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const masturbates = await ctx.db.masturbate.count({
      where: {
        userId: ctx.session.user.id,
        createdAt: {
          gte: startOfThisMonth,
        },
      },
    });

    return masturbates ?? null;
  }),

  getThisYear: protectedProcedure.query(async ({ ctx }) => {
    const now = new Date();
    const startOfThisYear = new Date(now.getFullYear(), 0, 1);

    const masturbates = await ctx.db.masturbate.count({
      where: {
        userId: ctx.session.user.id,
        createdAt: {
          gte: startOfThisYear,
        },
      },
    });

    return masturbates ?? null;
  }),
});

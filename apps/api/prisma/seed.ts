import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clean slate
  await prisma.comment.deleteMany();
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();

  // Users
  const alice = await prisma.user.create({ data: { name: "Alice Chen" } });
  const bob = await prisma.user.create({ data: { name: "Bob Martinez" } });
  const carol = await prisma.user.create({ data: { name: "Carol Kim" } });

  const tasks: Array<{
    title: string;
    description: string;
    status: string;
    priority: string;
    assigneeIds?: string[];
    dueDate?: Date;
    archived?: boolean;
  }> = [
    {
      title: "Redesign onboarding flow",
      description:
        "Update the new user onboarding to reduce drop-off at step 3. Includes new copy, illustrations, and a progress indicator component.",
      status: "IN_PROGRESS",
      priority: "HIGH",
      assigneeIds: [alice.id],
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    {
      title: "Fix payment gateway timeout",
      description:
        "Stripe webhook occasionally times out on large order batches. Need to implement retry logic with exponential backoff.",
      status: "BLOCKED",
      priority: "URGENT",
      assigneeIds: [bob.id],
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
    {
      title: "Add CSV export to reports",
      description:
        "Users want to download their data. Add a CSV export button to the main reports table.",
      status: "BACKLOG",
      priority: "MEDIUM",
      assigneeIds: [carol.id],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
    {
      title: "Write API documentation",
      description:
        "Document all public REST endpoints using OpenAPI 3.0. Include request/response examples and error codes.",
      status: "IN_PROGRESS",
      priority: "MEDIUM",
      assigneeIds: [alice.id],
    },
    {
      title: "Implement dark mode",
      description:
        "Add a theme toggle that respects system preference by default. Store user preference in localStorage.",
      status: "BACKLOG",
      priority: "LOW",
    },
    {
      title: "Set up error monitoring",
      description:
        "Integrate Sentry for both frontend and backend. Configure alerting rules for P0 errors.",
      status: "DONE",
      priority: "HIGH",
      assigneeIds: [bob.id],
    },
    {
      title: "Migrate to Postgres",
      description:
        "Current SQLite setup is fine for dev but we need Postgres for production. Set up migrations and connection pooling.",
      status: "BACKLOG",
      priority: "HIGH",
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      title: "Mobile responsive audit",
      description:
        "Run through the app on iOS and Android. Document all layout issues and fix critical ones.",
      status: "DONE",
      priority: "MEDIUM",
      assigneeIds: [carol.id],
      archived: true,
    },
    {
      title: "Rate limit public endpoints",
      description:
        "Add rate limiting middleware to all public-facing routes. Use a sliding window algorithm.",
      status: "BACKLOG",
      priority: "MEDIUM",
    },
    {
      title: "Refactor auth middleware",
      description:
        "The current auth middleware is doing too much. Split into separate concerns: token validation, role check, rate limit.",
      status: "IN_PROGRESS",
      priority: "LOW",
      assigneeIds: [alice.id],
    },
  ];

  for (const { assigneeIds, ...taskData } of tasks) {
    const task = await prisma.task.create({
      data: {
        ...taskData,
        assignees: assigneeIds ? { connect: assigneeIds.map(id => ({ id })) } : undefined,
      }
    });

    // Add comments to a few tasks
    if (task.status === "BLOCKED") {
      await prisma.comment.createMany({
        data: [
          {
            taskId: task.id,
            message:
              "Reached out to Stripe support. They confirmed this is a known issue on batches > 500 items.",
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          },
          {
            taskId: task.id,
            message:
              "Implementing a queue-based approach as a workaround. Will unblock us while we wait for Stripe's fix.",
            createdAt: new Date(Date.now() - 30 * 60 * 1000),
          },
        ],
      });
    }

    if (task.title === "Redesign onboarding flow") {
      await prisma.comment.createMany({
        data: [
          {
            taskId: task.id,
            message:
              "Designs are approved. Starting implementation of the progress indicator first.",
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
          {
            taskId: task.id,
            message: "Progress indicator done. Moving on to the copy updates.",
            createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
          },
        ],
      });
    }
  }

  console.log(`✅ Seeded ${tasks.length} tasks, 3 users, and sample comments`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

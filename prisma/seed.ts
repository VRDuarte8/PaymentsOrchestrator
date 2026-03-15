import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.gateway.upsert({
    where: { id: 'gateway1-id' }, 
    update: {},
    create: {
      name: 'gateway1',
      isActive: true,
      priority: 1,
    },
  })

  await prisma.gateway.upsert({
    where: { id: 'gateway2-id' },
    update: {},
    create: {
      name: 'gateway2',
      isActive: true,
      priority: 2,
    },
  })

  await prisma.product.create({
    data: {
      name: 'Produto Teste',
      amount: 100.00,
    },
  })

  console.log('Seed executado com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
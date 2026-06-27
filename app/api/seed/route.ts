import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Check if we already have categories
    const count = await prisma.category.count();
    if (count > 0) {
      return NextResponse.json({ message: 'Database already seeded' });
    }

    // 1. Create Categories
    const catSurface = await prisma.category.create({
      data: { name: 'Surface Cleaners', slug: 'surface-cleaners', description: 'Cleaners for floors, glass, and multi-surfaces.' }
    });
    const catWash = await prisma.category.create({
      data: { name: 'Wash & Hygiene', slug: 'wash-hygiene', description: 'Hand wash, dish wash, and personal hygiene.' }
    });
    const catPowder = await prisma.category.create({
      data: { name: 'Powders & Solids', slug: 'powders-solids', description: 'Bleaching powder, naphthalene balls, etc.' }
    });

    // 2. Create Products & Variants
    // Phenyle
    await prisma.product.create({
      data: {
        name: 'Premium Phenyle',
        slug: 'premium-phenyle',
        description: 'Industrial-grade phenyle for highly effective floor cleaning and sanitization. Leaves a refreshing pine fragrance.',
        features: ['Kills 99.9% germs', 'Removes tough stains', 'Long-lasting fragrance'],
        images: ['https://picsum.photos/seed/phenyle/600/600'],
        categoryId: catSurface.id,
        variants: {
          create: [
            { name: '500 ml', sku: 'PHEN-500', price: 2.50, inventory: 100 },
            { name: '1 Liter', sku: 'PHEN-1L', price: 4.50, inventory: 150 },
            { name: '5 Liter', sku: 'PHEN-5L', price: 20.00, inventory: 50 },
          ]
        }
      }
    });

    // Handwash
    await prisma.product.create({
      data: {
        name: 'Antibacterial Handwash',
        slug: 'antibacterial-handwash',
        description: 'Gentle on hands but tough on germs. Formulated with aloe vera to keep your hands moisturized.',
        features: ['Moisturizing formula', 'Antibacterial', 'Dermatologically tested'],
        images: ['https://picsum.photos/seed/handwash/600/600'],
        categoryId: catWash.id,
        variants: {
          create: [
            { name: '500 ml', sku: 'HW-500', price: 3.00, inventory: 200 },
            { name: '1 Liter', sku: 'HW-1L', price: 5.50, inventory: 120 },
            { name: '5 Liter', sku: 'HW-5L', price: 22.00, inventory: 40 },
          ]
        }
      }
    });

    // Dish Wash
    await prisma.product.create({
      data: {
        name: 'Lemon Power Dish Wash',
        slug: 'lemon-power-dish-wash',
        description: 'Cuts through tough grease instantly. Infused with natural lemon extract for a sparkling clean.',
        features: ['Grease-cutting power', 'Lemon fragrance', 'Gentle on skin'],
        images: ['https://picsum.photos/seed/dishwash/600/600'],
        categoryId: catWash.id,
        variants: {
          create: [
            { name: '500 ml', sku: 'DW-500', price: 2.80, inventory: 180 },
            { name: '1 Liter', sku: 'DW-1L', price: 5.00, inventory: 100 },
            { name: '5 Liter', sku: 'DW-5L', price: 18.00, inventory: 30 },
          ]
        }
      }
    });

    // Bleaching Powder
    await prisma.product.create({
      data: {
        name: 'Multi-use Bleaching Powder',
        slug: 'multi-use-bleaching-powder',
        description: 'Highly effective bleaching powder for water purification, stain removal, and disinfection.',
        features: ['High chlorine content', 'Water purification', 'Stain removal'],
        images: ['https://picsum.photos/seed/bleach/600/600'],
        categoryId: catPowder.id,
        variants: {
          create: [
            { name: '250 g', sku: 'BP-250', price: 1.50, inventory: 250 },
            { name: '500 g', sku: 'BP-500', price: 2.50, inventory: 200 },
            { name: '1 kg', sku: 'BP-1KG', price: 4.00, inventory: 100 },
          ]
        }
      }
    });

    // Napthalene Balls
    await prisma.product.create({
      data: {
        name: 'Pure Napthalene Balls',
        slug: 'pure-napthalene-balls',
        description: 'Protects clothes from moths and insects. Eliminates bad odors in washrooms and sinks.',
        features: ['Moth repellent', 'Odor neutralizer', '100% pure'],
        images: ['https://picsum.photos/seed/napthalene/600/600'],
        categoryId: catPowder.id,
        variants: {
          create: [
            { name: '250 g', sku: 'NB-250', price: 2.00, inventory: 300 },
            { name: '500 g', sku: 'NB-500', price: 3.50, inventory: 150 },
            { name: '1 kg', sku: 'NB-1KG', price: 6.00, inventory: 80 },
          ]
        }
      }
    });

    return NextResponse.json({ message: 'Database seeded successfully' });
  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

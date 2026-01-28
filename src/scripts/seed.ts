import mongoose from "mongoose";
import { DB_URL } from "../config/dotenv";
import { User } from "../models/user.model";
import { Brand } from "../models/brand.model";
import { Review } from "../models/review.model";
import { hashPassword } from "../utils/password-utils";

// Sample data
const users = [
    {
        name: "John Doe",
        email: "john@example.com",
        username: "johndoe",
        password: "password123",
        about: "Tech enthusiast and early adopter",
        authProvider: "email" as const,
    },
    {
        name: "Jane Smith",
        email: "jane@example.com",
        username: "janesmith",
        password: "password123",
        about: "Product reviewer and blogger",
        authProvider: "email" as const,
    },
    {
        name: "Mike Wilson",
        email: "mike@example.com",
        username: "mikewilson",
        password: "password123",
        about: "Entrepreneur and investor",
        authProvider: "email" as const,
    },
    {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        username: "sarahjohnson",
        password: "password123",
        about: "Designer and creative director",
        authProvider: "email" as const,
    },
];

const brands = [
    {
        name: "EcoWare",
        description: "Sustainable and eco-friendly kitchenware made from bamboo and recycled materials. Perfect for environmentally conscious homes.",
        one_liner: "Sustainable kitchenware for eco-conscious living",
        slug: "ecoware",
        whyItExists: "To reduce plastic waste in kitchens and promote sustainable living",
        category: ["Kitchen", "Sustainability", "Home"],
        howToUse: "Use these products just like regular kitchenware. They're dishwasher safe and designed for daily use.",
        websiteUrl: "https://ecoware.example.com",
        country: "India",
        isIndianBrand: true,
        status: "published" as const,
        publishedAt: new Date("2025-01-15"),
        launchAt: new Date("2025-01-01"),
        images: [
            { url: "https://images.unsplash.com/photo-1556228720-195a672e8a03", alt: "EcoWare Products", order: 1 },
        ],
        socialLinks: [
            { platform: "Instagram", url: "https://instagram.com/ecoware" },
            { platform: "Twitter", url: "https://twitter.com/ecoware" },
        ],
    },
    {
        name: "FitTrack Pro",
        description: "Advanced fitness tracking app with AI-powered workout recommendations and nutrition planning.",
        one_liner: "Your AI-powered personal fitness companion",
        slug: "fittrack-pro",
        whyItExists: "To make fitness tracking more intelligent and personalized for everyone",
        category: ["Health", "Fitness", "Technology", "App"],
        howToUse: "Download the app, set your fitness goals, and let our AI create a personalized workout and nutrition plan.",
        websiteUrl: "https://fittrackpro.example.com",
        country: "India",
        isIndianBrand: true,
        status: "published" as const,
        publishedAt: new Date("2025-06-10"),
        launchAt: new Date("2025-06-01"),
        images: [
            { url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211", alt: "FitTrack Interface", order: 1 },
        ],
        socialLinks: [
            { platform: "Instagram", url: "https://instagram.com/fittrackpro" },
        ],
    },
    {
        name: "CodeCraft Academy",
        description: "Online coding bootcamp offering project-based learning with mentorship from industry experts.",
        one_liner: "Learn coding through real-world projects",
        slug: "codecraft-academy",
        whyItExists: "To provide accessible, project-based coding education that prepares students for real jobs",
        category: ["Education", "Technology", "Online Learning"],
        howToUse: "Enroll in a course, work on real projects, get mentorship, and build your portfolio.",
        websiteUrl: "https://codecraft.example.com",
        country: "India",
        isIndianBrand: true,
        status: "published" as const,
        publishedAt: new Date("2024-09-20"),
        launchAt: new Date("2024-09-01"),
        images: [
            { url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3", alt: "Students Learning", order: 1 },
        ],
        socialLinks: [
            { platform: "LinkedIn", url: "https://linkedin.com/company/codecraft" },
            { platform: "YouTube", url: "https://youtube.com/codecraft" },
        ],
    },
    {
        name: "GreenGlow Skincare",
        description: "Natural and organic skincare products made with traditional Indian ingredients like turmeric, neem, and aloe vera.",
        one_liner: "Ayurvedic skincare for modern skin",
        slug: "greenglow-skincare",
        whyItExists: "To bring ancient Indian skincare wisdom to modern consumers in a sustainable way",
        category: ["Beauty", "Skincare", "Natural", "Wellness"],
        howToUse: "Apply products as part of your daily skincare routine. Follow the instructions on each product.",
        websiteUrl: "https://greenglow.example.com",
        country: "India",
        isIndianBrand: true,
        status: "published" as const,
        publishedAt: new Date("2024-11-05"),
        launchAt: new Date("2024-11-01"),
        images: [
            { url: "https://images.unsplash.com/photo-1556228578-8c89e6adf883", alt: "GreenGlow Products", order: 1 },
        ],
        socialLinks: [
            { platform: "Instagram", url: "https://instagram.com/greenglow" },
        ],
    },
    {
        name: "QuickBite",
        description: "15-minute healthy meal kits with pre-portioned ingredients and easy-to-follow recipe cards.",
        one_liner: "Healthy meals in 15 minutes",
        slug: "quickbite",
        whyItExists: "To make healthy eating convenient for busy professionals and families",
        category: ["Food", "Health", "Lifestyle"],
        howToUse: "Choose your meal plan, receive weekly deliveries, and cook delicious meals in just 15 minutes.",
        websiteUrl: "https://quickbite.example.com",
        country: "India",
        isIndianBrand: true,
        status: "published" as const,
        publishedAt: new Date("2025-03-12"),
        launchAt: new Date("2025-03-01"),
        images: [
            { url: "https://images.unsplash.com/photo-1547592180-85f173990554", alt: "QuickBite Meal Kit", order: 1 },
        ],
        socialLinks: [
            { platform: "Instagram", url: "https://instagram.com/quickbite" },
            { platform: "Facebook", url: "https://facebook.com/quickbite" },
        ],
    },
];

const reviews = [
    {
        usageStatus: "used",
        worthTheMoney: true,
        biggestDisappointment: "The bamboo products stain a bit after prolonged use, but it's not a major issue.",
        whoShouldNotBuy: "People looking for dishwasher-safe products that stay pristine forever.",
        recommendation: "recommend",
        additionalNotes: "Great quality and really helps reduce plastic usage in the kitchen!",
    },
    {
        usageStatus: "used",
        worthTheMoney: true,
        biggestDisappointment: "Some items are a bit pricey compared to plastic alternatives.",
        whoShouldNotBuy: "Budget-conscious shoppers who prioritize cost over sustainability.",
        recommendation: "recommend",
        additionalNotes: "Love the feel and durability. Worth every penny for the environment.",
    },
    {
        usageStatus: "used",
        worthTheMoney: true,
        biggestDisappointment: "The AI recommendations took a while to become accurate.",
        whoShouldNotBuy: "People who prefer traditional gym workouts without app guidance.",
        recommendation: "recommend",
        additionalNotes: "The nutrition planning feature is amazing! Lost 5kg in 2 months.",
    },
    {
        usageStatus: "gifted",
        worthTheMoney: true,
        biggestDisappointment: "The subscription cost adds up over time.",
        whoShouldNotBuy: "People who don't like tracking their fitness digitally.",
        recommendation: "recommend",
        additionalNotes: "Gifted to my friend and they absolutely love it. Very motivating!",
    },
    {
        usageStatus: "used",
        worthTheMoney: true,
        biggestDisappointment: "The learning curve is steep for absolute beginners.",
        whoShouldNotBuy: "People expecting to learn coding in just a few weeks without effort.",
        recommendation: "recommend",
        additionalNotes: "Landed a job within 6 months of completing the bootcamp. Best investment!",
    },
    {
        usageStatus: "used",
        worthTheMoney: false,
        biggestDisappointment: "Not enough mentor interaction, mostly self-paced.",
        whoShouldNotBuy: "Those who need constant hand-holding and live instruction.",
        recommendation: "not_recommend",
        additionalNotes: "Expected more personalized attention for the price point.",
    },
    {
        usageStatus: "used",
        worthTheMoney: true,
        biggestDisappointment: "Some products have a strong natural smell initially.",
        whoShouldNotBuy: "People with sensitive skin who need dermatologist-tested products.",
        recommendation: "recommend",
        additionalNotes: "My skin has never looked better! Natural ingredients make a real difference.",
    },
    {
        usageStatus: "not_used",
        worthTheMoney: true,
        biggestDisappointment: "Delivery packaging could be more eco-friendly.",
        whoShouldNotBuy: "Those looking for instant results.",
        recommendation: "recommend",
        additionalNotes: "Bought but haven't opened yet. Packaging looks premium!",
    },
    {
        usageStatus: "used",
        worthTheMoney: true,
        biggestDisappointment: "Limited menu options for vegetarians in some weeks.",
        whoShouldNotBuy: "People with very specific dietary restrictions or allergies.",
        recommendation: "recommend",
        additionalNotes: "Saves so much time! The recipes are delicious and portion sizes are perfect.",
    },
    {
        usageStatus: "used",
        worthTheMoney: false,
        biggestDisappointment: "Ingredients sometimes arrive close to expiry date.",
        whoShouldNotBuy: "People who don't cook regularly or may forget to use the kits.",
        recommendation: "not_recommend",
        additionalNotes: "Good concept but execution needs improvement in terms of freshness.",
    },
];

async function seedDatabase() {
    try {
        console.log("🌱 Starting database seeding...");

        // Connect to database
        if (!DB_URL) {
            console.error("❌ DB_URL not found in environment variables");
            process.exit(1);
        }

        await mongoose.connect(DB_URL, {
            dbName: "worthit-db",
        });
        console.log("✅ Connected to database");

        // Clear existing data
        console.log("🗑️  Clearing existing data...");
        await User.deleteMany({});
        await Brand.deleteMany({});
        await Review.deleteMany({});
        console.log("✅ Existing data cleared");

        // Create users
        console.log("👥 Creating users...");
        const createdUsers = [];
        for (const userData of users) {
            const hashedPassword = await hashPassword(userData.password);
            const user = await User.create({
                ...userData,
                password: hashedPassword,
            });
            createdUsers.push(user);
            console.log(`   ✓ Created user: ${user.username}`);
        }

        // Create brands (each brand created by different users)
        console.log("🏢 Creating brands...");
        const createdBrands = [];
        for (let i = 0; i < brands.length; i++) {
            const brandData = brands[i];
            const founderId = createdUsers[i % createdUsers.length]._id;
            
            const brand = await Brand.create({
                ...brandData,
                founderId,
            });
            createdBrands.push(brand);
            console.log(`   ✓ Created brand: ${brand.name}`);
        }

        // Create reviews (distribute reviews across users and brands)
        console.log("⭐ Creating reviews...");
        let reviewIndex = 0;
        for (let brandIndex = 0; brandIndex < createdBrands.length; brandIndex++) {
            const brand = createdBrands[brandIndex];
            
            // Each brand gets 2 reviews from different users
            const reviewsForBrand = 2;
            for (let i = 0; i < reviewsForBrand && reviewIndex < reviews.length; i++) {
                const reviewData = reviews[reviewIndex];
                const userIndex = (brandIndex + i) % createdUsers.length;
                const userId = createdUsers[userIndex]._id;
                
                const review = await Review.create({
                    ...reviewData,
                    userId,
                    brandId: brand._id,
                });
                
                // Update brand counts
                if (reviewData.recommendation === "recommend") {
                    brand.recommendCount += 1;
                } else {
                    brand.notRecommendCount += 1;
                }
                brand.reviewCount += 1;
                
                console.log(`   ✓ Created review for ${brand.name} by ${createdUsers[userIndex].username}`);
                reviewIndex++;
            }
            
            await brand.save();
        }

        console.log("\n🎉 Database seeding completed successfully!");
        console.log(`\n📊 Summary:`);
        console.log(`   - Users created: ${createdUsers.length}`);
        console.log(`   - Brands created: ${createdBrands.length}`);
        console.log(`   - Reviews created: ${reviewIndex}`);
        console.log(`\n🔐 Test credentials (all users have password: password123):`);
        createdUsers.forEach((user) => {
            console.log(`   - ${user.email} (username: ${user.username})`);
        });

        await mongoose.disconnect();
        console.log("\n✅ Disconnected from database");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        await mongoose.disconnect();
        process.exit(1);
    }
}

// Run the seed function
seedDatabase();

type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
    ingredients: string[];
};

const product: { products: Product[] } = {
    products: [
        {
            id: 1,
            name: "Caesar Salad",
            price: 8.99,
            category: "appetizer",
            description: "Crisp romaine lettuce, croutons, and parmesan cheese tossed in Caesar dressing.",
            ingredients: ["romaine lettuce", "croutons", "parmesan cheese", "Caesar dressing"]
        },
        {
            id: 2,
            name: "Grilled Salmon",
            price: 18.99,
            category: "main",
            description: "Fresh Atlantic salmon fillet grilled to perfection, served with seasonal vegetables.",
            ingredients: ["salmon fillet", "seasonal vegetables", "olive oil", "lemon", "salt", "pepper"]
        },
        {
            id: 3,
            name: "Chocolate Lava Cake",
            price: 6.99,
            category: "dessert",
            description: "Warm chocolate cake with a gooey molten chocolate center, served with vanilla ice cream.",
            ingredients: ["chocolate", "butter", "sugar", "eggs", "flour", "vanilla ice cream"]
        },
        {
            id: 4,
            name: "Margherita Pizza",
            price: 14.99,
            category: "main",
            description: "Classic pizza with tomato sauce, fresh mozzarella, and basil leaves.",
            ingredients: ["pizza dough", "tomato sauce", "mozzarella cheese", "basil leaves", "olive oil"]
        },
        {
            id: 5,
            name: "Bruschetta",
            price: 7.99,
            category: "appetizer",
            description: "Toasted bread topped with diced tomatoes, fresh basil, garlic, and olive oil.",
            ingredients: ["bread", "tomatoes", "basil", "garlic", "olive oil", "salt", "pepper"]
        },
        {
            id: 6,
            name: "Chicken Alfredo",
            price: 16.99,
            category: "main",
            description: "Fettuccine pasta tossed in a creamy Alfredo sauce with grilled chicken breast.",
            ingredients: ["fettuccine pasta", "chicken breast", "Alfredo sauce", "parmesan cheese", "garlic", "butter"]
        },
        {
            id: 7,
            name: "Tiramisu",
            price: 7.99,
            category: "dessert",
            description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cheese.",
            ingredients: ["ladyfingers", "coffee", "mascarpone cheese", "cocoa powder", "sugar", "eggs"]
        },
        {
            id: 8,
            name: "Garlic Bread",
            price: 4.99,
            category: "appetizer",
            description: "Toasted bread slices topped with garlic butter and parsley.",
            ingredients: ["bread", "garlic", "butter", "parsley"]
        },
        {
            id: 9,
            name: "Beef Tacos",
            price: 12.99,
            category: "main",
            description: "Soft tortillas filled with seasoned beef, lettuce, cheese, and salsa.",
            ingredients: ["tortillas", "beef", "lettuce", "cheese", "salsa"]
        },
        {
            id: 10,
            name: "Cheesecake",
            price: 8.99,
            category: "dessert",
            description: "Creamy cheesecake with a graham cracker crust, served with a strawberry topping.",
            ingredients: ["cream cheese", "graham crackers", "sugar", "eggs", "strawberries"]
        },
        {
            id: 11,
            name: "French Onion Soup",
            price: 7.99,
            category: "appetizer",
            description: "Rich beef broth with caramelized onions, topped with melted cheese and croutons.",
            ingredients: ["beef broth", "onions", "cheese", "croutons", "butter", "thyme"]
        },
        {
            id: 12,
            name: "Spaghetti Carbonara",
            price: 15.99,
            category: "main",
            description: "Spaghetti pasta tossed with pancetta, eggs, and parmesan cheese.",
            ingredients: ["spaghetti", "pancetta", "eggs", "parmesan cheese", "black pepper"]
        },
        {
            id: 13,
            name: "Apple Pie",
            price: 6.99,
            category: "dessert",
            description: "Classic apple pie with a flaky crust and cinnamon-spiced apple filling.",
            ingredients: ["apples", "flour", "butter", "sugar", "cinnamon"]
        },
        {
            id: 14,
            name: "Greek Salad",
            price: 9.99,
            category: "appetizer",
            description: "Mixed greens with tomatoes, cucumbers, olives, feta cheese, and Greek dressing.",
            ingredients: ["mixed greens", "tomatoes", "cucumbers", "olives", "feta cheese", "Greek dressing"]
        },
        {
            id: 15,
            name: "BBQ Ribs",
            price: 19.99,
            category: "main",
            description: "Slow-cooked ribs smothered in BBQ sauce, served with coleslaw and fries.",
            ingredients: ["ribs", "BBQ sauce", "coleslaw", "potatoes", "salt", "pepper"]
        },
        {
            id: 16,
            name: "Panna Cotta",
            price: 7.99,
            category: "dessert",
            description: "Creamy Italian dessert topped with a berry compote.",
            ingredients: ["cream", "sugar", "gelatin", "vanilla", "berries"]
        },
        {
            id: 17,
            name: "Caprese Salad",
            price: 8.99,
            category: "appetizer",
            description: "Fresh tomatoes, mozzarella cheese, and basil drizzled with balsamic glaze.",
            ingredients: ["tomatoes", "mozzarella cheese", "basil", "balsamic glaze"]
        },
        {
            id: 18,
            name: "Lasagna",
            price: 17.99,
            category: "main",
            description: "Layers of pasta, meat sauce, and cheese baked to perfection.",
            ingredients: ["pasta", "meat sauce", "ricotta cheese", "mozzarella cheese", "parmesan cheese"]
        },
        {
            id: 19,
            name: "Brownie Sundae",
            price: 6.99,
            category: "dessert",
            description: "Warm brownie topped with vanilla ice cream, chocolate sauce, and whipped cream.",
            ingredients: ["brownie", "vanilla ice cream", "chocolate sauce", "whipped cream"]
        },
        {
            id: 20,
            name: "Stuffed Mushrooms",
            price: 8.99,
            category: "appetizer",
            description: "Mushrooms stuffed with a savory cheese and herb filling.",
            ingredients: ["mushrooms", "cream cheese", "parmesan cheese", "garlic", "herbs"]
        },
        {
            id: 21,
            name: "Chicken Parmesan",
            price: 18.99,
            category: "main",
            description: "Breaded chicken breast topped with marinara sauce and melted mozzarella cheese.",
            ingredients: ["chicken breast", "breadcrumbs", "marinara sauce", "mozzarella cheese", "parmesan cheese"]
        },
        {
            id: 22,
            name: "Creme Brulee",
            price: 7.99,
            category: "dessert",
            description: "Rich custard topped with a layer of caramelized sugar.",
            ingredients: ["cream", "sugar", "egg yolks", "vanilla"]
        },
        {
            id: 23,
            name: "Mozzarella Sticks",
            price: 7.99,
            category: "appetizer",
            description: "Fried mozzarella sticks served with marinara sauce.",
            ingredients: ["mozzarella cheese", "breadcrumbs", "eggs", "flour", "marinara sauce"]
        },
        {
            id: 24,
            name: "Fish and Chips",
            price: 16.99,
            category: "main",
            description: "Crispy battered fish served with fries and tartar sauce.",
            ingredients: ["fish fillets", "flour", "beer", "potatoes", "tartar sauce"]
        },
        {
            id: 25,
            name: "Lemon Tart",
            price: 6.99,
            category: "dessert",
            description: "Tangy lemon tart with a buttery crust.",
            ingredients: ["lemons", "flour", "butter", "sugar", "eggs"]
        },
        {
            id: 26,
            name: "Spring Rolls",
            price: 7.99,
            category: "appetizer",
            description: "Crispy spring rolls filled with vegetables and served with dipping sauce.",
            ingredients: ["spring roll wrappers", "cabbage", "carrots", "mushrooms", "dipping sauce"]
        },
        {
            id: 27,
            name: "Pasta Primavera",
            price: 14.99,
            category: "main",
            description: "Pasta with a variety of fresh vegetables in a light garlic and olive oil sauce.",
            ingredients: ["pasta", "zucchini", "bell peppers", "cherry tomatoes", "garlic", "olive oil"]
        },
        {
            id: 28,
            name: "Banana Split",
            price: 6.99,
            category: "dessert",
            description: "Banana split with vanilla, chocolate, and strawberry ice cream, topped with whipped cream and cherries.",
            ingredients: ["bananas", "vanilla ice cream", "chocolate ice cream", "strawberry ice cream", "whipped cream", "cherries"]
        },
        {
            id: 29,
            name: "Buffalo Wings",
            price: 12.99,
            category: "appetizer",
            description: "Spicy buffalo wings served with celery and blue cheese dressing.",
            ingredients: ["chicken wings", "buffalo sauce", "celery", "blue cheese dressing"]
        },
        {
            id: 30,
            name: "Eggplant Parmesan",
            price: 15.99,
            category: "main",
            description: "Breaded eggplant slices topped with marinara sauce and melted mozzarella cheese.",
            ingredients: ["eggplant", "breadcrumbs", "marinara sauce", "mozzarella cheese", "parmesan cheese"]
        }
    ]
};

export default product;
export const getProducts = (): Product[] => {
    return product.products;
};
export const getProductById = (id: number): Product | undefined => {
    return product.products.find(p => p.id === id);
};
export const getProductsByCategory = (category: string): Product[] => {
    return product.products.filter(p => p.category === category);
};
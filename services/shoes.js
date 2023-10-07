export default function shoesService(db) {
    async function getAllShoes() {
        let shoesList = await db.any("SELECT * FROM shoes_stock ORDER BY id DESC");
        return shoesList;
    }
    async function getSearchedShoes(searchTerm) {
        let shoesList = await db.any(`SELECT * FROM shoes_stock WHERE shoe_name ILIKE $1 OR brand ILIKE $1`, [`%${searchTerm}%`]);
        return shoesList;
    }
    async function getShoesByBrand(brandName) {
        let shoesListByBrand = await db.any("SELECT * FROM shoes_stock WHERE brand = $1 ORDER BY id DESC", brandName);
        return shoesListByBrand;
    }

    async function getShoesByColor(shoeColor) {
        let shoesListByColor = await db.any("SELECT * FROM shoes_stock WHERE color = $1 ORDER BY id DESC", shoeColor);
        return shoesListByColor;
    }

    async function getShoesBySize(shoeSize) {
        let shoesListBySize = await db.any("SELECT * FROM shoes_stock WHERE size = $1 ORDER BY id DESC", shoeSize);
        return shoesListBySize;
    }

    async function getShoesBySizeBrand(data) {
        let shoesListByBrandSize = await db.any("SELECT * FROM shoes_stock WHERE size = $1 AND brand = $2 ORDER BY id DESC", data);
        return shoesListByBrandSize;
    }

    async function getShoesBySizeColor(data) {
        let shoesListBySizeColor = await db.any("SELECT * FROM shoes_stock WHERE size = $1 AND color = $2 ORDER BY id DESC", data);
        return shoesListBySizeColor;
    }

    async function getShoesByBrandColor(data) {
        let shoesListByBrandColor = await db.any("SELECT * FROM shoes_stock WHERE brand = $1 AND color = $2 ORDER BY id DESC", data);
        return shoesListByBrandColor;
    }

    async function getShoesBySizeBrandColor(data) {
        let shoesListByBrandSizeColor = await db.any("SELECT * FROM shoes_stock WHERE size = $1 AND brand = $2 AND color = $3 ORDER BY id DESC", data);
        return shoesListByBrandSizeColor;
    }

    async function addShoes(data) {
        let insertQuery = `
            INSERT INTO shoes_stock(shoe_name, brand, size, price, image_url, color, stock_quantity, description)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
            `;
        await db.oneOrNone(insertQuery, data);
    }

    async function updateStock(id) {
        let insertQuery = `
            UPDATE shoes_stock
            SET quantity = shoes_stock.stock_stock_quantity - 1 WHERE id = $1
        `;
        await db.any(insertQuery, id);
    }

    return {
        getAllShoes,
        getSearchedShoes,
        getShoesByBrand,
        getShoesBySize,
        getShoesByColor,
        getShoesBySizeColor,
        getShoesBySizeBrand,
        addShoes,
        updateStock,
        getShoesBySizeBrandColor,
        getShoesByBrandColor,
    };
}

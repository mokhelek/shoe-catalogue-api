export default function shoesService(db) {


    async function getAllShoes(req, res) {
        let shoesList = await db.any("SELECT * FROM shoes_stock ORDER BY id DESC");
        return shoesList;
    }

    async function getShoesByBrand(req, res) {
        let shoesListByBrand = await db.any("SELECT * FROM shoes_stock WHERE brand = $1 ORDER BY id DESC", req.params.brandName);
        return shoesListByBrand;
    }

    async function getShoesByColor(req, res) {
        let shoesListByColor = await db.any("SELECT * FROM shoes_stock WHERE color = $1 ORDER BY id DESC", req.params.shoeColor);
        return shoesListByColor;
    }

    async function getShoesBySize(req, res) {
        let shoesListBySize = await db.any("SELECT * FROM shoes_stock WHERE size = $1 ORDER BY id DESC", req.params.shoeSize);
        return shoesListBySize;
    }

    async function getShoesBySizeBrand(req, res) {
        let shoesListByBrandSize = await db.any("SELECT * FROM shoes_stock WHERE size = $1 AND brand = $2 ORDER BY id DESC", [req.params.shoeSize, req.params.brandName]);
       return shoesListByBrandSize;
    }

    async function getShoesBySizeColor(req, res) {
        let shoesListBySizeColor = await db.any("SELECT * FROM shoes_stock WHERE size = $1 AND color = $2 ORDER BY id DESC", [req.params.shoeSize, req.params.shoeColor]);
        return shoesListBySizeColor;
    }

    async function getShoesByBrandColor(req, res) {
        let shoesListByBrandColor = await db.any("SELECT * FROM shoes_stock WHERE brand = $1 AND color = $2 ORDER BY id DESC", [req.params.brandName, req.params.shoeColor]);
        return shoesListByBrandColor;
    }

    async function getShoesBySizeBrandColor(req, res) {
        let shoesListByBrandSizeColor = await db.any("SELECT * FROM shoes_stock WHERE size = $1 AND brand = $2 AND color = $3 ORDER BY id DESC", [req.params.shoeSize, req.params.brandName, req.params.shoeColor]);
        return shoesListByBrandSizeColor;
    }

    async function addShoes(req, res) {
        let insertQuery = `
            INSERT INTO shoes_stock(shoe_name, brand, size, price, image_url, color, stock_quantity)
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            `;
        await db.oneOrNone(insertQuery, [req.body.shoe_name, req.body.brand, req.body.size, req.body.price, req.body.image_url, req.body.color, req.body.quantity]);
       
    }

    async function updateStock(req, res) {
        let insertQuery = `
            UPDATE shoes_stock
            SET quantity = shoes_stock.stock_stock_quantity - 1 WHERE id = $1
        `;
        await db.any(insertQuery, [req.params.id]);
      
    }

    return {
        getAllShoes,
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

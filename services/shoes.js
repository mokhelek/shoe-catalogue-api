export default function shoesService(db) {
    async function getAllShoes(req, res) {
        try {
            let shoesList = await db.any("SELECT * FROM shoes_stock");
            res.status(200).json(shoesList);
        } catch (error) {
            console.log(error);
        }
    }

    async function getShoesByBrand(req, res) {
        try {
            let shoesListByBrand = await db.any("SELECT * FROM shoes_stock WHERE brand = $1", req.params.brandName);
            res.status(200).json(shoesListByBrand);
        } catch (error) {
            console.log(error);
        }
    }

    async function getShoesByColor(req, res) {
        try {
            let shoesListByColor = await db.any("SELECT * FROM shoes_stock WHERE color = $1", req.params.shoeColor);
            res.status(200).json(shoesListByColor);
        } catch (error) {
            console.log(error);
        }
    }


    async function getShoesBySize(req, res) {
        try {
            let shoesListBySize = await db.any("SELECT * FROM shoes_stock WHERE size = $1", req.params.shoeSize);
            res.status(200).json(shoesListBySize);
        } catch (error) {
            console.log(error);
        }
    }

    async function getShoesBySizeBrand(req, res) {
        try {
            let shoesListByBrandSize = await db.any("SELECT * FROM shoes_stock WHERE size = $1 AND brand = $2", [req.params.shoeSize, req.params.brandName]);
            res.status(200).json(shoesListByBrandSize);
        } catch (error) {
            console.log(error);
        }
    }

    async function getShoesBySizeBrandColor(req, res) {
        try {
            let shoesListByBrandSizeColor = await db.any("SELECT * FROM shoes_stock WHERE size = $1 AND brand = $2 AND color = $3", [req.params.shoeSize, req.params.brandName, req.params.shoeColor]);
            res.status(200).json(shoesListByBrandSizeColor);
        } catch (error) {
            console.log(error);
        }
    }

    async function addShoes(req, res) {
        let insertQuery = `
            INSERT INTO shoes_stock(shoe_name, brand, size, price, image_url, color, quantity)
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            `;
        try {
            await db.oneOrNone(insertQuery, [req.body.shoe_name, req.body.brand, req.body.size, req.body.price, req.body.image_url, req.body.color, req.body.quantity]);
            res.status(201).json({ message: "Shoes stock successfully updated" });
        } catch (error) {
            console.log(error);
            res.status(400).send("invalid input");
        }
    }

    async function updateStock(req, res) {
        let insertQuery = `
            UPDATE shoes_stock
            SET quantity = shoes_stock.quantity - 1 WHERE id = $1
        `;
        try {
            await db.any(insertQuery, [req.params.id]);
            res.status(201).json({ message: "Stock level update successfully" });
        } catch (error) {
            console.log(error);
            res.status(401).send("invalid input");
        }
    }
    return {
        getAllShoes,
        getShoesByBrand,
        getShoesBySize,
        getShoesByColor,
        getShoesBySizeBrand,
        addShoes,
        updateStock,
        getShoesBySizeBrandColor
    };
}

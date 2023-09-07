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

    async function getShoesBySize(req, res) {
        try {
            let shoesListBySize = await db.any("SELECT * FROM shoes_stock WHERE size = $1", req.params.shoeSize);
            res.status(200).json(shoesListBySize);
        } catch (error) {
            console.log(error);
        }
    }
    return {
        getAllShoes,
        getShoesByBrand,
        getShoesBySize,
    };
}

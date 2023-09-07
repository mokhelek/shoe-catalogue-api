export default function  shoesService(db){

    async function getAllShoes(req, res){
        try {
            let shoesList = await db.any("SELECT * FROM shoes_stock");
            res.status(200).json(shoesList);
        } catch (error) {
            console.log(error);
        }
    }

    return {
        getAllShoes
    }
}
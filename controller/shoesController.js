import shoesService from "../services/shoes.js";
import db from "../model/db.js";

let shoesServiceInstance = shoesService(db);

export default function shoesController() {
    async function getAllShoes(req, res) {
        try {
            let shoesList = await shoesServiceInstance.getAllShoes();
            res.status(200).json(shoesList);
        } catch (error) {
            console.log(error);
        }
    }

    async function getSearchedShoes(req, res) {
        try {
            let shoesList = await shoesServiceInstance.getSearchedShoes(req.body.searchText);
            res.status(200).json(shoesList);
        } catch (error) {
            console.log(error);
        }
    }

    async function getShoesByBrand(req, res) {
        try {
            let shoesListByBrand = await shoesServiceInstance.getShoesByBrand(req.params.brandName);
            res.status(200).json(shoesListByBrand);
        } catch (error) {
            console.log(error);
        }
    }

    async function getShoesByColor(req, res) {
        try {
            let shoesListByColor = await shoesServiceInstance.getShoesByColor("#" + req.params.shoeColor);
            res.status(200).json(shoesListByColor);
        } catch (error) {
            console.log(error);
        }
    }

    async function getShoesBySize(req, res) {
        try {
            let shoesListBySize = await shoesServiceInstance.getShoesBySize(req.params.shoeSize);
            res.status(200).json(shoesListBySize);
        } catch (error) {
            console.log(error);
        }
    }

    async function getShoesBySizeBrand(req, res) {
        const data = [req.params.shoeSize, req.params.brandName];
        try {
            let shoesListByBrandSize = await shoesServiceInstance.getShoesBySizeBrand(data);
            res.status(200).json(shoesListByBrandSize);
        } catch (error) {
            console.log(error);
        }
    }

    async function getShoesBySizeColor(req, res) {
        const data = [req.params.shoeSize, "#" + req.params.shoeColor];
        try {
            let shoesListBySizeColor = await shoesServiceInstance.getShoesBySizeColor(data);
            res.status(200).json(shoesListBySizeColor);
        } catch (error) {
            console.log(error);
        }
    }

    async function getShoesByBrandColor(req, res) {
        const data = [req.params.brandName, "#" + req.params.shoeColor];
        try {
            let shoesListByBrandColor = await shoesServiceInstance.getShoesByBrandColor(data);
            res.status(200).json(shoesListByBrandColor);
        } catch (error) {
            console.log(error);
        }
    }

    async function getShoesBySizeBrandColor(req, res) {
        const data = [req.params.shoeSize, req.params.brandName, "#" + req.params.shoeColor];
        try {
            let shoesListByBrandSizeColor = await shoesServiceInstance.getShoesBySizeBrandColor(data);
            res.status(200).json(shoesListByBrandSizeColor);
        } catch (error) {
            console.log(error);
        }
    }

    async function addShoes(req, res) {
        const data = [req.body.shoe_name, req.body.brand, req.body.size, req.body.price, req.body.image_url, req.body.color, req.body.stock_quantity, req.body.description];

        try {
            await shoesServiceInstance.addShoes(data);
            res.status(201).json({ message: "Shoes stock successfully updated" });
        } catch (error) {
            console.log(error);
            res.status(400).send("invalid input");
        }
    }

    async function updateStock(req, res) {
        try {
            await shoesServiceInstance.updateStock(req.params.id);
            res.status(201).json({ message: "Stock level update successfully" });
        } catch (error) {
            console.log(error);
            res.status(401).send("invalid input");
        }
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

import shoesService from "../services/shoes.js"
import db from "../model/db.js";

let shoesServiceInstance = shoesService(db)

export default function shoesController() {

    async function getAllShoes(req, res) {
        let shoesList = await shoesServiceInstance.getAllShoes()
        try {
            res.status(200).json(shoesList);
        } catch (error) {
            console.log(error);
        }
    }

    async function getShoesByBrand(req, res) {
        try {
            let shoesListByBrand = await shoesServiceInstance.getShoesByBrand();
            res.status(200).json(shoesListByBrand);
        } catch (error) {
            console.log(error);
        }
    }

    async function getShoesByColor(req, res) {
        try {
            let shoesListByColor = await shoesServiceInstance.getShoesByColor();
            res.status(200).json(shoesListByColor);
        } catch (error) {
            console.log(error);
        }
    }

    async function getShoesBySize(req, res) {
        try {
            let shoesListBySize = await shoesServiceInstance.getShoesBySize();
            res.status(200).json(shoesListBySize);
        } catch (error) {
            console.log(error);
        }
    }

    async function getShoesBySizeBrand(req, res) {
        try {
            let shoesListByBrandSize = await shoesServiceInstance.getShoesBySizeBrand();
            res.status(200).json(shoesListByBrandSize);
        } catch (error) {
            console.log(error);
        }
    }

    async function getShoesBySizeColor(req, res) {
        try {
            let shoesListBySizeColor = await shoesServiceInstance.getShoesBySizeColor();
            res.status(200).json(shoesListBySizeColor);
        } catch (error) {
            console.log(error);
        }
    }

    async function getShoesByBrandColor(req, res) {
        try {
            let shoesListByBrandColor = await shoesServiceInstance.getShoesByBrandColor();
            res.status(200).json(shoesListByBrandColor);
        } catch (error) {
            console.log(error);
        }
    }

    async function getShoesBySizeBrandColor(req, res) {
        try {
            let shoesListByBrandSizeColor = await shoesServiceInstance.getShoesBySizeBrandColor();
            res.status(200).json(shoesListByBrandSizeColor);
        } catch (error) {
            console.log(error);
        }
    }

    async function addShoes(req, res) {
        try {
            await shoesServiceInstance.addShoes();
            res.status(201).json({ message: "Shoes stock successfully updated" });
        } catch (error) {
            console.log(error);
            res.status(400).send("invalid input");
        }
    }

    async function updateStock(req, res) {
      
        try {
            await shoesServiceInstance.updateStock()
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
        getShoesBySizeColor,
        getShoesBySizeBrand,
        addShoes,
        updateStock,
        getShoesBySizeBrandColor,
        getShoesByBrandColor,
    };
}

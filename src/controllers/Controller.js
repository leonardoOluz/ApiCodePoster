/* eslint-disable no-unused-vars */
class Controller {
    constructor(nameService) {
        this.service = nameService
    }

    async getOneDateId(req, res, next) {
        const { id } = req.params;
        try {
            const resultSearched = await this.service.getOneId(id)
            return res.status(200).json({ message: "dados por id ", resultSearched })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    async getAllDate(req, res, next) {
        try {
            const listRegister = await this.service.getAllDate()
            return res.status(200).json(listRegister);
        } catch (error) {
            return res.status(500).json({ message: error })
        }
    }

    async createDate(req, res, next) {
        const dtn = req.body;
        try {
            const newDate = await this.service.createDate(dtn)
            return res.status(200).json(newDate);
        } catch (error) {
            return res.status(500).json({ message: error })
        }
    }

    async updateDate(req, res, next) {
        const dtn = req.body;
        const id = req.params.id;
        try {
            const uptdatedDate = await this.service.updateDate(id, dtn)
            return res.status(200).json(uptdatedDate);
        } catch (error) {
            return res.status(500).json({ message: error })
        }
    }

    async dropDate(req, res, next) {
        const id = req.params.id;
        try {
            const deletedDate = await this.service.dropDate(id);
            return res.status(200).json({ message: "deletado com sucesso", deletedDate })
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }
}

export default Controller;
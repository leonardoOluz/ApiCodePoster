import dataBase from '../model/index.js';

class Services {
    constructor(nomeModel) {
        this.model = nomeModel
    }

    async getAllDate(){
        const response = await dataBase[this.model].find();
        return response;
    }

    async createDate(dtn){
        const newDtn = await dataBase[this.model].create(dtn);
        return newDtn;
    }

    async updateDate(id, dtn){
       const updatedDate = await dataBase[this.model].findByIdAndUpdate(id, { $set: dtn });
       return updatedDate;
    }

    async dropDate(id){
        const deletedDate = await dataBase[this.model].findByIdAndDelete(id);
        return deletedDate;
    }
}

export default Services;
import Plant from './Plant'
export default class PlantList {
    constructor(savedData) {
        this.savedData = savedData.map((item) => {
            item.key = item.id
            return item
        })
    }

    updatePlant(newPlant, id) {
        const oldPlantIndex = this.savedData.findIndex((p) => p.id === id)
        if (oldPlantIndex) {
            this.savedData[oldPlantIndex] = new Plant(newPlant)
        }
    }

    removePlant() {
    }
}
export function getDateHoursBetweenCurrentDate(date) {
    try {
        if(!date){
            return 0;
        }
        const currentDate = new Date();
        const dateToCompare = new Date(date);
        let hoursBetween =(currentDate.getTime() - dateToCompare.getTime()) / 1000;
        hoursBetween /= (60 * 60);
        return Math.abs(Math.round(hoursBetween));    
    } catch (error) {
        console.log(`Hubo un error al calcular las horas. Error:`, error)
        return 0;       
    }
}
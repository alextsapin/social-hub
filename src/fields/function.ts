export const getStyleInput = (error: string, touched: boolean) => {
    if(touched && error) {
        return 'form-control is-invalid';  
    } else if(touched && !error) {
        return 'form-control is-valid';
    } else {
        return 'form-control';
    }
}
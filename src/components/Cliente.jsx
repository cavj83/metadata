const cliente = {
    "Nombre":"Juan Carmona",
    "Address":"Tijuana"
};
export function Cliente(){
    return(<>
        {JSON.stringify(cliente)}
    </>) 
}